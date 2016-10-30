var Discordie = require('discordie');
var http = require('http');

const Events = Discordie.Events;
const client = new Discordie();

//
// private keys
//

const discordToken = 'YOUR DISCORD APP TOKEN HERE';
const lastfmApiKey = 'YOUR LAST.FM API KEY HERE';

//
// discordie events
//

client.connect({
               token: discordToken
               });

client.Dispatcher.on(Events.GATEWAY_READY, e => {

                        console.log('Connected as: ' +  client.User.username);

                     });

// reads latest chat message
client.Dispatcher.on(Events.MESSAGE_CREATE, event => { 

                        var strings = event.message.content.split(' '); 

                        if ( strings[0] == ".np" && strings.length == 2 )
                        {
                            nowPlaying(strings[1], event);
                        }

                        if ( strings[0] == ".topalbums" && strings.length == 2 )
                        {
                            topAlbums(strings[1], event);
                        }
                     });

//
// commands
//

function nowPlaying( userName, event ){

    var method = 'user.getRecentTracks';

    // url
    var url = 'http://ws.audioscrobbler.com/2.0/?method=' + method + '&user=' + userName + '&api_key=' + lastfmApiKey + '&limit=2&format=json&callback=?'

    var response = ' ';

    http.get(url, function(res){
        var body = '';

        res.on('data', function(chunk){
            body += chunk;
        });

        res.on('end', function(){
            var data = JSON.parse(body.slice(2, body.length - 2));
            if ( data.recenttracks != undefined )
            {
                response = 'currently listening to: ' + data.recenttracks.track[0].name + " - " + data.recenttracks.track[0].artist['#text'];
                event.message.channel.sendMessage(response);    
            }
            else
            {
                event.message.channel.sendMessage('error! invalid user');
            }
        });
    }).on('error', function(error){
            console.log("got an error: ", error);
    });
}

function topAlbums( userName, event ){

    var method = 'user.getTopAlbums';

    // url
    var url = 'http://ws.audioscrobbler.com/2.0/?method=' + method + '&user=' + userName + '&api_key=' + lastfmApiKey + '&limit=3&format=json&callback=?'

    var response = ' ';

    http.get(url, function(res){
        var body = '';

        res.on('data', function(chunk){
            body += chunk;
        });

        res.on('end', function(){
            var data = JSON.parse(body.slice(2, body.length - 2));
            if ( data.topalbums != undefined )
            {
                if ( data.topalbums.album[0] != undefined )
                {
                    response += userName + '\'s top albums: \n'
                    for ( i = 0; i < 3; i++)
                    {
                        response += (i+1) + ' : ' + data.topalbums.album[i].name + " - " + data.topalbums.album[i].artist.name + ' (played \n';
                        
                    }
                    event.message.channel.sendMessage(response);    
                }
                else
                {
                    event.message.channel.sendMessage('error! user hasn\'t listened to any music in this period');
                }  
            }
            else
            {
                event.message.channel.sendMessage('error! invalid user');
            }
        });
    }).on('error', function(error){
            console.log("got an error: ", error);
    });
}
