const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const envy = require('envy');
const env = envy();

const lastfmApiUrl = 'http://ws.audioscrobbler.com/2.0/?method=';
const method = 'user.getTopAlbums';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('topalbums')
		.setDescription('Get top albums')
		.addStringOption(option => option
			.setName('user')
			.setDescription('Enter a last.fm username')
			.setRequired(true)),
	async execute(interaction) {
		await interaction.deferReply();

		const user = interaction.options.getString('user');
		const queryString = `&user=${user}&api_key=${env.lastfmApiKey}&limit=3&format=json`;
		const requestUrl = `${lastfmApiUrl}${method}${queryString}`;

		try {
			const res = await axios.get(requestUrl);

			const topAlbums = res.data.topalbums;

			if (topAlbums) {
				if (topAlbums.album[0]) {
					let response = `${user}'s top albums (all time):\n`;

					for (let i = 0; i < 3; i++) {
						const {
							artist: { name: album_artist },
							name: album_title,
						} = topAlbums.album[i];

						response += `${i + 1}: ${album_artist} - ${album_title}\n`;
					}

					await interaction.editReply(response);
				}
				else {
					await interaction.editReply('That user hasn\'t listened to any music in this period');
				}
			}
			else {
				await interaction.editReply('Iinvalid user');
			}
		}
		catch (error) {
			console.error(error);
			await interaction.editReply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	},
};
