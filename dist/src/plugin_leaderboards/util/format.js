"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prettyPrintLeaderboard = (leaderboard) => {
    let str = '';
    str += leaderboard.name;
    str += '\n\n';
    for (let col of leaderboard.columns) {
        let column = col;
        str += col.name;
        str += '\n';
    }
    return str;
};
//# sourceMappingURL=format.js.map