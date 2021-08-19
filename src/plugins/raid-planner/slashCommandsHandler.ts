import { CommandInteraction } from "discord.js";
import { handleSetupRaidCommand, setupRaidCommand } from "./commands";

export const handleSlashCommands = async (interaction: CommandInteraction): Promise<void> => {
	if (interaction.commandName === setupRaidCommand) {
		await handleSetupRaidCommand(interaction);
	}
};
