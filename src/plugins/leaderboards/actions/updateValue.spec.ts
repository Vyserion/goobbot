import "mocha";
import { expect } from "chai";
import { stub, SinonStub } from "sinon";
import { TCommand } from "../../../core/typings";
import { Actions, ColumnTypes } from "../config";
import { UpdateValueHandler } from "./updateValue";
import { Leaderboards } from "../dao/leaderboards";
import { TLeaderboard, TColumn, TRow } from "../typings";
import { Columns } from "../dao/columns";
import { Rows } from "../dao/rows";
import { Values } from "../dao/values";

describe("plugins/leaderboards/actions/updateValue", () => {
	describe("handleAction()", () => {
		it("should check for less than 4 arguments", async () => {
			const command: TCommand = {
				plugin: "leaderbaords",
				action: Actions.upsertValue,
				arguments: ["not", "enough", "arguments"],
				originalMessage: null
			};

			const actionHandler = new UpdateValueHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = "Not enough parameters provided - please check your command.";
			expect(result).to.equal(expectedResult);
		});

		it("should return an error if no leaderboard is found", async () => {
			const leaderboardName = "My Leaderboard";
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.upsertValue,
				arguments: [leaderboardName, "A Column", "A Row", "1"],
				originalMessage: null
			};

			stub(Leaderboards, "getLeaderboard").resolves(null);

			const actionHandler = new UpdateValueHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `A leaderboard with the name ${leaderboardName} was not found.`;
			expect(result).to.equal(expectedResult);

			(Leaderboards.getLeaderboard as SinonStub).restore();
		});

		it("should return an error if no column is found", async () => {
			const leaderboardName = "My Leaderboard";
			const columnName = "A Column";
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.upsertValue,
				arguments: [leaderboardName, columnName, "A Row", "1"],
				originalMessage: null
			};

			const leaderboard: TLeaderboard = {
				name: leaderboardName,
				columns: [],
				rows: [],
				values: []
			};
			stub(Leaderboards, "getLeaderboard").resolves(leaderboard);
			stub(Columns, "getColumn").resolves(null);

			const actionHandler = new UpdateValueHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `A column with the with name ${columnName} does not exists for leaderboard ${leaderboardName}.`;
			expect(result).to.equal(expectedResult);

			(Leaderboards.getLeaderboard as SinonStub).restore();
			(Columns.getColumn as SinonStub).restore();
		});

		it("should return an error if no row is found", async () => {
			const leaderboardName = "My Leaderboard";
			const columnName = "A Column";
			const rowName = "A Row";
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.upsertValue,
				arguments: [leaderboardName, columnName, rowName, "1"],
				originalMessage: null
			};

			const leaderboard: TLeaderboard = {
				name: leaderboardName,
				columns: [],
				rows: [],
				values: []
			};
			stub(Leaderboards, "getLeaderboard").resolves(leaderboard);
			const column: TColumn = {
				name: columnName,
				type: ColumnTypes.DATA
			};
			stub(Columns, "getColumn").resolves(column);
			stub(Rows, "getRow").resolves(null);

			const actionHandler = new UpdateValueHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `A row with the name ${rowName} does not exist for leaderboard ${leaderboardName}.`;
			expect(result).to.equal(expectedResult);

			(Leaderboards.getLeaderboard as SinonStub).restore();
			(Columns.getColumn as SinonStub).restore();
			(Rows.getRow as SinonStub).restore();
		});

		it("should return a success message when updating the value", async () => {
			const leaderboardName = "My Leaderboard";
			const columnName = "A Column";
			const rowName = "A Row";
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.upsertValue,
				arguments: [leaderboardName, columnName, rowName, "1"],
				originalMessage: null
			};

			const leaderboard: TLeaderboard = {
				name: leaderboardName,
				columns: [],
				rows: [],
				values: []
			};
			stub(Leaderboards, "getLeaderboard").resolves(leaderboard);
			const column: TColumn = {
				name: columnName,
				type: ColumnTypes.DATA
			};
			stub(Columns, "getColumn").resolves(column);
			const row: TRow = {
				name: rowName
			};
			stub(Rows, "getRow").resolves(row);
			stub(Values, "upsertValue");

			const actionHandler = new UpdateValueHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `Successfully updated the value.`;
			expect(result).to.equal(expectedResult);

			(Leaderboards.getLeaderboard as SinonStub).restore();
			(Columns.getColumn as SinonStub).restore();
			(Rows.getRow as SinonStub).restore();
			(Values.upsertValue as SinonStub).restore();
		});
	});
});
