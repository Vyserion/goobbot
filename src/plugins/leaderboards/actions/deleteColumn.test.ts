import { TCommand } from "../../../core/typings";
import { Actions, ColumnTypes } from "../config";
import { DeleteColumnHandler } from "./deleteColumn";
import * as Guilds from "../../../core/guilds/guilds";
import * as Leaderboards from "../dao/leaderboards";
import * as Columns from "../dao/columns";
import * as Values from "../dao/values";
import { createMockedMessage } from "../../../test";
import { TLeaderboard, TColumn } from "../typings";

describe("plugins/leaderboards/actions/deleteColumn", () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("handleAction()", () => {
		it("should check for less than 2 arguments", async () => {
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.deleteColumn,
				arguments: ["not enough arguments"],
				originalMessage: null,
			};

			const actionHandler = new DeleteColumnHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = "No leaderboard or column name was provided.";
			expect(result).toEqual(expectedResult);
		});

		it("should return an error if no leaderboard is found", async () => {
			jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
			jest.spyOn(Leaderboards, "getLeaderboard").mockReturnValueOnce(Promise.resolve(null));

			const leaderboardName = "Test Leaderboard";
			const mockedMessage = createMockedMessage();
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.deleteColumn,
				arguments: [leaderboardName, "A Column"],
				originalMessage: mockedMessage,
			};

			const actionHandler = new DeleteColumnHandler(command);
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
				values: [],
			};
			jest.spyOn(Leaderboards, "getLeaderboard").mockReturnValueOnce(Promise.resolve(leaderboard));
			jest.spyOn(Columns, "getColumn").mockReturnValueOnce(Promise.resolve(null));

			const columnName = "Test Column";
			const mockedMessage = createMockedMessage();
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.deleteColumn,
				arguments: [leaderboard.name, columnName],
				originalMessage: mockedMessage,
			};

			const actionHandler = new DeleteColumnHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `A column with the name ${columnName} was not found for leaderboard ${leaderboard.name}.`;
			expect(result).toEqual(expectedResult);
		});

		it("should return a success message when the column is deleted", async () => {
			jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
			const leaderboard: TLeaderboard = {
				id: 9,
				name: "Test Leaderboard",
				columns: [],
				rows: [],
				values: [],
			};
			jest.spyOn(Leaderboards, "getLeaderboard").mockReturnValueOnce(Promise.resolve(leaderboard));
			const column: TColumn = {
				id: 15,
				name: "Test Column",
				type: ColumnTypes.DATA,
			};
			jest.spyOn(Columns, "getColumn").mockReturnValueOnce(Promise.resolve(column));
			const deleteValuesSpy = jest.spyOn(Values, "deleteValuesByColumn");
			const deleteColumnSpy = jest.spyOn(Columns, "deleteColumn");

			const mockedMessage = createMockedMessage();
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.deleteColumn,
				arguments: [leaderboard.name, column.name],
				originalMessage: mockedMessage,
			};

			const actionHandler = new DeleteColumnHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `Succesfully removed column ${column.name}.`;
			expect(result).toEqual(expectedResult);
			expect(deleteValuesSpy).toHaveBeenCalledTimes(1);
			expect(deleteValuesSpy).toHaveBeenCalledWith(column.id);
			expect(deleteColumnSpy).toHaveBeenCalledTimes(1);
			expect(deleteColumnSpy).toHaveBeenCalledWith(leaderboard.id, column.id);
		});
	});
});
