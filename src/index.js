const { Client, Intents } = require('discord.js');
const envy = require('envy');
const env = envy();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
	console.log('Ready!');
});

client.login(env.token);
