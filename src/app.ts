/* eslint-disable import/first */
// Setup the environment variables before any other imports.
// This allows dev env vars to be used in template literals.
import { config } from "dotenv";

if (process.env.NODE_ENV !== "production") {
	config();
}

import { startup } from "./core/bot";
import logger from "./core/util/logger";

logger.info("Goobbot is starting up...");

startup();
