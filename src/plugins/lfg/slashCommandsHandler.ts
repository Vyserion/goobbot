import { CommandInteraction } from "discord.js";
import logger from "../../core/util/logger";
import { handleLFGCommand, lfgCommand } from "./commands";

export const handleSlashCommands = async (interaction: CommandInteraction): Promise<void> => {
	try {
		if (interaction.commandName === lfgCommand) {
			await handleLFGCommand(interaction);
		}
	} catch (error) {
		logger.error("Error handling slash command", error);
	}
};
