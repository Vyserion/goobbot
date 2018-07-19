"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prettyPrintLeaderboard = (leaderboard) => {
    let str = '';
    str += leaderboard.name;
    str += '\n\n';
    // TODO: Columns should go across
    for (let col of leaderboard.columns) {
        let column = col;
        str += col.name;
        str += '\n';
    }
    for (let leaderboardRow of leaderboard.rows) {
        let row = leaderboardRow;
        str += row.name;
        str += '\n';
    }
    return str;
};
//# sourceMappingURL=format.js.map