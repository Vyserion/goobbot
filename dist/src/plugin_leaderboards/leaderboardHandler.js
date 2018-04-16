"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addLeaderboard_1 = require("./actions/addLeaderboard");
const addColumn_1 = require("./actions/addColumn");
const deleteLeaderboard_1 = require("./actions/deleteLeaderboard");
const getLeaderboards_1 = require("./actions/getLeaderboards");
const getLeaderboard_1 = require("./actions/getLeaderboard");
const updateLeaderboard_1 = require("./actions/updateLeaderboard");
const updateLeaderboardColumn_1 = require("./actions/updateLeaderboardColumn");
class LeaderboardHandler {
    constructor() {
        this.name = 'leaderboards';
        this.handleCommand = (command, message) => {
            const action = command.action ? command.action : '';
            switch (action) {
                // Create commands
                case 'add': {
                    addLeaderboard_1.default(command, message);
                    break;
                }
                case 'addcol': {
                    addColumn_1.default(command, message);
                    break;
                }
                // Update commands
                case 'update': {
                    updateLeaderboard_1.default(command, message);
                    break;
                }
                case 'updatecol': {
                    updateLeaderboardColumn_1.default(command, message);
                    break;
                }
                // Delete commands
                case 'delete': {
                    deleteLeaderboard_1.default(command, message);
                    break;
                }
                // Get commands
                case 'show': {
                    getLeaderboard_1.default(command, message);
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