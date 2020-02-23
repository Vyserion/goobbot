import { TLeaderboard, TColumn, TRow, TValue } from "../typings";
import { prettyPrintLeaderboard } from "./format";
import { ColumnTypes } from "../config";

describe("plugins/leaderboards/util/format", () => {
	describe("prettyPrintLeaderboard()", () => {
		it("should format the output correctly", () => {
			const cols: TColumn[] = [
				{
					id: 1,
					name: "Column One",
					type: ColumnTypes.DATA
				},
				{
					id: 2,
					name: "Column Two",
					type: ColumnTypes.DATA
				},
				{
					id: 3,
					name: "Column Three",
					type: ColumnTypes.DATA
				}
			];

			const rows: TRow[] = [
				{
					id: 1,
					name: "Row One"
				},
				{
					id: 2,
					name: "Row Two"
				},
				{
					id: 3,
					name: "Row Three"
				},
				{
					id: 4,
					name: "Row Four"
				},
				{
					id: 5,
					name: "Row Five"
				}
			];

			const values: TValue[] = [
				// Column One
				{
					// eslint-disable-next-line @typescript-eslint/camelcase
					leaderboard_id: 1,
					columnid: 1,
					rowid: 1,
					value: "4"
				},
				{
					// eslint-disable-next-line @typescript-eslint/camelcase
					leaderboard_id: 1,
					columnid: 1,
					rowid: 2,
					value: "9"
				},
				{
					// eslint-disable-next-line @typescript-eslint/camelcase
					leaderboard_id: 1,
					columnid: 1,
					rowid: 3,
					value: "1"
				},
				{
					// eslint-disable-next-line @typescript-eslint/camelcase
					leaderboard_id: 1,
					columnid: 1,
					rowid: 4,
					value: "12"
				},
				{
					// eslint-disable-next-line @typescript-eslint/camelcase
					leaderboard_id: 1,
					columnid: 1,
					rowid: 5,
					value: "7"
				},
				// Column Two
				{
					// eslint-disable-next-line @typescript-eslint/camelcase
					leaderboard_id: 1,
					columnid: 2,
					rowid: 1,
					value: "7"
				},
				{
					// eslint-disable-next-line @typescript-eslint/camelcase
					leaderboard_id: 1,
					columnid: 2,
					rowid: 2,
					value: "8"
				},
				{
					// eslint-disable-next-line @typescript-eslint/camelcase
					leaderboard_id: 1,
					columnid: 2,
					rowid: 3,
					value: "5"
				},
				{
					// eslint-disable-next-line @typescript-eslint/camelcase
					leaderboard_id: 1,
					columnid: 2,
					rowid: 4,
					value: "1"
				},
				{
					// eslint-disable-next-line @typescript-eslint/camelcase
					leaderboard_id: 1,
					columnid: 2,
					rowid: 5,
					value: "23"
				},
				// Column Three
				{
					// eslint-disable-next-line @typescript-eslint/camelcase
					leaderboard_id: 1,
					columnid: 3,
					rowid: 1,
					value: "3"
				},
				{
					// eslint-disable-next-line @typescript-eslint/camelcase
					leaderboard_id: 1,
					columnid: 3,
					rowid: 2,
					value: "1"
				},
				{
					// eslint-disable-next-line @typescript-eslint/camelcase
					leaderboard_id: 1,
					columnid: 3,
					rowid: 3,
					value: "6"
				},
				{
					// eslint-disable-next-line @typescript-eslint/camelcase
					leaderboard_id: 1,
					columnid: 3,
					rowid: 4,
					value: "1"
				},
				{
					// eslint-disable-next-line @typescript-eslint/camelcase
					leaderboard_id: 1,
					columnid: 3,
					rowid: 5,
					value: "3"
				}
			];

			const input: TLeaderboard = {
				id: 1,
				name: "Test Leaderboard Name",
				columns: cols,
				rows,
				values
			};

			// Formatting here is important - it will add the tabs in.
			const consoleStr = "```";
			const expectedOutput = `Test Leaderboard Name 

${consoleStr}
|           | Column One | Column Two | Column Three |
| Row One   | 4          | 7          | 3            |
| Row Two   | 9          | 8          | 1            |
| Row Three | 1          | 5          | 6            |
| Row Four  | 12         | 1          | 1            |
| Row Five  | 7          | 23         | 3            |
${consoleStr}`;

			const output = prettyPrintLeaderboard(input);

			expect(output).toEqual(expectedOutput);
		});
	});
});
