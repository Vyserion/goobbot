import { CommandInteraction, GuildMember } from "discord.js";
import { FFXIV_ROLE_ID, sendDefaultError } from "../../../core";
import logger from "../../../core/util/logger";

/**
 * Handle the letMeIn command.
 * Will appply the FFXIV role, then reply.
 * @param interaction The command interaction
 */
export const handleLetMeInCommand = async (interaction: CommandInteraction): Promise<void> => {
	logger.info("LetMeIn command recieved");

	const { member } = interaction;
	const guildMember = member as GuildMember;

	const ffxivRole = interaction.guild.roles.cache.get(FFXIV_ROLE_ID);
	if (!ffxivRole) {
		logger.error("Could not get the FFXIV Role from cache");
		await sendDefaultError(interaction);
		return;
	}

	if (guildMember.roles.cache.has(ffxivRole.id)) {
		await interaction.reply({
			content: "You've already been let in!",
			ephemeral: true,
		});
		return;
	}

	try {
		await guildMember.roles.add(ffxivRole.id);
	} catch (error) {
		logger.error("Could not assign ffxiv role:", error);
		await sendDefaultError(interaction);
		return;
	}

	await interaction.reply({
		content: "All done!",
		ephemeral: true,
	});
};
