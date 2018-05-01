import { Command } from "../core/command";
import { Message } from 'discord.js';
import { Commands } from "./config/Commands";

import addLeaderboard from "./actions/addLeaderboard";
import addColumn from "./actions/addColumn";
import deleteLeaderboard from "./actions/deleteLeaderboard";
import deleteColumn from "./actions/deleteColumn";
import getLeaderboards from "./actions/getLeaderboards";
import getLeaderboard from "./actions/getLeaderboard";
import updateLeaderboard from "./actions/updateLeaderboard";
import updateLeaderboardColumn from "./actions/updateLeaderboardColumn";

export class LeaderboardHandler {

    name: string = 'leaderboards';

    handleCommand = (command: Command, message: Message): void => {
        let action: string = command.action ? command.action : '';
        action = action.toLowerCase();

        switch (action) {
            // Create commands
            case Commands.CREATE_LEADERBOARD: {
                addLeaderboard(command, message);
                break;
            }
            case Commands.CREATE_COLUMN: {
                addColumn(command, message);
                break;
            }

            // Update commands
            case Commands.UPDATE_LEADERBOARD: {
                updateLeaderboard(command, message);
                break;
            }
            case 'updatecol': {
                updateLeaderboardColumn(command, message);
                break;
            }

            // Delete commands
            case Commands.DELETE_LEADERBOARD: {
                deleteLeaderboard(command, message);
                break;
            }
            case 'deletecol': {
                deleteColumn(command, message);
                break;
            }

            // Get commands
            case 'show': {
                getLeaderboard(command, message);
                break;
            }
            default: {
                getLeaderboards(message);
                break;
            }
        }
    }

}