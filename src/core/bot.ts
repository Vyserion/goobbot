import { Client, Message, TextChannel } from "discord.js";
import { processMessage, isPluginMessage } from "./util/plugins";
import logger from "./util/logger";
import { init } from "./util/dataManager";

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
 * Prints the bot welcome message to any available guilds.
 */
async function printWelcomeMessage(): Promise<void> {
	logger.info("Printing welcome messages");
	client.guilds.forEach(guild => {
		guild.channels.forEach(channel => {
			// TODO: Some setup here for known 'welcome' channels, currently only connects to bot test
			if (channel.name === "bot_test") {
				const chan: TextChannel = client.channels.get(channel.id) as TextChannel;
				chan.send(`Hello, ${guild.name}!`);
			}
		});
	});
}

/**
 * Contains a set of instructions to perform when the discord connection is ready.
 * Optionally prints the welcome message.
 */
function onReady(): void {
	const showWelcomeMessage = process.env.SEND_WELCOME_MESSAGE === "true";

	if (showWelcomeMessage) {
		printWelcomeMessage();
	} else {
		logger.debug("Bypassing channel welcome messages");
	}

	logger.info("VyBot is ready!");
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
 * Registers discord actions against the created client.
 */
async function registerActions(): Promise<void> {
	logger.info("Registering Discord API actions...");

	await client.on("ready", onReady);
	await client.on("message", onMessage);
}

/**
 * Starts up the discord bot.
 * External function containing all startup logic.
 */
export async function startup(): Promise<void> {
	client = new Client();

	await registerActions();
	await start();
}
