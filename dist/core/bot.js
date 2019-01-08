"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const pluginManager_1 = require("./pluginManager");
const logger_1 = require("./logger");
let client;
async function startup() {
    client = new discord_js_1.Client();
    pluginManager_1.registerPlugins();
    await registerActions();
    await start();
}
exports.startup = startup;
async function registerActions() {
    logger_1.default.info("Registering Discord API actions...");
    await client.on("ready", onReady);
    await client.on("message", onMessage);
}
function onReady() {
    const showWelcomeMessage = process.env.SEND_WELCOME_MESSAGE === "true";
    if (showWelcomeMessage) {
        // TODO: Fix this.
        client.guilds.forEach(guild => {
            guild.channels.forEach(channel => {
                if (channel.name === "bot_test") {
                    let chan = client.channels.get(channel.id);
                    chan.send("Hello, " + guild.name + "!");
                }
            });
        });
    }
    else {
        logger_1.default.debug("Bypassing channel welcome messages");
    }
    logger_1.default.info("VyBot is ready!");
}
function onMessage(message) {
    if (pluginManager_1.isPluginMessage(message.content)) {
        logger_1.default.debug("Command recieved: ");
        logger_1.default.debug("                 " + message.content);
        pluginManager_1.handlePluginMessage(message);
    }
}
async function start() {
    logger_1.default.info("Logging into Discord API...");
    await client.login(process.env.APP_KEY);
}
//# sourceMappingURL=bot.js.map