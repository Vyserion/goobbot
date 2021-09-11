import { ApplicationCommandData } from "discord.js";
import { lfgCommand } from "./commands";

export const slashCommands: ApplicationCommandData[] = [
	{
		name: lfgCommand,
		description: "Setup a lfg message",
		options: [
			{
				name: "title",
				description: "What are you scheduling?",
				type: "STRING",
				required: true,
			},
			{
				name: "date",
				description: "What day/date is it taking place?",
				type: "STRING",
				required: true,
			},
			{
				name: "time",
				description: "What Server Time (ST) is it taking place?",
				type: "INTEGER",
				required: true,
			},
			{
				name: "tanks",
				description: "Number of Tanks",
				type: "INTEGER",
				required: false,
			},
			{
				name: "healers",
				description: "Number of Healers",
				type: "INTEGER",
				required: false,
			},
			{
				name: "dps",
				description: "Number of DPS",
				type: "INTEGER",
				required: false,
			},
		],
	},
];
