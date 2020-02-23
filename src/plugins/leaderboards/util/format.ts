import { TLeaderboard } from "../typings";

const spacer = " ";
const codeMarker = "```";

export function prettyPrintLeaderboard(leaderboard: TLeaderboard): string {
	// 1. Get all columns to calculate the length.
	const columns: string[][] = [];

	// 1.1 The first column contains all the names of the rows.
	const rowColumn = [""];
	leaderboard.rows.forEach(row => rowColumn.push(row.name));
	columns.push(rowColumn);

	// 1.2 The rest of the columns come from the leaderboard itself.
	leaderboard.columns.forEach(column => {
		const strings = [];

		strings.push(column.name);

		leaderboard.rows.forEach(row => {
			leaderboard.values.forEach(val => {
				if (val.rowid === row.id && val.columnid === column.id) {
					strings.push(val.value);
				}
			});
		});

		columns.push(strings);
	});

	// 2. Get the lengths of the columns
	const columnLengths = new Array(columns.length).fill(0);
	columns.forEach((column, columnIndex) => {
		column.forEach(value => {
			if (value.length > columnLengths[columnIndex]) {
				columnLengths[columnIndex] = value.length;
			}
		});
	});

	// 3. Build the output string
	let output = `${leaderboard.name} \n\n`;

	if (leaderboard.rows.length === 0) {
		output += "This leaderboard has no content.";
	} else {
		// 3.1 Add the name.
		output += `${codeMarker}\n`;

		if (leaderboard.rows.length > 0) {
			leaderboard.rows.unshift({
				name: "header placeholder"
			});
		}

		leaderboard.rows.forEach((_, rowIndex) => {
			columns.forEach((column, columnIndex) => {
				// 3.2 Add the value.
				const value = column[rowIndex];

				let valueString = `| ${value}`;
				// 3.3 Add spacers to make sure columns are the same width.
				if (value.length < columnLengths[columnIndex]) {
					const remainingSpace = columnLengths[columnIndex] - value.length;
					new Array(remainingSpace).fill(spacer).forEach(space => {
						valueString += space;
					});
				}
				valueString += spacer;

				output += valueString;
			});

			output += `|\n`;
		});

		output += codeMarker;
	}

	return output;
}
