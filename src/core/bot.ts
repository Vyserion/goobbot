import { Client, Message, TextChannel } from "discord.js";
import { processMessage, isPluginMessage } from "./util/plugins";
import logger from "./util/logger";
import { init } from "./util/dataManager";

let client: Client;

export async function startup() {
	client = new Client();

	await registerActions();
	await start();
}

async function registerActions() {
	logger.info("Registering Discord API actions...");

	await client.on("ready", onReady);
	await client.on("message", onMessage);
}

function onReady() {
	const showWelcomeMessage = process.env.SEND_WELCOME_MESSAGE === "true";

	if (showWelcomeMessage) {
		printWelcomeMessage();
	} else {
		logger.debug("Bypassing channel welcome messages");
	}

	logger.info("VyBot is ready!");
}

function onMessage(message: Message) {
	if (isPluginMessage(message.content)) {
		logger.debug("Command recieved: ");
		logger.debug("                 " + message.content);

		processMessage(message);
	}
}

async function start() {
	logger.info("Logging into Discord API...");
	await client.login(process.env.APP_KEY);
	await init();
}

async function printWelcomeMessage() {
	logger.info('Printing welcome messages');
	client.guilds.forEach(guild => {
		guild.channels.forEach(channel => {
			// TODO: Some setup here for known 'welcome' channels, currently only connects to bot test
			if (channel.name === "bot_test") {
				let chan: TextChannel = <TextChannel>client.channels.get(channel.id);
				chan.send("Hello, " + guild.name + "!");
			}
		});
	});
}