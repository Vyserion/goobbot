import { CommandInteraction } from "discord.js";
import { Commands, sendDefaultError } from "../../core";
import logger from "../../core/util/logger";
import { handleLFGCommand } from "./commands";

export const handleSlashCommands = async (interaction: CommandInteraction): Promise<void> => {
	try {
		if (interaction.commandName === Commands.LFG) {
			await handleLFGCommand(interaction);
		}
	} catch (error) {
		logger.error("Error handling slash command", error);
		await sendDefaultError(interaction);
	}
};
