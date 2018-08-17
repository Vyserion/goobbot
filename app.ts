import { Bot } from "./src/core/bot";
import logger from "./src/core/logger";

logger.info("VyBot is starting up...");

const bot = new Bot();
bot.registerActions();
bot.start();
