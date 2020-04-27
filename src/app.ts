import { config } from "dotenv";
import { startup } from "./core/bot";
import logger from "./core/util/logger";

if (process.env.NODE_ENV !== "production") {
	config();
}

logger.info("VyBot is starting up...");

startup();
