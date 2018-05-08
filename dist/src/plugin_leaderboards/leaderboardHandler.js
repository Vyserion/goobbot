"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = require("./config/commands");
const addLeaderboard_1 = require("./actions/addLeaderboard");
const addColumn_1 = require("./actions/addColumn");
const deleteLeaderboard_1 = require("./actions/deleteLeaderboard");
const deleteColumn_1 = require("./actions/deleteColumn");
const getLeaderboards_1 = require("./actions/getLeaderboards");
const getLeaderboard_1 = require("./actions/getLeaderboard");
const updateLeaderboard_1 = require("./actions/updateLeaderboard");
const updateLeaderboardColumn_1 = require("./actions/updateLeaderboardColumn");
const help_1 = require("./actions/help");
class LeaderboardHandler {
    constructor() {
        this.name = 'leaderboards';
        this.handleCommand = (command, message) => {
            let action = command.action ? command.action : '';
            action = action.toLowerCase();
            switch (action) {
                case commands_1.commands.CREATE_LEADERBOARD: {
                    addLeaderboard_1.default(command, message);
                    break;
                }
                case commands_1.commands.CREATE_COLUMN: {
                    addColumn_1.default(command, message);
                    break;
                }
                case commands_1.commands.UPDATE_LEADERBOARD: {
                    updateLeaderboard_1.default(command, message);
                    break;
                }
                case commands_1.commands.UPDATE_COLUMN: {
                    updateLeaderboardColumn_1.default(command, message);
                    break;
                }
                case commands_1.commands.DELETE_LEADERBOARD: {
                    deleteLeaderboard_1.default(command, message);
                    break;
                }
                case commands_1.commands.DELETE_COLUMN: {
                    deleteColumn_1.default(command, message);
                    break;
                }
                case commands_1.commands.GET_LEADERBOARD: {
                    getLeaderboard_1.default(command, message);
                    break;
                }
                case commands_1.commands.HELP: {
                    help_1.default(command, message);
                    break;
                }
                default: {
                    getLeaderboards_1.default(message);
                    break;
                }
            }
        };
    }
}
exports.LeaderboardHandler = LeaderboardHandler;
//# sourceMappingURL=leaderboardHandler.js.map