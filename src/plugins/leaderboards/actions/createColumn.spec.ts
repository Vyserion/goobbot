import "mocha";
import { expect } from "chai";
import { stub, SinonStub } from "sinon";
import { TCommand } from "../../../core/typings";
import { Actions, ColumnTypes } from "../config";
import { CreateColumnHandler } from "./createColumn";
import { Leaderboards } from "../dao/leaderboards";
import { TLeaderboard, TColumn } from "../typings";
import { Columns } from "../dao/columns";

describe("plugins/leaderboards/actions/createColumn", () => {
	describe("handleAction()", () => {
		it("should check for less than 2 arguments", async () => {
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.createColumn,
				arguments: ["not enough arguments"],
				originalMessage: null
			};

			const actionHandler = new CreateColumnHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = "No leaderboard or column name was provided.";
			expect(result).to.equal(expectedResult);
		});

		it("should check for more than 3 arguments", async () => {
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.createColumn,
				arguments: ["too", "many", "arguments", "here"],
				originalMessage: null
			};

			const actionHandler = new CreateColumnHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = "Too many arguments provided.";
			expect(result).to.equal(expectedResult);
		});

		it("should return an error if no leaderboard is found", async () => {
			const leaderboardName = "My Leaderboard";
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.createColumn,
				arguments: [leaderboardName, "A Column"],
				originalMessage: null
			};

			stub(Leaderboards, "getLeaderboard").resolves(null);

			const actionHandler = new CreateColumnHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `A leaderboard with the name ${leaderboardName} was not found.`;
			expect(result).to.equal(expectedResult);

			(Leaderboards.getLeaderboard as SinonStub).restore();
		});

		it("should return an error if a column with the same name is found", async () => {
			const leaderboardName = "My Leaderboard";
			const columnName = "A Column";
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.createColumn,
				arguments: [leaderboardName, columnName],
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

			const actionHandler = new CreateColumnHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `A column with the name ${columnName} already for exists for leaderboard ${leaderboardName}.`;
			expect(result).to.equal(expectedResult);

			(Leaderboards.getLeaderboard as SinonStub).restore();
			(Columns.getColumn as SinonStub).restore();
		});

		it("should return an error when the provided type isn't known", async () => {
			const leaderboardName = "My Leaderboard";
			const columnName = "A Column";
			const columnType = "Unknown";
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.createColumn,
				arguments: [leaderboardName, columnName, columnType],
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

			const actionHandler = new CreateColumnHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `The column type ${columnType.toUpperCase()} is invalid.`;
			expect(result).to.equal(expectedResult);

			(Leaderboards.getLeaderboard as SinonStub).restore();
			(Columns.getColumn as SinonStub).restore();
		});

		it("should return a success message when the column is created", async () => {
			const leaderboardName = "My Leaderboard";
			const columnName = "A Column";
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.createColumn,
				arguments: [leaderboardName, columnName],
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
			stub(Columns, "createColumn");

			const actionHandler = new CreateColumnHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `Successfully created leaderboard column ${columnName}.`;
			expect(result).to.equal(expectedResult);

			(Leaderboards.getLeaderboard as SinonStub).restore();
			(Columns.getColumn as SinonStub).restore();
			(Columns.createColumn as SinonStub).restore();
		});

		it("should return a success message when the column is created with a valid type", async () => {
			const leaderboardName = "My Leaderboard";
			const columnName = "A Column";
			const columnType = ColumnTypes.DATA;
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.createColumn,
				arguments: [leaderboardName, columnName, columnType],
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
			stub(Columns, "createColumn");

			const actionHandler = new CreateColumnHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `Successfully created leaderboard column ${columnName}.`;
			expect(result).to.equal(expectedResult);

			(Leaderboards.getLeaderboard as SinonStub).restore();
			(Columns.getColumn as SinonStub).restore();
			(Columns.createColumn as SinonStub).restore();
		});
	});
});
