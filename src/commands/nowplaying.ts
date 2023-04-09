import { SlashCommandBuilder } from '@discordjs/builders';
import { instance, USER_RECENT_TRACKS } from '../lastfm';

export const data = new SlashCommandBuilder()
	.setName('nowplaying')
	.setDescription('Retrieves song that is currently being scrobbled (or the last) for a given user')
	.addStringOption(option => option
		.setName('user')
		.setDescription('Enter a last.fm username')
		.setRequired(true));
		
export async function execute(interaction: any) {
	await interaction.deferReply();

	const user = interaction.options.getString('user');

	try {
		console.log("now playing")
		const res = await instance.get(USER_RECENT_TRACKS, { params: {
			user,
			limit: 2
		}});
		console.log(res);

		if (res.data.message) {
			await interaction.editReply('User not found');
			return;
		}

		const latestTrack = res.data.recenttracks.track[0];

		if (!latestTrack) {
			await interaction.editReply('User not found');
			return;
		}

		const {
			name, artist: { '#text': artist }, 
		} = latestTrack;

		await interaction.editReply(`${user} is currently listening to: ${artist} - ${name}`);
	}
	catch (error) {
		console.error(error);
		await interaction.editReply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
}
