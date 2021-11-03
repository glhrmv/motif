const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('topalbums')
		.setDescription('Get top albums'),
	async execute(interaction) {
		await interaction.reply('top albums');
	},
};
