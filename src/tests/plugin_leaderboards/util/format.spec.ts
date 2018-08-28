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
					id: 1,
					columnId: 1,
					rowId: 1,
					value: 4
				},
				{
					id: 2,
					columnId: 1,
					rowId: 2,
					value: 9
				},
				{
					id: 3,
					columnId: 1,
					rowId: 3,
					value: 1
				},
				{
					id: 4,
					columnId: 1,
					rowId: 4,
					value: 12
				},
				{
					id: 5,
					columnId: 1,
					rowId: 5,
					value: 7
				},
				// Column Two
				{
					id: 6,
					columnId: 1,
					rowId: 1,
					value: 7
				},
				{
					id: 7,
					columnId: 1,
					rowId: 2,
					value: 8
				},
				{
					id: 8,
					columnId: 1,
					rowId: 3,
					value: 5
				},
				{
					id: 9,
					columnId: 1,
					rowId: 4,
					value: 1
				},
				{
					id: 10,
					columnId: 1,
					rowId: 5,
					value: 23
				},
				// Column Three
				{
					id: 11,
					columnId: 1,
					rowId: 1,
					value: 3
				},
				{
					id: 12,
					columnId: 1,
					rowId: 2,
					value: 1
				},
				{
					id: 13,
					columnId: 1,
					rowId: 3,
					value: 6
				},
				{
					id: 14,
					columnId: 1,
					rowId: 4,
					value: 1
				},
				{
					id: 15,
					columnId: 1,
					rowId: 5,
					value: 3
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
			const expectedOutput = `Test Leaderboard Name

| | Column One | Column Two | Column Three |
| Row One | 4 | 7 | 3 |
| Row Two | 9 | 8 | 1 |
| Row Three | 1 | 5 | 6 |
| Row Four | 12 | 1 | 1 |
| Row Five | 7 | 23 | 3 |`;

			const output = prettyPrintLeaderboard(input);
			expect(output).to.equal(expectedOutput);
		});
	});
});
