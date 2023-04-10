import { SlashCommandBuilder } from '@discordjs/builders';
import { ChatInputCommandInteraction } from 'discord.js';
import { instance, USER_TOP_ALBUMS } from '../axios';

enum TimePeriod {
  Week = "7day",
  Month = "1month",
  Quarter = "3month",
  Semester = "6month",
  Year = "12month",
  AllTime = "overall"
}

export const data = new SlashCommandBuilder()
	.setName('topalbums')
	.setDescription('Get the 5 top albums listened to by a user over a given time period (all tiime is default).')
	.addStringOption(option => option
		.setName('user')
		.setDescription('The user name to fetch top albums for.')
		.setRequired(true))
  .addStringOption(option => option
    .setName('period')
    .setDescription('The time period over which to retrieve top albums for.')
    .addChoices(
      { name: "all time", value: TimePeriod.AllTime },
      { name: "last year", value: TimePeriod.Year },
      { name: "last 6 months", value: TimePeriod.Semester },
      { name: "last 3 months", value: TimePeriod.Quarter },
      { name: "last month", value: TimePeriod.Month },
      { name: "last week", value: TimePeriod.Week },
    ))
		
export async function execute(interaction: ChatInputCommandInteraction) {
	await interaction.deferReply();
	
	try {
		const user = interaction.options.getString('user');
    const period = interaction.options.getString('period') || TimePeriod.AllTime;
		
    const res = await instance.get("", { params: {
			user,
      period,
			method: USER_TOP_ALBUMS,
      limit: 5,
		}});

    if (res.status !== 200)
			throw new Error("Something went wrong.");

    const data = JSON.parse(res.data);
    const albums = data.topalbums.album.map((a: any, i: number) => {
      return `${i + 1}. ${a.artist.name} - ${a.name}`;
    });

    await interaction.editReply(`**${user}**'s top albums (period: *${period}*):\n${albums.join('\n')}`);
	}
	catch (error) {
    interaction.ephemeral = true;
		await interaction.editReply('There was an error while executing this command!');
	}
}
