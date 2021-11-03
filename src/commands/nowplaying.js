const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const envy = require('envy');
const env = envy();

const lastfmApiUrl = 'http://ws.audioscrobbler.com/2.0/?method=';
const method = 'user.getRecentTracks';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nowplaying')
		.setDescription('Get now playing')
		.addStringOption(option => option
			.setName('user')
			.setDescription('Enter a last.fm username')
			.setRequired(true)),
	async execute(interaction) {
		await interaction.deferReply();

		const user = interaction.options.getString('user');
		const queryString = `&user=${user}&api_key=${env.lastfmApiKey}&limit=2&format=json`;
		const requestUrl = `${lastfmApiUrl}${method}${queryString}`;

		try {
			const res = await axios.get(requestUrl);

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
				name,
				artist: { '#text': artist },
			} = latestTrack;

			await interaction.editReply(`${user} is currently listening to: ${name} - ${artist}`);
		}
		catch (error) {
			console.error('err:', error);
			await interaction.editReply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	},
};
