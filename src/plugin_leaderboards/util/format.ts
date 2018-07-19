import Leaderboard from "../models/Leaderboard";
import Column from "../models/Column";
import Row from "../models/Row";

export const prettyPrintLeaderboard = (leaderboard: Leaderboard) => {
    let str = '';

    str += leaderboard.name;
    str += '\n\n';

    // TODO: Columns should go across

    for (let col of leaderboard.columns) {
        let column: Column = col;
        str += col.name;
        str += '\n';
    }

    for (let leaderboardRow of leaderboard.rows) {
        let row: Row = leaderboardRow;
        str += row.name;
        str += '\n';
    }

    return str;
}