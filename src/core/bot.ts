import { Client, Message } from "discord.js";
import { processMessage, isPluginMessage } from "./util/plugins";
import logger from "./util/logger";
import { init } from "./util/dataManager";
import { intents, partials } from "./config";
import { onGuildMemberAdd, onInteraction, onReady } from "./events";

let client: Client;

/**
 * Starts up the internals of the bot once ready.
 * Logs in to discord, and connects to the database pool.
 */
async function start(): Promise<void> {
	logger.info("Logging into Discord API...");
	await client.login(process.env.APP_KEY);
	await init();
}

/**
 * Contains a set of instructions to run when the bot recieves a message.
 * @param message The message
 */
function onMessage(message: Message): void {
	if (isPluginMessage(message.content)) {
		logger.debug("Command recieved: ");
		logger.debug(`                 ${message.content}`);

		processMessage(message);
	}
}

/**
 * Registers discord events against the created client.
 */
async function registerActions(): Promise<void> {
	logger.info("Registering Discord API actions...");
	// Legacy
	await client.on("messageCreate", onMessage);
	// New
	await client.on("guildMemberAdd", onGuildMemberAdd);
	await client.on("interactionCreate", onInteraction);
	await client.on("ready", onReady);
}

/**
 * Starts up the discord bot.
 * External function containing all startup logic.
 */
export async function startup(): Promise<void> {
	client = new Client({
		intents,
		partials,
	});

	await registerActions();
	await start();
}
