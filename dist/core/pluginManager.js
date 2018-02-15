"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("./command");
const commandHandler_1 = require("../plugin_leaderboards/commandHandler");
exports.isPluginMessage = (message) => {
    if (message.startsWith(process.env.PREFIX))
        return true;
    return false;
};
exports.handlePluginMessage = (dataManager, message) => {
    let input = message.content;
    let command = new command_1.Command(message);
    if (!isPluginValid(command.plugin)) {
        // TODO: Do some message handling for missing plugin
    }
    sendMessage(dataManager, command);
};
function isPluginValid(plugin) {
    // TODO: Validate plugins
    return true;
}
;
function sendMessage(dataManager, command) {
    commandHandler_1.handleCommand(dataManager, command);
}
;
//# sourceMappingURL=pluginManager.js.map