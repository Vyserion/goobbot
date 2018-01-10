"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bot_1 = require("./bot");
const dotenv = require("dotenv");
dotenv.config();
const bot = new bot_1.Bot();
bot.registerActions();
bot.start();
//# sourceMappingURL=app.js.map