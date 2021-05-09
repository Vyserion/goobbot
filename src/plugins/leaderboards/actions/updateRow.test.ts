import { TCommand } from "../../../core/typings";
import { Actions } from "../config";
import { UpdateRowHandler } from "./updateRow";
import * as Guilds from "../../../core/guilds/guilds";
import * as Leaderboards from "../dao/leaderboards";
import * as Rows from "../dao/rows";
import { TLeaderboard, TRow } from "../typings";
import { createMockedMessage } from "../../../test";

describe("plugins/leaderboards/actions/updateRow", () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("handleAction()", () => {
		it("should check for less than 3 arguments", async () => {
			const mockCommand: TCommand = {
				plugin: "leaderboards",
				action: Actions.updateRow,
				arguments: ["few", "arguments"],
				originalMessage: null,
			};

			const actionHandler = new UpdateRowHandler(mockCommand);
			const result = await actionHandler.handleAction();
			const expectedResult = `Not enough details - please check your command.`;
			expect(result).toEqual(expectedResult);
		});

		it("should return an error if no leaderboard is found", async () => {
			jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
			jest.spyOn(Leaderboards, "getLeaderboard").mockReturnValueOnce(Promise.resolve(null));

			const leaderboardName = "Test Leaderboard";
			const mockedMessage = createMockedMessage();
			const mockCommand: TCommand = {
				plugin: "leaderboards",
				action: Actions.updateRow,
				arguments: [leaderboardName, "Test Row", "Test Row"],
				originalMessage: mockedMessage,
			};

			const actionHandler = new UpdateRowHandler(mockCommand);
			const result = await actionHandler.handleAction();
			const expectedResult = `A leaderboard with the name ${leaderboardName} was not found.`;
			expect(result).toEqual(expectedResult);
		});

		it("should return an error if no row is found", async () => {
			jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
			const mockLeaderboard: TLeaderboard = {
				name: "Test Leaderboard",
				columns: [],
				rows: [],
				values: [],
			};
			jest.spyOn(Leaderboards, "getLeaderboard").mockReturnValueOnce(Promise.resolve(mockLeaderboard));
			jest.spyOn(Rows, "getRow").mockReturnValueOnce(Promise.resolve(null));

			const rowName = "Test Row";
			const mockedMessage = createMockedMessage();
			const mockCommand: TCommand = {
				plugin: "leaderboards",
				action: Actions.updateRow,
				arguments: [mockLeaderboard.name, rowName, "Test Row"],
				originalMessage: mockedMessage,
			};

			const actionHandler = new UpdateRowHandler(mockCommand);
			const result = await actionHandler.handleAction();
			const expectedResult = `A row with the name ${rowName} for leaderboard ${mockLeaderboard.name} was not found.`;
			expect(result).toEqual(expectedResult);
		});

		it("should return an error if the new row already exists", async () => {
			jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
			const mockLeaderboard: TLeaderboard = {
				name: "Test Leaderboard",
				columns: [],
				rows: [],
				values: [],
			};
			jest.spyOn(Leaderboards, "getLeaderboard").mockReturnValueOnce(Promise.resolve(mockLeaderboard));
			const mockRow: TRow = {
				name: "Test Row",
			};
			const mockNewRow: TRow = {
				name: "New Test Row",
			};
			jest.spyOn(Rows, "getRow")
				.mockReturnValueOnce(Promise.resolve(mockRow))
				.mockReturnValueOnce(Promise.resolve(mockNewRow));

			const mockedMessage = createMockedMessage();
			const mockCommand: TCommand = {
				plugin: "leaderboards",
				action: Actions.updateRow,
				arguments: [mockLeaderboard.name, mockRow.name, mockNewRow.name],
				originalMessage: mockedMessage,
			};

			const actionHandler = new UpdateRowHandler(mockCommand);
			const result = await actionHandler.handleAction();
			const expectedResult = `A row with the name ${mockNewRow.name} for leaderboard ${mockLeaderboard.name} already exists.`;
			expect(result).toEqual(expectedResult);
		});

		it("should return a success message when updating a row", async () => {
			jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
			const mockLeaderboard: TLeaderboard = {
				name: "Test Leaderboard",
				columns: [],
				rows: [],
				values: [],
			};
			jest.spyOn(Leaderboards, "getLeaderboard").mockReturnValueOnce(Promise.resolve(mockLeaderboard));
			const mockRow: TRow = {
				name: "Test Row",
			};
			jest.spyOn(Rows, "getRow")
				.mockReturnValueOnce(Promise.resolve(mockRow))
				.mockReturnValueOnce(Promise.resolve(null));

			const mockedMessage = createMockedMessage();
			const mockCommand: TCommand = {
				plugin: "leaderboards",
				action: Actions.updateRow,
				arguments: [mockLeaderboard.name, mockRow.name, "New Row"],
				originalMessage: mockedMessage,
			};

			const actionHandler = new UpdateRowHandler(mockCommand);
			const result = await actionHandler.handleAction();
			const expectedResult = `Successfully updated row ${mockRow.name}.`;
			expect(result).toEqual(expectedResult);
		});
	});
});
