import { CommandInteraction } from "discord.js";

/**
 * Get the nickname for a user, based on their display name in the guild.
 * @param interaction The command interaction
 * @returns The user's nickname
 */
export const getUserNickname = async (interaction: CommandInteraction): Promise<string> => {
	const userId = interaction.member.user.id;
	const guildMember = await interaction.guild.members.fetch(userId);
	const raidLeaderNickname = guildMember.displayName;
	return raidLeaderNickname;
};
