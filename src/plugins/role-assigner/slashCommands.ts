import { ApplicationCommandData } from "discord.js";
import { giveRoleCommand } from "./commands";
import { removeRoleCommand } from "./commands/removeRole";

export const slashCommands: ApplicationCommandData[] = [
	{
		name: giveRoleCommand,
		description: "Pick your roles for the server",
	},
	{
		name: removeRoleCommand,
		description: "Remove a role from your user",
	},
];
