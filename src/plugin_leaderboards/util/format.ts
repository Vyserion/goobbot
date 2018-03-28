import Leaderboard from "../models/Leaderboard";
import Column from "../models/Column";

export const prettyPrintLeaderboard = (leaderboard: Leaderboard) => {
    let str = '';

    str += leaderboard.name;
    str += '\n\n';

    for (let col of leaderboard.columns) {
        let column: Column = col;
        str += col.name;
        str += '\n';
    }

    return str;
}