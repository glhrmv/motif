const http = require('http');
const keys = require('./keys');

const Discordie = require('discordie');
const Events = Discordie.Events;
const client = new Discordie();

// private keys
const discordToken = keys.discordToken;
const lastfmApiKey = keys.lastfmApiKey;

// connect to Discrd
client.connect({ token: discordToken });

client.Dispatcher.on(Events.GATEWAY_READY, (e) => {
    console.log('Connected as: ' +  client.User.username);
});

// on new message
client.Dispatcher.on(Events.MESSAGE_CREATE, event => {
    let input = event.message.content.split(' ');

    if (input.length === 2) {
        if ( input[0] === ".np") {
            nowPlaying(input[1], event);
        } else if ( input[0] === ".topalbums") {
            topAlbums(input[1], event);
        }
    }
});

// commands
function nowPlaying(user, event) {
    let method = 'user.getRecentTracks';

    // url
    let url = `http://ws.audioscrobbler.com/2.0/?method=${method}&user=${user}&api_key=${lastfmApiKey}&limit=2&format=json`;

    http.get(url, function(res) {
        let body = '';

        res.on('data', function(chunk) {
            body += chunk;
        });

        res.on('end', function() {
            let data = JSON.parse(body);

            if (data.recenttracks !== undefined) {
                let latestTrack = data.recenttracks.track[0].name;
                let latestTrackArtist = data.recenttracks.track[0].artist['#text'];
                let response = `currently listening to: ${latestTrack} - ${latestTrackArtist}`;
                event.message.channel.sendMessage(response);
            }
            else {
                event.message.channel.sendMessage('invalid user');
            }
        });
    }).on('error', function(error) {
            console.log('got an error:', error);
    });
}

function topAlbums(user, event) {
    let method = 'user.getTopAlbums';

    // url
    let url = `http://ws.audioscrobbler.com/2.0/?method=${method}&user=${user}&api_key=${lastfmApiKey}&limit=3&format=json`;

    http.get(url, function(res) {
        let body = '';

        res.on('data', function(chunk) {
            body += chunk;
        });

        res.on('end', function() {
            let data = JSON.parse(body);

            if (data.topalbums != undefined) {
                if (data.topalbums.album[0] != undefined) {
                    let response = `${user}'s top albums:\n`
                    for (let i = 0; i < 3; i++) {
                        let albumTitle = data.topalbums.album[i].name;
                        let albumArtist = data.topalbums.album[i].artist.name;
                        response += (i+1) + `: ${albumTitle} - ${albumArtist}\n`;
                    }
                    event.message.channel.sendMessage(response);
                } else {
                    event.message.channel.sendMessage('user hasn\'t listened to any music in this period');
                }
            } else {
                event.message.channel.sendMessage('invalid user');
            }
        });
    }).on('error', function(error) {
        console.log('got an error:', error);
    });
}
