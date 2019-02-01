import "mocha";
import { expect } from "chai";
import { stub, SinonStub } from "sinon";
import { TCommand } from "../../../core/typings";
import { Actions, ColumnTypes } from "../config";
import { GetLeaderboardHandler } from "./getLeaderboard";
import { Leaderboards } from "../dao/leaderboards";
import { TLeaderboard, TColumn, TRow, TValue } from "../typings";
import { Columns } from "../dao/columns";
import { Rows } from "../dao/rows";
import { Values } from "../dao/values";

describe("plugins/leaderboards/actions/getLeaderboard", () => {
	describe("handleAction()", () => {
		it("should check for less than 1 argument", async () => {
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.getLeaderboard,
				arguments: [],
				originalMessage: null
			};

			const actionHandler = new GetLeaderboardHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = "No name was provided.";
			expect(result).to.equal(expectedResult);
		});

		it("should return an error if no leaderboard is found", async () => {
			const leaderboardName = "My Leaderboard";
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.getLeaderboard,
				arguments: [leaderboardName],
				originalMessage: null
			};

			stub(Leaderboards, "getLeaderboard").resolves(null);

			const actionHandler = new GetLeaderboardHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `A leaderboard with the name ${leaderboardName} was not found.`;
			expect(result).to.equal(expectedResult);

			(Leaderboards.getLeaderboard as SinonStub).restore();
		});

		it("should return a leaderboard when successful", async () => {
			const leaderboardName = "My Leaderboard";
			const columnName = "A Column";
			const rowName = "A Row";
			const value = "val";
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.getLeaderboard,
				arguments: [leaderboardName],
				originalMessage: null
			};

			const leaderboard: TLeaderboard = {
				name: leaderboardName,
				columns: [],
				rows: [],
				values: []
			};
			stub(Leaderboards, "getLeaderboard").resolves(leaderboard);
			const columns: TColumn[] = [
				{
					id: 1,
					name: columnName,
					type: ColumnTypes.DATA
				}
			];
			stub(Columns, "getColumns").resolves(columns);
			const rows: TRow[] = [
				{
					id: 1,
					name: rowName
				}
			];
			stub(Rows, "getRows").resolves(rows);
			const values: TValue[] = [
				{
					rowid: 1,
					columnid: 1,
					value: value
				}
			];
			stub(Values, "getValues").resolves(values);

			const actionHandler = new GetLeaderboardHandler(command);
			const result = await actionHandler.handleAction();
			const consoleStr = "```";
			const expectedResult = `${consoleStr}${leaderboardName} 

|       | A Column |
| A Row | val      |
${consoleStr}`;
			expect(result).to.equal(expectedResult);

			(Leaderboards.getLeaderboard as SinonStub).restore();
			(Columns.getColumns as SinonStub).restore();
			(Rows.getRows as SinonStub).restore();
			(Values.getValues as SinonStub).restore();
		});
	});
});
