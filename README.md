# orpheus

Bot for Discord that fetches data from [last.fm](http://www.last.fm/).

## Instructions

1. Assuming you have [Node.js](https://nodejs.org) on your machine, install the dependencies with 
    ```
    npm install
    ```
2. **You'll need a last.fm API account**, [create one here](http://www.last.fm/api/accounts). 
3. **You'll also need a Discord app** (bot), [create a public bot here](https://discordapp.com/de2.velopers/applications/me).
4. Place the required information in the `keys.example.js` file -- `DISCORD_BOT_TOKEN` will be your bot's token and `LASTFM_API_KEY` will be your last.fm API key.
5. Rename `keys.example.js` to `keys.js`.
6. **Add your bot to a Discord server**: there are several resources online where you can learn how to do this.
7. To run the bot, do 
    ```
    node index
    ```
If everything went well, the console should reply with `Logged in as [bot username]!`. Commands in chat should now prompt a response from the bot.  

## Commands

The bot currently has 2 commands:

### .nowplaying
```
.nowplaying [last.fm username]
```
will return the information of the last song scrobbled.

### .topalbums
```
.topalbums [last.fm username]
```
will return the top 3 most scrobbled albums.
