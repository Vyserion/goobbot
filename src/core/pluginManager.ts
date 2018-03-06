import { Command } from "./command";
import { notAPluginMessage } from "./messages";
import { LeaderboardHandler } from '../plugin_leaderboards/leaderboardHandler';
import { Message } from 'discord.js';

class PluginManager {
    
    plugins: any[];

    constructor() {
        this.plugins = [];

        this.plugins.push(new LeaderboardHandler());
    }

    handlePluginMessage = (message: Message) => {
        let input: string = message.content;
        let command: Command = new Command(message);

        if (!this.isPluginValid(command.plugin)) {
            message.channel.send(notAPluginMessage);
            return;
        }
        
        this.handleMessage(command, message);
    }

    isPluginMessage = (message: string): boolean => {
        return message.startsWith(process.env.PREFIX) && message.length > 1;
    }

    isPluginValid = (pluginName: string): boolean => {
        for (let pIdx in this.plugins) {
            let plugin: any = this.plugins[pIdx];
            if (plugin.name === pluginName) {
                return true;
            }
        }
    
        return false;
    }

    handleMessage = (command: Command, message: Message) => {
        let plugin = this.plugins.find(p => p.name === command.plugin);
        plugin.handleCommand(command, message);
    }
}

export default new PluginManager();