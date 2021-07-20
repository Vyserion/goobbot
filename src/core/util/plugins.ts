import { Message, MessageReaction, User } from "discord.js";
import { createCommand } from "./command";
import { TCommand, PluginHandlerStrategy } from "../typings";
import { Plugins } from "../config";
import { FFHandler, LeaderboardHandler, ListsHandler, MissingPluginHandler } from "../../plugins";
import { AdminHandler } from "../../plugins/admin/handler";
import { assignRoles as assignFFXIVRoles } from "../../plugins/ffxiv/roleAssigner";

/**
 * Determines if a message is for a plugin.
 * @param message The message to check.
 * @returns if the message is for a plugin.
 */
export function isPluginMessage(message: string): boolean {
	return message.startsWith(process.env.BOTPREFIX) && message.length > 1;
}

/**
 * Gets the correct plugin handler for the given command.
 * @param command The command to check.
 * @returns A handler for that plugin.
 */
function getPluginHandlerStrategy(command: TCommand): PluginHandlerStrategy {
	switch (command.plugin) {
		case Plugins.admin:
			return new AdminHandler(command);

		case Plugins.leaderboards:
			return new LeaderboardHandler(command);

		case Plugins.lists:
			return new ListsHandler(command);

		case Plugins.ff:
			return new FFHandler(command);

		default:
			return new MissingPluginHandler(command);
	}
}

/**
 * Processes a given message by passing it to a plugin.
 * @param message The message to pass.
 */
export async function processMessage(message: Message): Promise<void> {
	const command = createCommand(message);

	const pluginHandler: PluginHandlerStrategy = getPluginHandlerStrategy(command);
	await pluginHandler.handleMessage();
}

/**
 * Processes a given message reaction by passing it to plugins.
 * @param message The message to pass
 * @param reaction The reaction to the message
 * @param user The user
 * @param isAdd Flag to add or remove
 */
export async function processMessageReaction(
	message: Message,
	reaction: MessageReaction,
	user: User,
	isAdd: boolean
): Promise<void> {
	await assignFFXIVRoles(message, reaction, user, isAdd);
}
