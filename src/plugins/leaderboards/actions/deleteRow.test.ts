import { TCommand } from "../../../core/typings";
import { Actions } from "../config";
import { DeleteRowHandler } from "./deleteRow";
import * as Guilds from "../../../core/guilds/guilds";
import * as Leaderboards from "../dao/leaderboards";
import * as Rows from "../dao/rows";
import * as Values from "../dao/values";
import { createMockedMessage } from "../../../test";
import { TLeaderboard, TRow } from "../typings";

describe("plugins/leaderboards/actions/deleteRow", () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("handleAction()", () => {
		it("should check for less than 2 arguments", async () => {
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.deleteRow,
				arguments: ["not enough arguments"],
				originalMessage: null,
			};

			const actionHandler = new DeleteRowHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = "No leaderboard or row name was provided.";
			expect(result).toEqual(expectedResult);
		});

		it("should return an error if no leaderboard is found", async () => {
			jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
			jest.spyOn(Leaderboards, "getLeaderboard").mockReturnValueOnce(Promise.resolve(null));

			const leaderboardName = "Test Leaderboard";
			const mockedMessage = createMockedMessage();
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.deleteRow,
				arguments: [leaderboardName, "A Row"],
				originalMessage: mockedMessage,
			};

			const actionHandler = new DeleteRowHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `A leaderboard with the name ${leaderboardName} was not found.`;
			expect(result).toEqual(expectedResult);
		});

		it("should return an error if no row is found", async () => {
			jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
			const leaderboard: TLeaderboard = {
				name: "Test Leaderboard",
				columns: [],
				rows: [],
				values: [],
			};
			jest.spyOn(Leaderboards, "getLeaderboard").mockReturnValueOnce(Promise.resolve(leaderboard));
			jest.spyOn(Rows, "getRow").mockReturnValueOnce(Promise.resolve(null));

			const rowName = "Test Row";
			const mockedMessage = createMockedMessage();
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.deleteRow,
				arguments: [leaderboard.name, rowName],
				originalMessage: mockedMessage,
			};

			const actionHandler = new DeleteRowHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `A row with the name ${rowName} for the leaderboard ${leaderboard.name} was not found.`;
			expect(result).toEqual(expectedResult);
		});

		it("should return a success message when the row is deleted", async () => {
			jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
			const leaderboard: TLeaderboard = {
				name: "Test Leaderboard",
				columns: [],
				rows: [],
				values: [],
			};
			jest.spyOn(Leaderboards, "getLeaderboard").mockReturnValueOnce(Promise.resolve(leaderboard));
			const row: TRow = {
				id: 30,
				name: "Test Row",
			};
			jest.spyOn(Rows, "getRow").mockReturnValueOnce(Promise.resolve(row));
			const deleteValuesSpy = jest.spyOn(Values, "deleteValuesByRow");
			const deleteRowsSpy = jest.spyOn(Rows, "deleteRow");

			const mockedMessage = createMockedMessage();
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.deleteRow,
				arguments: [leaderboard.name, row.name],
				originalMessage: mockedMessage,
			};

			const actionHandler = new DeleteRowHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `Successfully removed row ${row.name}.`;
			expect(result).toEqual(expectedResult);
			expect(deleteValuesSpy).toHaveBeenCalledTimes(1);
			expect(deleteValuesSpy).toHaveBeenCalledWith(row.id);
			expect(deleteRowsSpy).toHaveBeenCalledTimes(1);
			expect(deleteRowsSpy).toHaveBeenCalledWith(row.id);
		});
	});
});
