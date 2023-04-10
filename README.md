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

### `/nowplaying [user]`

Returns the last song [scrobbled] by `user` (a Last.fm account).

### `/topalbums [user] [period]`

Returns the top 5 albums [scrobbled] by `user` (a Last.fm account) over a given `period`.

### `/topartists [user] [period]`

Returns the top 5 artists [scrobbled] by `user` (a Last.fm account) over a given `period`.

### `/toptracks [user] [period]`

Returns the top 5 tracks [scrobbled] by `user` (a Last.fm account) over a given `period`.

[last.fm]: http://www.last.fm/
[scrobbled]: https://www.netlingo.com/word/scrobble.php
