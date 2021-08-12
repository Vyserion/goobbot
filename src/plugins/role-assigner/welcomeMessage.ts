import { GuildMember, MessageOptions } from "discord.js";
import { FFXIVRole, welcomeMessageText } from "./config";

/**
 * Send the welcome messages to the user.
 * Will send both the rules welcome message, and the role selector.
 * @param member The discord member to send the messages to
 */
export const sendFFXIVWelcomeMessage = (member: GuildMember): void => {
	const serverRole = member.guild.roles.cache.get(FFXIVRole.id);
	if (!member.roles.cache.has(serverRole.id)) {
		member.roles.add(serverRole.id);
	}
	member.roles.add(serverRole.id);

	const welcomeMessage: MessageOptions = {
		content: welcomeMessageText,
	};
	member.send(welcomeMessage);
};
