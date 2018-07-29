const axios = require('axios');
const Discordie = require('discordie');

const { Events } = Discordie;
const client = new Discordie();

const keys = require('./keys');

// private keys
const { discordToken, lastfmApiKey } = keys;

// last.fm API endpoint
const apiUrl = 'http://ws.audioscrobbler.com/2.0/?method=';

// connect to Discrd
client.connect({ token: discordToken });

client.Dispatcher.on(Events.GATEWAY_READY, e => {
  console.log('Connected as: ' + client.User.username);
}).on(Events.MESSAGE_CREATE, e => {
  const input = e.message.content.split(' ');

  if (input.length === 2) {
    if (input[0] === '.np') {
      nowPlaying(input[1], e);
    } else if (input[0] === '.topalbums') {
      topAlbums(input[1], e);
    }
  }
});

// commands
const nowPlaying = (user, e) => {
  const method = 'user.getRecentTracks';
  const qs = `&user=${user}&api_key=${lastfmApiKey}&limit=2&format=json`;

  const reqUrl = `${apiUrl}${method}${qs}`;

  axios
    .get(reqUrl)
    .then(res => {
      if (res.data.message) {
        e.message.channel.sendMessage('user not found');
        return;
      }

      const latestTrack = res.data.recenttracks.track[0];

      if (!latestTrack) {
        e.message.channel.sendMessage('user not found');
        return;
      }

      const {
        name,
        artist: { '#text': artist },
      } = latestTrack;

      e.message.channel.sendMessage(
        `currently listening to: ${name} - ${artist}`
      );
    })
    .catch(err => {
      console.log('got an error:', err);
    });
};

const topAlbums = (user, e) => {
  const method = 'user.getTopAlbums';
  const qs = `&user=${user}&api_key=${lastfmApiKey}&limit=3&format=json`;

  const reqUrl = `${apiUrl}${method}${qs}`;

  axios
    .get(reqUrl)
    .then(res => {
      const topAlbums = res.data.topalbums;

      if (topAlbums) {
        if (topAlbums.album[0]) {
          let response = `${user}'s top albums:\n`;

          for (let i = 0; i < 3; i++) {
            const {
              artist: { name: albumArtist },
              name: albumTitle,
            } = topAlbums.album[i];

            response += `${i + 1}: ${albumArtist} - ${albumTitle}\n`;
          }

          e.message.channel.sendMessage(response);
        } else {
          e.message.channel.sendMessage(
            'user hasn\'t listened to any music in this period'
          );
        }
      } else {
        e.message.channel.sendMessage('invalid user');
      }
    })
    .catch(err => {
      console.log('got an error:', err);
    });
};
