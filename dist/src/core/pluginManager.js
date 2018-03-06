"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("./command");
const commandHandler_1 = require("../plugin_leaderboards/commandHandler");
const messages_1 = require("./messages");
exports.isPluginMessage = (message) => {
    return message.startsWith(process.env.PREFIX) && message.length > 1;
};
exports.handlePluginMessage = (message) => {
    let input = message.content;
    let command = new command_1.Command(message);
    if (!isPluginValid(command.plugin)) {
        message.channel.send(messages_1.notAPluginMessage);
        return;
    }
    handleMessage(command, message);
};
function isPluginValid(plugin) {
    let allowedPlugins = [
        'leaderboards'
    ];
    return allowedPlugins.indexOf(plugin) > -1;
}
;
function handleMessage(command, message) {
    if (command.plugin === 'leaderboards') {
        commandHandler_1.handleLeaderboardCommand(command, message);
    }
}
;
//# sourceMappingURL=pluginManager.js.map