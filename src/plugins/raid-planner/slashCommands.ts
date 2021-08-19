import { ApplicationCommandData } from "discord.js";
import { setupRaidCommand } from "./commands";

export const slashCommands: ApplicationCommandData[] = [
	{
		name: setupRaidCommand,
		description: "Schedule a raid",
		options: [
			{
				name: "title",
				description: "What raid are you scheduling?",
				type: "STRING",
				required: true,
			},
			{
				name: "participants",
				description: "The number of participants in the raid",
				type: "INTEGER",
				required: true,
				choices: [
					{
						name: "Four",
						value: 4,
					},
					{
						name: "Eight",
						value: 8,
					},
					{
						name: "Twenty-Four",
						value: 24,
					},
					{
						name: "Forty-Eight",
						value: 48,
					},
				],
			},
			{
				name: "date",
				description: "When is the run taking place?",
				type: "STRING",
				required: true,
			},
			{
				name: "time",
				description: "What Server Time is the run taking place?",
				type: "STRING",
				required: true,
			},
		],
	},
];
