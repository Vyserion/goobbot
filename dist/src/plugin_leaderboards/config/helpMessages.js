"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = require("./commands");
const showCommands = "User Commands: \n"
    + "- Get Leaderboards: !leaderboards\n"
    + "- Get Leaderboard: " + commands_1.commands.GET_LEADERBOARD + "\n"
    + "\n"
    + "Admin Commands\n"
    + "- Add Leaderboard: " + commands_1.commands.CREATE_LEADERBOARD + "\n"
    + "- Update Leaderboard: " + commands_1.commands.UPDATE_LEADERBOARD + "\n"
    + "- Delete Leaderboard: " + commands_1.commands.DELETE_LEADERBOARD + "\n"
    + "- Add Column: " + commands_1.commands.CREATE_COLUMN + "\n"
    + "- Update Column: " + commands_1.commands.UPDATE_COLUMN + "\n"
    + "- Delete Column: " + commands_1.commands.DELETE_COLUMN + "\n"
    + "\n"
    + "For more information, use the command: '!leaderboards help [command]'";
const helpMessages = {
    showCommands: showCommands
};
exports.default = helpMessages;
//# sourceMappingURL=helpMessages.js.map