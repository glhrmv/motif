const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const envy = require('envy');
const env = envy();

const commands = [];
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(env.token);

rest.put(Routes.applicationGuildCommands(env.clientId, env.guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
