import { SlashCommandBuilder } from '@discordjs/builders';
import { instance, USER_RECENT_TRACKS } from '../lastfm';

export const data = new SlashCommandBuilder()
	.setName('nowplaying')
	.setDescription('Retrieves the last scrobbled song for a given user')
	.addStringOption(option => option
		.setName('user')
		.setDescription('Enter a last.fm username')
		.setRequired(true));
		
export async function execute(interaction: any) {
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

		console.log(data);

		const latestTrack = data.recenttracks.track[0];

		if (!latestTrack) {
			await interaction.editReply('User not found');
			return;
		}

		const {
			name, artist: { '#text': artist }, 
		} = latestTrack;

		await interaction.editReply(`**${user}** is listening to: *${artist} - ${name}*`);
	}
	catch (error) {
		await interaction.editReply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
}
