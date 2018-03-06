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

    isPluginValid = (plugin: string): boolean => {
        let allowedPlugins = [
            'leaderboards'
        ];
    
        return allowedPlugins.indexOf(plugin) > -1;
    }

    handleMessage = (command: Command, message: Message) => {
        if (command.plugin === 'leaderboards') {
            let plugin = this.plugins.find(p => p.name === command.plugin);
            plugin.handleCommand(command, message);
        }
    }
}

export default new PluginManager();