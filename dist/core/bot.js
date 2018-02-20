"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const pluginManager_1 = require("./pluginManager");
const logger_1 = require("./logger");
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
        logger_1.default.info('Logging into Discord API...');
        this.client.login(process.env.APP_KEY);
    }
    ;
    registerActions() {
        logger_1.default.info('Registering actions...');
        this.client.on('ready', this.onReady);
        this.client.on('message', this.onMessage);
    }
    ;
    onReady() {
        const showWelcomeMessage = (process.env.SEND_WELCOME_MESSAGE === 'true');
        if (showWelcomeMessage) {
            this.client.guilds.forEach(guild => {
                guild.channels.forEach(channel => {
                    if (channel.name === 'bot_test') {
                        let chan = this.client.channels.get(channel.id);
                        chan.send('Hello, ' + guild.name + '!');
                    }
                });
            });
        }
        else {
            logger_1.default.debug('Bypassing channel welcome messages');
        }
        logger_1.default.info('VyBot is ready!');
    }
    ;
    onMessage(message) {
        if (pluginManager_1.isPluginMessage(message.content)) {
            logger_1.default.debug('Command recieved: ');
            logger_1.default.debug('                 ' + message.content);
            pluginManager_1.handlePluginMessage(message);
        }
    }
}
exports.Bot = Bot;
;
//# sourceMappingURL=bot.js.map