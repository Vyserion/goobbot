import { Message, MessageReaction, User } from "discord.js";

const ROLE_MESSAGE_ID = "866370250244227122";

const SPROUT_ROLE_ID = "866364336607985705";
const RAIDER_ROLE_ID = "866370413554434088";
const CRAFTER_ROLE_ID = "866370418508038154";

const SPROUT_EMOJI = "🟩";
const RAIDER_EMOJI = "🔴";
const CRAFTER_EMOJI = "🛠️";

export function assignRoles(message: Message, reaction: MessageReaction, user: User, isAdd: boolean): void {
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
			if (isAdd) {
				guildMember.roles.add(roleToApply);
			} else {
				guildMember.roles.remove(roleToApply);
			}
		}
	}
}
