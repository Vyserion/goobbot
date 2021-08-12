import { ApplicationCommandData } from "discord.js";
import { roleCommand } from "./commands";

export const slashCommands: ApplicationCommandData[] = [
	{
		name: roleCommand,
		description: "Pick your roles for the server",
	},
];
