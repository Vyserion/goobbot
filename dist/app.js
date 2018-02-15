"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bot_1 = require("./core/bot");
const dataManager_1 = require("./core/dataManager");
const dotenv = require("dotenv");
dotenv.config();
const dataManager = new dataManager_1.DataManager();
const bot = new bot_1.Bot(dataManager);
bot.registerActions();
bot.start();
//# sourceMappingURL=app.js.map