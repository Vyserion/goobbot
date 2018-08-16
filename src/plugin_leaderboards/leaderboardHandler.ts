import { Command } from "../core/command";
import { Message } from 'discord.js';
import { commands } from "./config/commands";

import addLeaderboard from "./actions/addLeaderboard";
import addColumn from "./actions/addColumn";
import addRow from "./actions/addRow";
import deleteLeaderboard from "./actions/deleteLeaderboard";
import deleteColumn from "./actions/deleteColumn";
import deleteRow from "./actions/deleteRow";
import getLeaderboards from "./actions/getLeaderboards";
import getLeaderboard from "./actions/getLeaderboard";
import updateLeaderboard from "./actions/updateLeaderboard";
import updateLeaderboardColumn from "./actions/updateLeaderboardColumn";
import updateLeaderboardRow from "./actions/updateRow";
import upsertValue from './actions/upsertValue';
import showHelp from "./actions/help";

export class LeaderboardHandler {

    name: string = 'leaderboards';

    handleCommand = (command: Command, message: Message): void => {
        let action: string = command.action ? command.action : '';
        action = action.toLowerCase();

        switch (action) {
            case commands.CREATE_LEADERBOARD: {
                addLeaderboard(command, message);
                break;
            }
            case commands.CREATE_COLUMN: {
                addColumn(command, message);
                break;
            }
            case commands.CREATE_ROW: {
                addRow(command, message);
                break;
            }

            case commands.UPDATE_LEADERBOARD: {
                updateLeaderboard(command, message);
                break;
            }
            case commands.UPDATE_COLUMN: {
                updateLeaderboardColumn(command, message);
                break;
            }
            case commands.UPDATE_ROW: {
                updateLeaderboardRow(command, message);
                break;
            }

            case commands.DELETE_LEADERBOARD: {
                deleteLeaderboard(command, message);
                break;
            }
            case commands.DELETE_COLUMN: {
                deleteColumn(command, message);
                break;
            }
            case commands.DELETE_ROW: {
                deleteRow(command, message);
                break;
            }

            case commands.GET_LEADERBOARD: {
                getLeaderboard(command, message);
                break;
            }

            case commands.UPSERT_VALUE: {
                upsertValue(command, message);
                break;
            }

            case commands.HELP: {
                showHelp(command, message);
                break;
            }

            default: {
                getLeaderboards(message);
                break;
            }
        }
    }

}