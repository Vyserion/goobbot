import { Leaderboard, Column, Row } from "../models";

export const prettyPrintLeaderboard = (leaderboard: Leaderboard) => {
	let str = "";

	str += leaderboard.name;
	str += "\n\n";


	for (let leaderboardCol of leaderboard.columns) {
		let col: Column = leaderboardCol;
		str += col.name;
		str += "\n";
	}

	for (let leaderboardRow of leaderboard.rows) {
		let row: Row = leaderboardRow;
		str += row.name;
		str += "\n";
	}

	return str;
};
