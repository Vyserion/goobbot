import { Actions, ColumnTypes } from "../config";
import { TCommand } from "../../../core/typings";
import { CreateColumnHandler } from "./createColumn";
import * as Guilds from "../../../core/guilds/guilds";
import * as Leaderboards from "../dao/leaderboards";
import * as Columns from "../dao/columns";
import { createMockedMessage } from "../../../test";
import { TLeaderboard, TColumn } from "../typings";

describe("plugins/leaderboards/actions/createColumn", () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("handleAction()", () => {
		it("should check for less than 2 arguments", async () => {
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.createColumn,
				arguments: ["not enough arguments"],
				originalMessage: null,
			};

			const actionHandler = new CreateColumnHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = "No leaderboard or column name was provided.";
			expect(result).toEqual(expectedResult);
		});

		it("should check for more than 3 arguments", async () => {
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.createColumn,
				arguments: ["too", "many", "arguments", "given"],
				originalMessage: null,
			};

			const actionHandler = new CreateColumnHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = "Too many arguments provided.";
			expect(result).toEqual(expectedResult);
		});

		it("should return an error if no leaderboard is found", async () => {
			jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
			jest.spyOn(Leaderboards, "getLeaderboard").mockReturnValueOnce(Promise.resolve(null));

			const leaderboardName = "Test Leaderboard";
			const mockedMessage = createMockedMessage();
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.createColumn,
				arguments: [leaderboardName, "A Column"],
				originalMessage: mockedMessage,
			};

			const actionHandler = new CreateColumnHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `A leaderboard with the name ${leaderboardName} was not found.`;
			expect(result).toEqual(expectedResult);
		});

		it("should return an error if a column with the same name is found", async () => {
			jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
			const leaderboard: TLeaderboard = {
				name: "Test Leaderboard",
				columns: [],
				rows: [],
				values: [],
			};
			jest.spyOn(Leaderboards, "getLeaderboard").mockReturnValueOnce(Promise.resolve(leaderboard));
			const column: TColumn = {
				name: "Test Column",
				type: ColumnTypes.DATA,
			};
			jest.spyOn(Columns, "getColumn").mockReturnValueOnce(Promise.resolve(column));

			const mockedMessage = createMockedMessage();
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.createColumn,
				arguments: [leaderboard.name, column.name],
				originalMessage: mockedMessage,
			};

			const actionHandler = new CreateColumnHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `A column with the name ${column.name} already for exists for leaderboard ${leaderboard.name}.`;
			expect(result).toEqual(expectedResult);
		});

		it("should return an error when the provided type isn't known", async () => {
			jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
			const leaderboard: TLeaderboard = {
				name: "Test Leaderboard",
				columns: [],
				rows: [],
				values: [],
			};
			jest.spyOn(Leaderboards, "getLeaderboard").mockReturnValueOnce(Promise.resolve(leaderboard));
			jest.spyOn(Columns, "getColumn").mockReturnValueOnce(Promise.resolve(null));

			const columnName = "Test Column";
			const unknownType = "Unknown Type";
			const mockedMessage = createMockedMessage();
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.createColumn,
				arguments: [leaderboard.name, columnName, unknownType],
				originalMessage: mockedMessage,
			};

			const actionHandler = new CreateColumnHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `The column type ${unknownType.toUpperCase()} is invalid.`;
			expect(result).toEqual(expectedResult);
		});

		it("should return a success message when the column is created", async () => {
			jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
			const leaderboard: TLeaderboard = {
				id: 13,
				name: "Test Leaderboard",
				columns: [],
				rows: [],
				values: [],
			};
			jest.spyOn(Leaderboards, "getLeaderboard").mockReturnValueOnce(Promise.resolve(leaderboard));
			jest.spyOn(Columns, "getColumn").mockReturnValueOnce(Promise.resolve(null));
			const createColumnSpy = jest.spyOn(Columns, "createColumn");

			const columnName = "Test Column";
			const mockedMessage = createMockedMessage();
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.createColumn,
				arguments: [leaderboard.name, columnName],
				originalMessage: mockedMessage,
			};

			const actionHandler = new CreateColumnHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `Successfully created leaderboard column ${columnName}.`;
			expect(result).toEqual(expectedResult);
			expect(createColumnSpy).toHaveBeenCalledTimes(1);
			expect(createColumnSpy).toHaveBeenCalledWith(columnName, ColumnTypes.DATA, leaderboard.id);
		});

		it("should return a success message when the column is created with a valid type", async () => {
			jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
			const leaderboard: TLeaderboard = {
				id: 13,
				name: "Test Leaderboard",
				columns: [],
				rows: [],
				values: [],
			};
			jest.spyOn(Leaderboards, "getLeaderboard").mockReturnValueOnce(Promise.resolve(leaderboard));
			jest.spyOn(Columns, "getColumn").mockReturnValueOnce(Promise.resolve(null));
			const createColumnSpy = jest.spyOn(Columns, "createColumn");

			const columnName = "Test Column";
			const columnType = ColumnTypes.DATA;
			const mockedMessage = createMockedMessage();
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.createColumn,
				arguments: [leaderboard.name, columnName, columnType],
				originalMessage: mockedMessage,
			};

			const actionHandler = new CreateColumnHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `Successfully created leaderboard column ${columnName}.`;
			expect(result).toEqual(expectedResult);
			expect(createColumnSpy).toHaveBeenCalledTimes(1);
			expect(createColumnSpy).toHaveBeenCalledWith(columnName, columnType, leaderboard.id);
		});
	});
});
