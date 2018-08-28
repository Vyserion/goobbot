"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = require("./config/commands");
const actions_1 = require("./actions");
const actions_2 = require("./actions");
class LeaderboardHandler {
    constructor() {
        this.name = "leaderboards";
        this.handleCommand = async (command, message) => {
            let action = command.action ? command.action : "";
            action = action.toLowerCase();
            let response;
            switch (action) {
                case commands_1.Commands.CREATE_LEADERBOARD: {
                    response = await actions_1.addLeaderboard(command);
                    break;
                }
                case commands_1.Commands.CREATE_COLUMN: {
                    response = await actions_1.addColumn(command);
                    break;
                }
                case commands_1.Commands.CREATE_ROW: {
                    response = await actions_1.addRow(command);
                    break;
                }
                case commands_1.Commands.UPDATE_LEADERBOARD: {
                    response = await actions_1.updateLeaderboard(command);
                    break;
                }
                case commands_1.Commands.UPDATE_COLUMN: {
                    response = await actions_1.updateLeaderboardColumn(command);
                    break;
                }
                case commands_1.Commands.UPDATE_ROW: {
                    response = await actions_1.updateLeaderboardRow(command);
                    break;
                }
                case commands_1.Commands.DELETE_LEADERBOARD: {
                    response = await actions_1.deleteLeaderboard(command);
                    break;
                }
                case commands_1.Commands.DELETE_COLUMN: {
                    response = await actions_1.deleteColumn(command);
                    break;
                }
                case commands_1.Commands.DELETE_ROW: {
                    response = await actions_1.deleteRow(command);
                    break;
                }
                case commands_1.Commands.GET_LEADERBOARD: {
                    response = await actions_1.getLeaderboard(command);
                    break;
                }
                case commands_1.Commands.UPSERT_VALUE: {
                    response = await actions_1.upsertValue(command);
                    break;
                }
                case commands_1.Commands.HELP: {
                    response = await actions_2.showHelp(command);
                    break;
                }
                default: {
                    response = await actions_1.getLeaderboards();
                    break;
                }
            }
            const options = {
                embed: {
                    color: "red"
                }
            };
            message.channel.send(response, options);
        };
    }
}
exports.LeaderboardHandler = LeaderboardHandler;
//# sourceMappingURL=leaderboardHandler.js.map