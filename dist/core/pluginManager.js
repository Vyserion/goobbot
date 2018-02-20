"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("./command");
const commandHandler_1 = require("../plugin_leaderboards/commandHandler");
exports.isPluginMessage = (message) => {
    return message.startsWith(process.env.PREFIX) && message.length > 1;
};
exports.handlePluginMessage = (message) => {
    let input = message.content;
    let command = new command_1.Command(message);
    if (!isPluginValid(command.plugin)) {
        // TODO: Do some message handling for missing plugin
    }
    sendMessage(command);
};
function isPluginValid(plugin) {
    // TODO: Validate plugins
    return true;
}
;
function sendMessage(command) {
    commandHandler_1.handleCommand(command);
    console.log('got here');
}
;
//# sourceMappingURL=pluginManager.js.map