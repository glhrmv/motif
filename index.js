const Discord = require('discord.js')
const axios = require('axios')

// Private keys defined in the keys.js file
const { DISCORD_BOT_TOKEN, LASTFM_API_KEY } = require('./keys')

// Last.fm API endpoint
const LASTFM_API_URL = 'http://ws.audioscrobbler.com/2.0/?method='

// create a new Discord client
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

// Event listener for messages
client.on('message', message => {
  const msg = message.content.split(' ')

  if (msg.length === 2) {
    if (msg[0] === '.nowplaying') {
      now_playing(msg[1], message)
    } else if (msg[0] === '.topalbums') {
      top_albums(msg[1], message)
    }
  }
})

// Bot commands
const now_playing = (user, message) => {
  const METHOD = 'user.getRecentTracks'
  const QUERY_STRING = `&user=${user}&api_key=${LASTFM_API_KEY}&limit=2&format=json`

  const request_url = `${LASTFM_API_URL}${METHOD}${QUERY_STRING}`

  axios
    .get(request_url)
    .then(res => {
      if (res.data.message) {
        message.channel.send('User not found')
        return
      }

      const latest_track = res.data.recenttracks.track[0]

      if (!latest_track) {
        e.message.channel.send('User not found')
        return
      }

      const {
        name,
        artist: { '#text': artist },
      } = latest_track

      message.channel.send(`${user} is currently listening to: ${name} - ${artist}`)
    })
    .catch(err => {
      console.log('Got an error:', err)
    })
}

const top_albums = (user, message) => {
  const METHOD = 'user.getTopAlbums'
  const QUERY_STRING = `&user=${user}&api_key=${LASTFM_API_KEY}&limit=3&format=json`

  const request_url = `${LASTFM_API_URL}${METHOD}${QUERY_STRING}`

  axios
    .get(request_url)
    .then(res => {
      const top_albums = res.data.topalbums

      if (top_albums) {
        if (top_albums.album[0]) {
          let response = `${user}'s top albums (all time):\n`

          for (let i = 0; i < 3; i++) {
            const {
              artist: { name: album_artist },
              name: album_title,
            } = top_albums.album[i]

            response += `${i + 1}: ${album_artist} - ${album_title}\n`
          }

          message.channel.send(response)
        } else {
          message.channel.send("That user hasn't listened to any music in this period")
        }
      } else {
        message.channel.send('Iinvalid user')
      }
    })
    .catch(err => {
      console.log('Got an error:', err)
    })
}

// Log in to Discrd
client.login(DISCORD_BOT_TOKEN)
