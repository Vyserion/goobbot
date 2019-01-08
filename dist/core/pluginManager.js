"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("./command");
const messages_1 = require("./messages");
const leaderboardHandler_1 = require("../plugin_leaderboards/leaderboardHandler");
let plugins;
function registerPlugins() {
    plugins = [];
    plugins.push(new leaderboardHandler_1.LeaderboardHandler());
}
exports.registerPlugins = registerPlugins;
function handlePluginMessage(message) {
    let command = new command_1.Command(message);
    if (!this.isPluginValid(command.plugin)) {
        message.channel.send(messages_1.notAPluginMessage);
        return;
    }
    this.handleMessage(command, message);
}
exports.handlePluginMessage = handlePluginMessage;
function handleMessage(command, message) {
    let plugin = plugins.find(p => p.name === command.plugin);
    plugin.handleCommand(command, message);
}
exports.handleMessage = handleMessage;
function isPluginMessage(message) {
    return message.startsWith(process.env.PREFIX) && message.length > 1;
}
exports.isPluginMessage = isPluginMessage;
function isPluginValid(pluginName) {
    const found = plugins.find(p => p.name === pluginName);
    return found !== undefined;
}
exports.isPluginValid = isPluginValid;
//# sourceMappingURL=pluginManager.js.map