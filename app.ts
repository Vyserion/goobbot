import { config } from "dotenv";
import { Bot } from "./src/core/bot";
import logger from "./src/core/logger";

if (process.env.NODE_ENV !== "production") {
	config();
}

logger.info("VyBot is starting up...");

const bot = new Bot();
bot.registerActions();
bot.start();
