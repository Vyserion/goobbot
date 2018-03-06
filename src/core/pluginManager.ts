import { Command } from "./command";
import logger from './logger';
import { Message } from 'discord.js';
import {} from "../plugin_leaderboards/commandHandler";
import { handleLeaderboardCommand } from "../plugin_leaderboards/commandHandler";
import { notAPluginMessage } from "./messages";

export const isPluginMessage = (message: string) => {
    return message.startsWith(process.env.PREFIX) && message.length > 1;
};

export const handlePluginMessage = (message: Message) => {
    let input: string = message.content;
    let command: Command = new Command(message);

    if (!isPluginValid(command.plugin)) {
        message.channel.send(notAPluginMessage);
        return;
    }
    
    handleMessage(command, message);
};

function isPluginValid(plugin: string): boolean {
    let allowedPlugins = [
        'leaderboards'
    ];

    return allowedPlugins.indexOf(plugin) > -1;
};

function handleMessage(command: Command, message: Message) {
    if (command.plugin === 'leaderboards') {
        handleLeaderboardCommand(command, message);
    }
};