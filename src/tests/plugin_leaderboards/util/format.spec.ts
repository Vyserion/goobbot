import "mocha";
import { expect } from "chai";
import { Leaderboard, Column, Row, Value } from "../../../plugin_leaderboards/models";
import { prettyPrintLeaderboard } from "../../../plugin_leaderboards/util/format";
import { ColumnTypes } from "../../../plugin_leaderboards/config/ColumnTypes";

describe("util/format ::", () => {
	describe("prettyPrintLeaderboard", () => {
		it("should format the output correctly", () => {
			const cols: Column[] = [
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

			const rows: Row[] = [
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

			const values: Value[] = [
				// Column One
				{
					leaderboard_id: 1,
					columnid: 1,
					rowid: 1,
					value: "4"
				},
				{
					leaderboard_id: 1,
					columnid: 1,
					rowid: 2,
					value: "9"
				},
				{
					leaderboard_id: 1,
					columnid: 1,
					rowid: 3,
					value: "1"
				},
				{
					leaderboard_id: 1,
					columnid: 1,
					rowid: 4,
					value: "12"
				},
				{
					leaderboard_id: 1,
					columnid: 1,
					rowid: 5,
					value: "7"
				},
				// Column Two
				{
					leaderboard_id: 1,
					columnid: 2,
					rowid: 1,
					value: "7"
				},
				{
					leaderboard_id: 1,
					columnid: 2,
					rowid: 2,
					value: "8"
				},
				{
					leaderboard_id: 1,
					columnid: 2,
					rowid: 3,
					value: "5"
				},
				{
					leaderboard_id: 1,
					columnid: 2,
					rowid: 4,
					value: "1"
				},
				{
					leaderboard_id: 1,
					columnid: 2,
					rowid: 5,
					value: "23"
				},
				// Column Three
				{
					leaderboard_id: 1,
					columnid: 3,
					rowid: 1,
					value: "3"
				},
				{
					leaderboard_id: 1,
					columnid: 3,
					rowid: 2,
					value: "1"
				},
				{
					leaderboard_id: 1,
					columnid: 3,
					rowid: 3,
					value: "6"
				},
				{
					leaderboard_id: 1,
					columnid: 3,
					rowid: 4,
					value: "1"
				},
				{
					leaderboard_id: 1,
					columnid: 3,
					rowid: 5,
					value: "3"
				}
			];

			const input: Leaderboard = {
				id: 1,
				name: "Test Leaderboard Name",
				columns: cols,
				rows: rows,
				values: values
			};

			// Formatting here is important - it will add the tabs in.
			const consoleStr = "```";
			const expectedOutput = `${consoleStr}Test Leaderboard Name 

|           | Column One | Column Two | Column Three |
| Row One   | 4          | 7          | 3            |
| Row Two   | 9          | 8          | 1            |
| Row Three | 1          | 5          | 6            |
| Row Four  | 12         | 1          | 1            |
| Row Five  | 7          | 23         | 3            |
${consoleStr}`;

			const output = prettyPrintLeaderboard(input);

			expect(output).to.equal(expectedOutput);
		});
	});
});
