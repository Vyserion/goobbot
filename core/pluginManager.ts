import { Command } from "./command";
import { Message } from 'discord.js';
import { handleCommand } from "../plugin_leaderboards/commandHandler";
import { DataManager } from './dataManager';

export const isPluginMessage = (message: string) => {
    if (message.startsWith(process.env.PREFIX))
        return true;
    return false;
};

export const handlePluginMessage = (dataManager: DataManager, message: Message) => {
    let input: string = message.content;
    let command: Command = new Command(message);
    if (!isPluginValid(command.plugin)) {
        // TODO: Do some message handling for missing plugin
    }
    
    sendMessage(dataManager, command);
};

function isPluginValid(plugin: string): boolean {
    // TODO: Validate plugins
    return true;
};

function sendMessage(dataManager: DataManager, command: Command) {
    handleCommand(dataManager, command);
};