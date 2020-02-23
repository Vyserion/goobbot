import { TCommand } from "../../../core/typings";
import { Actions, ColumnTypes } from "../config";
import { UpdateValueHandler } from "./updateValue";
import * as Guilds from "../../../core/guilds/guilds";
import * as Leaderboards from "../dao/leaderboards";
import * as Columns from "../dao/columns";
import * as Rows from "../dao/rows";
import * as Values from "../dao/values";
import { TLeaderboard, TColumn, TRow } from "../typings";
import { createMockedMessage } from "../../../test";

describe("plugins/leaderboards/actions/updateValue", () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("handleAction()", () => {
		it("should check for less than 4 arguments", async () => {
			const mockCommand: TCommand = {
				plugin: "leaderboards",
				action: Actions.upsertValue,
				arguments: ["not", "enough", "arguments"],
				originalMessage: null
			};

			const actionHandler = new UpdateValueHandler(mockCommand);
			const result = await actionHandler.handleAction();
			const expectedResult = "Not enough parameters provided - please check your command.";
			expect(result).toEqual(expectedResult);
		});

		it("should return an error if no leaderboard is found", async () => {
			jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
			jest.spyOn(Leaderboards, "getLeaderboard").mockReturnValueOnce(Promise.resolve(null));

			const leaderboardName = "Test Leaderboard";
			const mockedMessage = createMockedMessage();
			const mockCommand: TCommand = {
				plugin: "leaderboards",
				action: Actions.upsertValue,
				arguments: [leaderboardName, "Column", "Row", "1"],
				originalMessage: mockedMessage
			};

			const actionHandler = new UpdateValueHandler(mockCommand);
			const result = await actionHandler.handleAction();
			const expectedResult = `A leaderboard with the name ${leaderboardName} was not found.`;
			expect(result).toEqual(expectedResult);
		});

		it("should return an error if no column is found", async () => {
			jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
			const leaderboard: TLeaderboard = {
				name: "Test Leaderboard",
				columns: [],
				rows: [],
				values: []
			};
			jest.spyOn(Leaderboards, "getLeaderboard").mockReturnValueOnce(Promise.resolve(leaderboard));

			const columnName = "Test Column";
			const mockedMessage = createMockedMessage();
			const mockCommand: TCommand = {
				plugin: "leaderboards",
				action: Actions.upsertValue,
				arguments: [leaderboard.name, columnName, "Row", "1"],
				originalMessage: mockedMessage
			};

			const actionHandler = new UpdateValueHandler(mockCommand);
			const result = await actionHandler.handleAction();
			const expectedResult = `A column with the with name ${columnName} does not exists for leaderboard ${leaderboard.name}.`;
			expect(result).toEqual(expectedResult);
		});

		it("should return an error if no row is found", async () => {
			jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
			const leaderboard: TLeaderboard = {
				name: "Test Leaderboard",
				columns: [],
				rows: [],
				values: []
			};
			jest.spyOn(Leaderboards, "getLeaderboard").mockReturnValueOnce(Promise.resolve(leaderboard));
			const column: TColumn = {
				name: "Test Column",
				type: ColumnTypes.DATA
			};
			jest.spyOn(Columns, "getColumn").mockReturnValueOnce(Promise.resolve(column));

			const rowName = "Test Row";
			const mockedMessage = createMockedMessage();
			const mockCommand: TCommand = {
				plugin: "leaderboards",
				action: Actions.upsertValue,
				arguments: [leaderboard.name, column.name, rowName, "1"],
				originalMessage: mockedMessage
			};

			const actionHandler = new UpdateValueHandler(mockCommand);
			const result = await actionHandler.handleAction();
			const expectedResult = `A row with the name ${rowName} does not exist for leaderboard ${leaderboard.name}.`;
			expect(result).toEqual(expectedResult);
		});

		it("should return a success message when updating the value", async () => {
			jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
			const leaderboard: TLeaderboard = {
				name: "Test Leaderboard",
				columns: [],
				rows: [],
				values: []
			};
			jest.spyOn(Leaderboards, "getLeaderboard").mockReturnValueOnce(Promise.resolve(leaderboard));
			const column: TColumn = {
				id: 123,
				name: "Test Column",
				type: ColumnTypes.DATA
			};
			jest.spyOn(Columns, "getColumn").mockReturnValueOnce(Promise.resolve(column));
			const row: TRow = {
				id: 456,
				name: "Test Row"
			};
			jest.spyOn(Rows, "getRow").mockReturnValueOnce(Promise.resolve(row));
			const valueDaoSpy = jest.spyOn(Values, "upsertValue");

			const testUpdateValue = "new value";
			const mockedMessage = createMockedMessage();
			const mockCommand: TCommand = {
				plugin: "leaderboards",
				action: Actions.upsertValue,
				arguments: [leaderboard.name, column.name, row.name, testUpdateValue],
				originalMessage: mockedMessage
			};

			const actionHandler = new UpdateValueHandler(mockCommand);
			const result = await actionHandler.handleAction();
			const expectedResult = `Successfully updated the value.`;
			expect(result).toEqual(expectedResult);
			expect(valueDaoSpy).toHaveBeenCalledTimes(1);
			expect(valueDaoSpy).toHaveBeenCalledWith(123, 456, testUpdateValue);
		});
	});
});
