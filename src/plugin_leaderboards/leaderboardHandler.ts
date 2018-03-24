import { Command } from "../core/command";
import { LeaderboardController } from "./controller";
import { ErrorCodes } from './config/errorCodes';
import { Message } from 'discord.js';

export class LeaderboardHandler {

    name: string = 'leaderboards';
    controller: LeaderboardController;

    constructor() {
        this.controller = new LeaderboardController();
    }

    handleCommand = (command: Command, message: Message): void => {
        const action: string = command.action ? command.action : '';

        switch (action) {
            case 'add': {
                this.handleAddCommand(command, message);
                break;
            }
            case 'update': {
                this.handleUpdateCommand(command, message);
                break;
            }
            case 'delete': {
                this.handleDeleteCommand(command, message);
                break;
            }
            default: {
                this.handleGetCommand(command, message);
                break;
            }
        }
    }

    handleGetCommand = async (command: Command, message: Message) => {
        let results = await this.controller.getLeaderboards();

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

    handleAddCommand = async (command:Command, message: Message) => {
        let result = await this.controller.insertLeaderboard(command);

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

    handleUpdateCommand = async (command: Command, message: Message) => {
        let result = await this.controller.updateLeaderboard(command);

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

    handleDeleteCommand = async (command: Command, message: Message) => {
        let result = await this.controller.deleteLeaderboard(command);

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
                response = 'Successfully deleted leaderboard ' + command.arguments[0];
                break;
            }
        }

        message.channel.send(response);
    }

}