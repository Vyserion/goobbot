import { Message, MessageReaction, User } from "discord.js";
import logger from "../../core/util/logger";

const ROLE_MESSAGE_ID = "866370250244227122";

const SPROUT_ROLE_ID = "866364336607985705";
const RAIDER_ROLE_ID = "866370413554434088";
const CRAFTER_ROLE_ID = "866370418508038154";

const SPROUT_EMOJI = "🟩";
const RAIDER_EMOJI = "🔴";
const CRAFTER_EMOJI = "🛠️";

/**
 * Assign users roles based on the reaction provided to a known message
 * @param message The message
 * @param reaction The reaction to the message
 * @param user The user making the reaction
 * @param isAdd Flag for addition or removal
 */
export async function assignRoles(
	message: Message,
	reaction: MessageReaction,
	user: User,
	isAdd: boolean
): Promise<void> {
	if (message.id === ROLE_MESSAGE_ID) {
		let roleId: string | null;
		if (reaction.emoji.name === SPROUT_EMOJI) {
			roleId = SPROUT_ROLE_ID;
		} else if (reaction.emoji.name === RAIDER_EMOJI) {
			roleId = RAIDER_ROLE_ID;
		} else if (reaction.emoji.name === CRAFTER_EMOJI) {
			roleId = CRAFTER_ROLE_ID;
		}

		const roleToApply = message.guild.roles.cache.find((role) => role.id === roleId);
		const guildMember = message.guild.members.cache.find((member) => member.id === user.id);
		if (roleToApply && guildMember) {
			try {
				if (isAdd) {
					await guildMember.roles.add(roleToApply);
				} else {
					await guildMember.roles.remove(roleToApply);
				}
			} catch (error) {
				logger.error(error);
			}
		}
	}
}
