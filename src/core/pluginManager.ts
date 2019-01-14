import { createCommand, TCommand } from "../core/command";
import { notAPluginMessage } from "./messages";
import { LeaderboardHandler } from "../plugin_leaderboards/leaderboardHandler";
import { Message } from "discord.js";

export let plugins: any[];

export function registerPlugins() {
    plugins = [];
    plugins.push(new LeaderboardHandler());
}

export function handlePluginMessage(message: Message) {
    let command = createCommand(message);

    if (!isPluginValid(command.plugin)) {
        message.channel.send(notAPluginMessage);
        return;
    }

    handleMessage(command, message);
}

export function isPluginMessage(message: string): boolean {
    return message.startsWith(process.env.PREFIX) && message.length > 1;
}

function handleMessage(command: TCommand, message: Message) {
    let plugin = plugins.find(p => p.name === command.plugin);
    plugin.handleCommand(command, message);
}

function isPluginValid(pluginName: string): boolean {
    const found = plugins.find(p => p.name === pluginName);
    return found !== undefined;
}