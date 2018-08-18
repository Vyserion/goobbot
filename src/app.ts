import { config } from "dotenv";
if (process.env.NODE_ENV !== "production") {
	config();
}

import { Bot } from "./core/bot";
import logger from "./core/logger";

logger.info("VyBot is starting up...");

const bot = new Bot();
bot.registerActions();
bot.start();
