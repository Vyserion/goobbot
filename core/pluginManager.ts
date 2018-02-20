import { Command } from "./command";
import { Message } from 'discord.js';
import { handleCommand } from "../plugin_leaderboards/commandHandler";

export const isPluginMessage = (message: string) => {
    return message.startsWith(process.env.PREFIX) && message.length > 1;
};

export const handlePluginMessage = (message: Message) => {
    let input: string = message.content;
    let command: Command = new Command(message);
    if (!isPluginValid(command.plugin)) {
        // TODO: Do some message handling for missing plugin
    }
    
    sendMessage(command);
};

function isPluginValid(plugin: string): boolean {
    // TODO: Validate plugins
    return true;
};

function sendMessage(command: Command) {
    handleCommand(command);
    console.log('got here');
};