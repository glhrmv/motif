import { SlashCommandBuilder } from '@discordjs/builders';
import { ChatInputCommandInteraction } from 'discord.js';
import { instance, USER_RECENT_TRACKS } from '../axios';

export const data = new SlashCommandBuilder()
	.setName('nowplaying')
	.setDescription('Retrieves the last scrobbled song for a given user')
	.addStringOption(option => option
		.setName('user')
		.setDescription('The user name to fetch top albums for.')
		.setRequired(true));
		
export async function execute(interaction: ChatInputCommandInteraction) {
	await interaction.deferReply();
	
	try {
		const user = interaction.options.getString('user');
		const res = await instance.get("", { params: {
			user,
			method: USER_RECENT_TRACKS,
			limit: 1
		}});

		if (res.status !== 200)
			throw new Error("Something went wrong.");

		const data = JSON.parse(res.data);

		const latestTrack = data.recenttracks.track[0];
		const {
			name, artist: { '#text': artist }, 
		} = latestTrack;

		await interaction.editReply(`**${user}** is listening to: *${artist} - ${name}*`);
	}
	catch (error) {
		interaction.ephemeral = true;
		await interaction.editReply('There was an error while executing this command!');
	}
}
