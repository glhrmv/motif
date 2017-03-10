# last.fm-discord-bot

Bot for Discord that fetches data from last.fm.

## Usage

Assuming you have [Node.js](https://nodejs.org) installed, type this in your CLI.

```
npm install -g nodemon
```

**You'll need a last.fm API account**, [create one here](http://www.last.fm/api/accounts). 

**You'll also need a Discord app** (bot), [create a public bot here](https://discordapp.com/developers/applications/me).

Place the required information in the `keys.example.js` file -- `discordToken` will be your bot's token and `lastfmApiKey` will be your last.fm API key.

Rename `keys.example.js` to `keys.js`.

**Add your bot to a discord server**, there are many resources online where you can learn how to do this.

To run the bot, open a command line / terminal window in the project folder (`/lastfm-discord-bot`) and type 

```
node bot
```

If everything went well, the console should reply with `Connected as: `. Commands in chat should now prompt a response from the bot.  

## Commands

The bot currently has 2 commands:

```
.np {last.fm username}
```

will return the information of the last song scrobbled.

```
.topalbums {last.fm username}
```

will return the top 3 most scrobbled albums.