import { CommandInteraction } from "discord.js";
import { giveRoleCommand, handleGiveRoleCommand, removeRoleCommand, handleRemoveRoleCommand } from "./commands";

/**
 * Handle all slash commands for the role assigner plugin.
 * @param interaction The user interaction
 */
export const handleSlashCommands = async (interaction: CommandInteraction): Promise<void> => {
	if (interaction.commandName === giveRoleCommand) {
		await handleGiveRoleCommand(interaction);
	}
	if (interaction.commandName === removeRoleCommand) {
		await handleRemoveRoleCommand(interaction);
	}
};
