import { Client } from "discord.js";
import logger from "../util/logger";
import { registerSlashCommands } from "../util/plugins";

/**
 * Contains a set of instructions to perform when the discord connection is ready.
 * Will register slash commands against the setup client.
 */
export function onReady(client: Client): void {
	logger.info("Startup complete!");
	registerSlashCommands(client);
}
