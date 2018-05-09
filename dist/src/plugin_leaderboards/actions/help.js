"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpMessages_1 = require("../config/helpMessages");
const commands_1 = require("../config/commands");
const showHelp = async (command, message) => {
    if (command.arguments.length === 0) {
        message.channel.send(helpMessages_1.default.showCommands);
    }
    else {
        let requestedCommand = command.arguments[0].toLowerCase();
        let response = '';
        if (requestedCommand === commands_1.commands.GET_LEADERBOARD)
            response = helpMessages_1.default.getLeaderboard;
        else if (requestedCommand === commands_1.commands.CREATE_LEADERBOARD)
            response = helpMessages_1.default.createLeaderboard;
        else if (requestedCommand === commands_1.commands.UPDATE_LEADERBOARD)
            response = helpMessages_1.default.updateLeaderboard;
        else if (requestedCommand === commands_1.commands.DELETE_LEADERBOARD)
            response = helpMessages_1.default.deleteLeaderboard;
        else if (requestedCommand === commands_1.commands.CREATE_COLUMN)
            response = helpMessages_1.default.createColumn;
        else if (requestedCommand === commands_1.commands.UPDATE_COLUMN)
            response = helpMessages_1.default.updateColumn;
        else if (requestedCommand === commands_1.commands.DELETE_COLUMN)
            response = helpMessages_1.default.deleteColumn;
        else
            response = helpMessages_1.default.getLeaderboards;
        message.channel.send(response);
    }
};
exports.default = showHelp;
//# sourceMappingURL=help.js.map