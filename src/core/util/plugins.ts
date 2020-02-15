import { Message } from "discord.js";
import { createCommand } from "./command";
import { TCommand, IPluginHandlerStrategy } from "../typings";
import { Plugins } from "../config";
import { LeaderboardHandler } from "../../plugins/leaderboards/handler";
import { MissingPluginHandler } from "../../plugins/missingPlugin/handler";
import { ListsHandler } from "../../plugins/lists/handler";

/**
 * Determines if a message is for a plugin.
 * @param message The message to check
 * 
 * @returns if the message is for a plugin
 */
export function isPluginMessage(message: string): boolean {
	return message.startsWith(process.env.PREFIX) && message.length > 1;
}

/**
 * Processes a given message by passing it to a plugin.
 * @param message The message to pass
 */
export async function processMessage(message: Message): Promise<void> {
	let command = createCommand(message);

	const pluginHandler: IPluginHandlerStrategy = getPluginHandlerStrategy(command);
	await pluginHandler.handleMessage();
}

/**
 * Gets the correct plugin handler for the given command.
 * @param command The command to check
 * 
 * @returns A handler for that plugin
 */
function getPluginHandlerStrategy(command: TCommand): IPluginHandlerStrategy {
	switch (command.plugin) {
		case Plugins.leaderboards:
			return new LeaderboardHandler(command);

		case Plugins.lists:
			return new ListsHandler(command);

		default:
			return new MissingPluginHandler(command);
	}
}
