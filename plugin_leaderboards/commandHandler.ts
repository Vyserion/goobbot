import { Command } from "../core/command";
import { DataManager } from "../core/dataManager";
import { getLeaderboards, insertLeaderboard, updateLeaderboard } from "./controller";
import { Message } from 'discord.js';
import { ErrorCodes } from './errorCodes';

export const handleLeaderboardCommand = async (command: Command, message: Message) => {
    switch (command.action) {
        case 'add': {
            handleAddCommand(command, message);
            break;
        }
        case 'update': {
            handleUpdateCommand(command, message);
            break;
        }
        default: {
            handleGetCommand(command, message);
            break;
        }
    }
};

async function handleGetCommand (command: Command, message: Message) {
    let results = await getLeaderboards();

    let response = '';

    if (results.length === 0) {
        response = 'There are currently no leaderboards';
    } else {
        for (let leaderboardIdx in results) {
            let leaderboard = results[leaderboardIdx];
            response += leaderboard.name;
            response += '\n';
        }
    }

    message.channel.send(response);
}

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

async function handleUpdateCommand (command: Command, message: Message) {
    let result = await updateLeaderboard(command);

    let response;
    switch(result) {
        case ErrorCodes.LDBD_BAD_PARAM: {
            response = 'No names were provided for the leaderboard';
            break;
        }
        case ErrorCodes.LDBD_NOT_FOUND: {
            response = 'A leaderboard with the name ' + command.arguments[0] + ' was not found';
            break;
        }
        default: {
            response = 'Successfully updated leaderboard ' + command.arguments[0];
            break;
        }
    }

    message.channel.send(response);
}