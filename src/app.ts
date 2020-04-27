import { config } from "dotenv";
import { startup } from "./core/bot";
import logger from "./core/util/logger";

config();
logger.info("VyBot is starting up...");

startup();
