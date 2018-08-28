import { Leaderboard } from "../models";

export const prettyPrintLeaderboard = (leaderboard: Leaderboard) => {
	let output = "";

	output += leaderboard.name;
	output += "\n\n";

	const printedRows = [];
	let titleRow = "| | ";
	for (let col of leaderboard.columns) {
		titleRow += `${col.name} | `;
	}
	printedRows.push(titleRow.trim());

	for (let row of leaderboard.rows) {
		let rowStr = "| ";
		rowStr += `${row.name} | `;

		for (let col of leaderboard.columns) {
			for (let val of leaderboard.values) {
				if (val.rowId === row.id && val.columnId === col.id) {
					rowStr += `${val.value} | `;
				}
			}
		}

		printedRows.push(rowStr.trim());
	}

	// TODO: DO SOMETHING WITH THE GODAMN SPACING

	output += printedRows.join("\n");

	return output;
};
