"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
if (process.env.NODE_ENV !== "production") {
    dotenv_1.config();
}
const bot_1 = require("./core/bot");
const logger_1 = require("./core/logger");
logger_1.default.info("VyBot is starting up...");
bot_1.startup();
//# sourceMappingURL=app.js.map