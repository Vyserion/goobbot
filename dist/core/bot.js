"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const pluginManager_1 = require("./pluginManager");
class Bot {
    constructor() {
        this.client = new discord_js_1.Client();
    }
    ;
    startup() {
        this.registerActions();
        this.start();
    }
    ;
    start() {
        this.client.login(process.env.APP_KEY);
    }
    ;
    registerActions() {
        this.client.on('ready', () => {
            console.log('I am ready!');
        });
        this.client.on('message', message => {
            if (pluginManager_1.isPluginMessage(message.content)) {
                pluginManager_1.handlePluginMessage(message);
            }
        });
    }
    ;
}
exports.Bot = Bot;
;
//# sourceMappingURL=bot.js.map