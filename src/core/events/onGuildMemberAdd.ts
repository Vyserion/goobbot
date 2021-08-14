import { GuildMember } from "discord.js";
import { sendFFXIVWelcomeMessage } from "../../plugins/role-assigner";

/**
 * Handler function for actions to perform when a guild member is added to the server.
 * This will fire when someone uses the invite link.
 * @param member The member joining the server
 */
export async function onGuildMemberAdd(member: GuildMember): Promise<void> {
	sendFFXIVWelcomeMessage(member);
}
