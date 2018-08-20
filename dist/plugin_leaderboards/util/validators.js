"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dao_1 = require("../dao");
async function commandHasCorrectArgumentsLength(command, min, max) {
    if (max) {
        return min < command.arguments.length && command.arguments.length < max;
    }
    else {
        return command.arguments.length === min;
    }
}
exports.commandHasCorrectArgumentsLength = commandHasCorrectArgumentsLength;
async function getLeaderboardId(leaderboardName) {
    const leaderboard = await dao_1.LeaderboardDAO.getLeaderboard(leaderboardName);
    if (leaderboard) {
        return leaderboard.id;
    }
    else {
        return -1;
    }
}
exports.getLeaderboardId = getLeaderboardId;
async function getColumnId(leaderboardId, columnName) {
    const column = await dao_1.ColumnDAO.getLeaderboardColumn(leaderboardId, columnName);
    if (column) {
        return column.id;
    }
    else {
        return -1;
    }
}
exports.getColumnId = getColumnId;
async function getRowId(leaderboardId, rowName) {
    const row = await dao_1.RowDAO.getLeaderboardRow(leaderboardId, rowName);
    if (row) {
        return row.id;
    }
    else {
        return -1;
    }
}
exports.getRowId = getRowId;
//# sourceMappingURL=validators.js.map