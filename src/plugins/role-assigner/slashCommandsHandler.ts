import { CommandInteraction } from "discord.js";
import { roleCommand, handleRoleCommand } from "./commands";

/**
 * Handle all slash commands for the role assigner plugin.
 * @param interaction The user interaction
 */
export const handleSlashCommands = async (interaction: CommandInteraction): Promise<void> => {
	if (interaction.commandName === roleCommand) {
		await handleRoleCommand(interaction);
	}
};
