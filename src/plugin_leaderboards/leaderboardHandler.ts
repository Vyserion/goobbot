import { Command } from "../core/command";
import { Message } from 'discord.js';

import addLeaderboard from "./actions/addLeaderboard";
import addColumn from "./actions/addColumn";
import deleteLeaderboard from "./actions/deleteLeaderboard";
import getLeaderboards from "./actions/getLeaderboards";
import getLeaderboard from "./actions/getLeaderboard";
import updateLeaderboard from "./actions/updateLeaderboard";

export class LeaderboardHandler {

    name: string = 'leaderboards';

    handleCommand = (command: Command, message: Message): void => {
        const action: string = command.action ? command.action : '';

        switch (action) {
            // Create commands
            case 'add': {
                addLeaderboard(command, message);
                break;
            }
            case 'addcol': {
                addColumn(command, message);
                break;
            }

            // Update commands
            case 'update': {
                updateLeaderboard(command, message);
                break;
            }

            // Delete commands
            case 'delete': {
                deleteLeaderboard(command, message);
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