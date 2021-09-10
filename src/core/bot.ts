import { Client, Message } from "discord.js";
import { processMessage, isPluginMessage } from "./util/plugins";
import logger from "./util/logger";
import { initialiseDatabaseConnection } from "./database";
import { intents, partials } from "./config";
import { onGuildMemberAdd, onInteraction, onReady } from "./events";
import { setupDb } from "./database/setupDb";

let client: Client;

/**
 * Starts up the internals of the bot once ready.
 * Logs in to discord, and connects to the database pool.
 */
async function start(): Promise<void> {
	logger.info("Logging into Discord API...");
	await client.login(process.env.APP_KEY);
}

/**
 * Setup the database, checking initial scripts and migrations.
 */
async function setupDatabase(): Promise<void> {
	await initialiseDatabaseConnection();
	await setupDb();
}

/**
 * Contains a set of instructions to run when the bot recieves a message.
 * @param message The message
 */
function onMessage(message: Message): void {
	if (isPluginMessage(message.content)) {
		logger.debug("Command recieved: ");
		logger.debug(`                 ${message.content}`);
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

	await setupDatabase();
	await registerActions();
	await start();
}
