import { CommandInteraction } from "discord.js";
import { errorMessage } from "./messages";

/**
 * Send the default ephemeral error message to the user's interaction.
 * @param interaction The interaction to reply to
 */
export const sendDefaultError = async (interaction: CommandInteraction): Promise<void> => {
	await interaction.reply({
		content: errorMessage,
		ephemeral: true,
	});
};

/**
 * Edit a deferred reply with the standard error message to the user's interaction.
 * @param interaction The interaction to reply to
 */
export const sendDefaultDeferredError = async (interaction: CommandInteraction): Promise<void> => {
	await interaction.editReply(errorMessage);
};
