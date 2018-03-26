import { Command } from "../core/command";
import { LeaderboardController } from "./controller";
import { ErrorCodes } from './config/errorCodes';
import { Message } from 'discord.js';
import Leaderboard from "./models/Leaderboard";
import Column from "./models/Column";

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
            case 'addcol': {
                this.handleAddColumnCommand(command, message);
                break;
            }
            case 'show': {
                this.handleShowLeaderboard(command, message);
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

    handleAddCommand = async (command: Command, message: Message) => {
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

    handleAddColumnCommand = async (command: Command, message: Message) => {
        let result = await this.controller.insertLeaderboardColumn(command);

        let response;
        switch (result) {
            case ErrorCodes.LDBD_BAD_PARAM: {
                if (command.arguments.length < 2) {
                    response = 'No leaderboard or column name was provided';
                } else {
                    response = 'Too many arguments were provided';
                }
                break;
            }
            case ErrorCodes.LDBD_NOT_FOUND: {
                response = 'A leaderboard with the name ' + command.arguments[0] + ' was not found';
                break;
            }
            case ErrorCodes.LDBD_DUP_NAME: {
                response = 'A column with the name ' + command.arguments[1] + ' for leaderboard ' + command.arguments[0] + ' already exists';
                break;
            }
            default: {
                response = 'Successfully created leaderboard column ' + command.arguments[1];
                break;
            }

        }

        message.channel.send(response);
    }

    handleShowLeaderboard = async (command: Command, message: Message) => {
        let result = await this.controller.getLeaderboard(command);

        let response;
        switch(result) {
            case ErrorCodes.LDBD_BAD_PARAM: {
                response = 'No names were provided to get the leaderboard';
                break;
            }
            case ErrorCodes.LDBD_NOT_FOUND: {
                response = 'A leaderboard with the name ' + command.arguments[0] + ' was not found';
                break;
            }
            default: {
                response = this.formatLeaderboard(result);
                break;
            }
        }

        message.channel.send(response);
    }

    formatLeaderboard = (leaderboard: Leaderboard) => {
        let str = '';

        str += leaderboard.name;
        str += '\n\n';

        for (let col of leaderboard.columns) {
            let column: Column = col;
            str += col.name;
            str += '\n';
        }

        return str;
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