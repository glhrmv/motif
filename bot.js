const axios = require('axios');
const keys = require('./keys');

const Discordie = require('discordie');
const Events = Discordie.Events;
const client = new Discordie();

// private keys
const { discordToken, lastfmApiKey } = keys.discordToken;

// last.fm API endpoint
const apiUrl = 'http://ws.audioscrobbler.com/2.0/?method=';

// connect to Discrd
client.connect({ token: discordToken });

client.Dispatcher
  .on(Events.GATEWAY_READY, (e) => {
    console.log('Connected as: ' +  client.User.username);
  })
  .on(Events.MESSAGE_CREATE, (e) => {
    let input = e.message.content.split(' ');

    if (input.length === 2) {
        if ( input[0] === ".np") {
            nowPlaying(input[1], e);
        } else if ( input[0] === ".topalbums") {
            topAlbums(input[1], e);
        }
    }
  });

// commands
const nowPlaying = (user, e) => {
    let method = 'user.getRecentTracks';
    let qs = '&user=${user}&api_key=${lastfmApiKey}&limit=2&format=json';

    let reqUrl = `${apiUrl}${method}${qs}`;

    axios.get(reqUrl)
      .then((res) => {
        let latestTrack = res.data.recenttracks.track[0];
        console.log(latestTrack);
        let latestTrackName = latestTrack.name;
        let latestTrackArtist = latestTrack.artist['#text'];
        e.message.channel.sendMessage(`currently listening to: ${latestTrackArtist} - ${latestTrackName}`);
      })
      .catch((err) => {
        console.log('got an error:', err);
      });
}

const topAlbums = (user, e) => {
    let method = 'user.getTopAlbums';
    let qs = '&user=${user}&api_key=${lastfmApiKey}&limit=3&format=json';

    let reqUrl = `${apiUrl}${method}${qs}`;

    axios.get(reqUrl)
      .then((res) => {
        console.log(res.data);
        let topAlbums = res.data.topalbums;

        if (topAlbums) {
          if (topAlbums.album[0]) {
            let response = '${user}\§s top albums:\n';
            for (let i = 0; i < 3; i++) {
              let albumArtist = topAlbums.album[i].artist.name;
              let AlbumTitle = topAlbums.album[i].name
              response += (i + 1) + ': ${albumArtist} - ${AlbumTitle}\n';
            }
            e.message.channel.sendMessage(response);
          } else {
            e.message.channel.sendMessage('user hasn\t listened to any music in this period');
          }
        } else {
          e.message.channel.sendMessage('invalid user');
        }
      })
      .catch((err) => {
        console.log('got an error:', err);
      });
}
