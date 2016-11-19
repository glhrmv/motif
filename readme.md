last.fm-discord-bot
===================

bot for Discord which fetches some data from last.fm and posts it in a group chat

how to use
----------

the bot uses [node.js](nodejs.org) and the npm packages [discordie](https://qeled.github.io/discordie/#/?_k=u2u71j) and [nodemon](https://www.npmjs.com/package/nodemon). 
assuming you have node.js installed, type this in your command line / terminal.

    npm install
    npm install -g nodemon

**you'll need a last.fm API account**, [create one here](http://www.last.fm/api/accounts). 
I recommend saving the information from your API account somewhere, like into the included `keys.txt` file, as right now last.fm doesn't allow you to manage your existing API accounts beyond creating new ones, which I imagine is a bug on their end.

**you'll also need a Discord app** (bot), [create a public bot here](https://discordapp.com/developers/applications/me). your Discord bots' information will stay in this page so you don't necessarily need to save it anywhere, but use the `keys.txt` file if you want. 

next, take a look at the `lastfm-discord-bot.js` file and replace the placeholder variable values with the proper keys. 

now you can run the bot, but it won't do anything because it's not currently in a discord server. **add your bot to a discord server**, there are a bunch of resources online where you can learn how to do this. 

when your bot is in a server, it will be offline as long as the script isn't being executed.

to run the bot, open a command line / terminal window in the project folder (/lastfm-discord-bot) and type 

    nodemon lastfm-discord-bot

if everything went well, the console should reply with `Connected as: `. commands in chat should now prompt a response from the bot.  

commands
--------

the bot currently has 2 commands:

>.np {username}

will return the information of the last song scrobbled.

>.topalbums {username}

will return the top 3 most scrobbled albums.