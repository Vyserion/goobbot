import { Command } from "../core/command";
import { DataManager } from "../core/dataManager";
import { insertLeaderboard } from "./controller";
import { Message } from 'discord.js';
import { ErrorCodes } from './errorCodes';

export const handleLeaderboardCommand = async (command: Command, message: Message) => {
    switch (command.action) {
        case 'add': {
            handleAddCommand(command, message);
            break;
        }
        default: {
            break;
        }
    }
};

async function handleAddCommand (command: Command, message: Message) {
    let result = await insertLeaderboard(command);

    let response;
    switch (result) {
        case ErrorCodes.LDBD_BAD_PARAM: {
            response = 'No name was provided for the leaderboard';
            break;
        }
        case ErrorCodes.LDBD_DUP_NAME: {
            response = 'A leaderboard with the name ' + command.arguments[0] + ' already exists';
            break;
        }
        default: {
            response = 'Successfully created leaderboard ' + command.arguments[0];
            break;
        }
    }

    message.channel.send(response);
}