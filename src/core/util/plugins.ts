import { Message } from "discord.js";
import { createCommand } from "./command";
import { TCommand, IPluginHandlerStrategy } from "../typings";
import { LeaderboardHandler } from "../../plugins/leaderboards/handler";
import { Plugins } from "../config";

export function isPluginMessage(message: string): boolean {
	return message.startsWith(process.env.PREFIX) && message.length > 1;
}

export async function processMessage(message: Message) {
	let command = createCommand(message);

	const pluginHandler: IPluginHandlerStrategy = getPluginHandlerStrategy(command);
	await pluginHandler.handleMessage();
}

function getPluginHandlerStrategy(command: TCommand): IPluginHandlerStrategy {
	switch (command.plugin) {
		case Plugins.leaderboards:
			return new LeaderboardHandler(command);

		default:
			return;
	}
}
