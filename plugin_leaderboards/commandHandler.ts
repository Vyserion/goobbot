import { Command } from "../core/command";
import { DataManager } from "../core/dataManager";
import { insertLeaderboard } from "./controller";
import { Message } from 'discord.js';

export const handleLeaderboardCommand = async (command: Command, message: Message) => {
    if (command.action === 'add') {
        let result = await insertLeaderboard(command);
        console.log(result);
        message.channel.send(result);
    }

    return;
};