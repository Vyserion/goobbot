import { ApplicationCommandData, Client, Message } from "discord.js";
import { createCommand } from "./command";
import { TCommand, PluginHandlerStrategy } from "../typings";
import { activeSlashCommandPlugins, GUILD_ID, Plugins } from "../config";
import { FFHandler, LeaderboardHandler, ListsHandler, MissingPluginHandler } from "../../plugins";
import { AdminHandler } from "../../plugins/admin/handler";

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
 * Load the list of commands from a specific slash command plugin.
 * This will look for a file names slashCommands within the folderName provided.
 * @param folderName The name of the plugin folder
 * @returns The list of commands from the plugin
 */
function loadPluginCommands(folderName: string): ApplicationCommandData[] {
	// eslint-disable-next-line global-require, @typescript-eslint/no-var-requires, import/no-dynamic-require
	const file = require(`../../plugins/${folderName}/slashCommands.js`);
	return file.slashCommands as ApplicationCommandData[];
}

/**
 * Register all slash commands for all activated plugins.
 * If debug is enabled, will enable them for the current guild. If not, will set them server-wide.
 * @param client The client to register the commands against
 */
export async function registerSlashCommands(client: Client): Promise<void> {
	await client.application?.fetch();

	let allCommands: ApplicationCommandData[] = [];
	activeSlashCommandPlugins.forEach(async (pluginFolderName: string) => {
		const pluginCommandsFile = loadPluginCommands(pluginFolderName);
		allCommands = allCommands.concat(pluginCommandsFile);
	});

	if (process.env.DEBUG) {
		await client.guilds.cache.get(GUILD_ID)?.commands.set([]);
		await client.guilds.cache.get(GUILD_ID)?.commands.set(allCommands);
	} else {
		await client.application?.commands.set([]);
		await client.application?.commands.set(allCommands);
	}
}
