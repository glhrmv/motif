# motif

Bot for Discord that fetches data from [last.fm].

## Pre-requisites

You must have [Node.js](https://nodejs.org) installed.

## Usage

Install the dependencies with 
```
npm i
```

**You'll need a last.fm API account**, 
[create one here](http://www.last.fm/api/accounts). 

**You'll also need a Discord app** (bot), 
[create a public bot here](https://discordapp.com/de2.velopers/applications/me).

Place the required information in the `keys.js` file -- 
`DISCORD_BOT_TOKEN` will be your bot's token and 
`LASTFM_API_KEY` will be your last.fm API key.

**Add your bot to a Discord server**: there are several 
resources online where you can learn how to do this.
To run the bot, do 
```
npm start
```
If everything went well, you should see `Logged in as [bot username]!` on the terminal. 

Commands in chat should now prompt a response from the bot.  

## Commands

The bot currently has 2 commands:

### .nowplaying
```
.nowplaying [last.fm username]
```
Returns the last song scrobbled by user.

### .topalbums
```
.topalbums [last.fm username]
```
Returns the top 3 albums (all time) scrobbled by user.

[last.fm]: http://www.last.fm/
[scrobbled]: https://www.netlingo.com/word/scrobble.php
