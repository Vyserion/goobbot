import { ApplicationCommandData } from "discord.js";
import { Commands } from "../../core";
import { giveRoleCommand, removeRoleCommand } from "./commands";

export const slashCommands: ApplicationCommandData[] = [
	// TODO: Deprecated
	{
		name: giveRoleCommand,
		description: "Pick your roles for the server",
	},
	// TODO: Deprecated
	{
		name: removeRoleCommand,
		description: "Remove a role from your user",
	},
	{
		name: Commands.LetMeIn,
		description: "Sign into the server and get started",
	},
];
