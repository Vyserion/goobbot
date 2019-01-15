import { config } from "dotenv";
if (process.env.NODE_ENV !== "production") {
	config();
}

import { startup } from "./core/bot";
import logger from "./core/util/logger";

logger.info("VyBot is starting up...");

startup();
