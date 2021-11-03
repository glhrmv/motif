const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nowplaying')
		.setDescription('Get now playing'),
	async execute(interaction) {
		await interaction.reply('now playing');
	},
};
