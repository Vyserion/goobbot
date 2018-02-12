"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bot_1 = require("./core/bot");
const data_1 = require("./core/data");
const dotenv = require("dotenv");
dotenv.config();
const data = new data_1.Data();
data.connect();
data.query();
const bot = new bot_1.Bot();
bot.registerActions();
bot.start();
//# sourceMappingURL=app.js.map