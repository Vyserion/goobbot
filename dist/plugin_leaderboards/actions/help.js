"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = require("../config/commands");
const helptext_1 = require("../config/helptext");
async function showHelp(command) {
    if (command.arguments.length === 0) {
        return helptext_1.showCommands;
    }
    else {
        const requestedCommand = command.arguments[0].toLowerCase();
        let response = "";
        if (requestedCommand === commands_1.Commands.GET_LEADERBOARD)
            response = helptext_1.getLeaderboard;
        else if (requestedCommand === commands_1.Commands.CREATE_LEADERBOARD)
            response = helptext_1.createLeaderboard;
        else if (requestedCommand === commands_1.Commands.UPDATE_LEADERBOARD)
            response = helptext_1.updateLeaderboard;
        else if (requestedCommand === commands_1.Commands.DELETE_LEADERBOARD)
            response = helptext_1.deleteLeaderboard;
        else if (requestedCommand === commands_1.Commands.CREATE_COLUMN)
            response = helptext_1.createColumn;
        else if (requestedCommand === commands_1.Commands.UPDATE_COLUMN)
            response = helptext_1.updateColumn;
        else if (requestedCommand === commands_1.Commands.DELETE_COLUMN)
            response = helptext_1.deleteColumn;
        else if (requestedCommand === commands_1.Commands.CREATE_ROW)
            response = helptext_1.createRow;
        else if (requestedCommand === commands_1.Commands.UPDATE_ROW)
            response = helptext_1.updateRow;
        else if (requestedCommand === commands_1.Commands.DELETE_ROW)
            response = helptext_1.deleteRow;
        else if (requestedCommand === commands_1.Commands.UPSERT_VALUE)
            response = helptext_1.upsertValue;
        else
            response = helptext_1.getLeaderboards;
        return response;
    }
}
exports.showHelp = showHelp;
//# sourceMappingURL=help.js.map