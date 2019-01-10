import { config } from "dotenv";
if (process.env.NODE_ENV !== "production") {
	config();
}

import { startup } from "./new_core/bot";
import logger from "./new_core/logger";

logger.info("VyBot is starting up...");

startup();
