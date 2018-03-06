"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("./command");
const messages_1 = require("./messages");
const leaderboardHandler_1 = require("../plugin_leaderboards/leaderboardHandler");
class PluginManager {
    constructor() {
        this.handlePluginMessage = (message) => {
            let input = message.content;
            let command = new command_1.Command(message);
            if (!this.isPluginValid(command.plugin)) {
                message.channel.send(messages_1.notAPluginMessage);
                return;
            }
            this.handleMessage(command, message);
        };
        this.isPluginMessage = (message) => {
            return message.startsWith(process.env.PREFIX) && message.length > 1;
        };
        this.isPluginValid = (pluginName) => {
            for (let pIdx in this.plugins) {
                let plugin = this.plugins[pIdx];
                if (plugin.name === pluginName) {
                    return true;
                }
            }
            return false;
        };
        this.handleMessage = (command, message) => {
            let plugin = this.plugins.find(p => p.name === command.plugin);
            plugin.handleCommand(command, message);
        };
        this.plugins = [];
        this.plugins.push(new leaderboardHandler_1.LeaderboardHandler());
    }
}
exports.default = new PluginManager();
//# sourceMappingURL=pluginManager.js.map