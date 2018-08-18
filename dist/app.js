"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const bot_1 = require("./core/bot");
const logger_1 = require("./core/logger");
if (process.env.NODE_ENV !== "production") {
    dotenv_1.config();
}
logger_1.default.info("VyBot is starting up...");
const bot = new bot_1.Bot();
bot.registerActions();
bot.start();
//# sourceMappingURL=app.js.map