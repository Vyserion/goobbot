import { CommandInteraction } from "discord.js";
import { Commands, sendDefaultError } from "../../core";
import logger from "../../core/util/logger";
import {
	giveRoleCommand,
	handleGiveRoleCommand,
	removeRoleCommand,
	handleRemoveRoleCommand,
	handleLetMeInCommand,
} from "./commands";

/**
 * Handle all slash commands for the role assigner plugin.
 * @param interaction The user interaction
 */
export const handleSlashCommands = async (interaction: CommandInteraction): Promise<void> => {
	try {
		if (interaction.commandName === giveRoleCommand) {
			await handleGiveRoleCommand(interaction);
		}
		if (interaction.commandName === removeRoleCommand) {
			await handleRemoveRoleCommand(interaction);
		}
		if (interaction.commandName === Commands.LetMeIn) {
			await handleLetMeInCommand(interaction);
		}
	} catch (error) {
		logger.error("Error handling slash command", error);
		await sendDefaultError(interaction);
	}
};
