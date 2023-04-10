import { Events, Client } from 'discord.js';

export const name = Events.ClientReady;
export const once = true; 
export const execute = (client: Client) => {
	console.log(`Ready! Logged in as ${client?.user?.tag}`);
};
