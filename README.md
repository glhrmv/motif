![motif](img/motif.png)

Bot for Discord that fetches data from [Last.fm].

## Prerequisites

- You must have [Node.js](https://nodejs.org) installed.

- You need a Last.fm API key, 
[create one here](http://www.last.fm/api/accounts). 

- You also need a Discord bot, 
[create one here](https://discord.com/developers/applications).

- Configure an `.env` file using the provided `.env.example` as reference:
  - `TOKEN` will be your bot's token and 
  - `LASTFM_API_KEY` will be your Last.fm API key.
  - `CLIENT_ID` will be your bot's client ID and
  - `GUILD_ID` will be your server's guild ID. 

## Commands

<p align="center">
  <img src="img/demo.png" />
</p>

The bot currently has 2 commands:

### `/nowplaying [user]`

Returns the last song [scrobbled] by `user` (must be a Last.fm account).

### `/topalbums [user] [options]`

Returns the top 3 albums (all time) [scrobbled] by `user` (must be a Last.fm account).

[last.fm]: http://www.last.fm/
[scrobbled]: https://www.netlingo.com/word/scrobble.php
