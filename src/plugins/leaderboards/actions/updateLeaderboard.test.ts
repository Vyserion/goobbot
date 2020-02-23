import { TCommand } from "../../../core/typings";
import { Actions } from "../config";
import { UpdateLeaderboardHandler } from "./updateLeaderboard";
import * as Guilds from "../../../core/guilds/guilds";
import * as Leaderboards from "../dao/leaderboards";
import { TLeaderboard } from "../typings";
import { createMockedMessage } from "../../../test";

describe("plugin/leaderboards/actions/updateLeaderboard", () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("handleAction()", () => {
		it("should check for less than 2 arguments", async () => {
			const mockCommand: TCommand = {
				plugin: "leaderboards",
				action: Actions.updateLeaderboard,
				arguments: ["not enough arguments"],
				originalMessage: null
			};

			const actionHandler = new UpdateLeaderboardHandler(mockCommand);
			const result = await actionHandler.handleAction();
			const expectedResult = "No names were provided for the leaderboard.";
			expect(result).toEqual(expectedResult);
		});

		it("should return an error if no leaderboard is found", async () => {
			jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
			jest.spyOn(Leaderboards, "getLeaderboard").mockReturnValueOnce(Promise.resolve(null));

			const leaderboardName = "Test Leaderboard";
			const mockedMessage = createMockedMessage();
			const mockCommand: TCommand = {
				plugin: "leaderboards",
				action: Actions.updateLeaderboard,
				arguments: [leaderboardName, "Test Leaderboard"],
				originalMessage: mockedMessage
			};

			const actionHandler = new UpdateLeaderboardHandler(mockCommand);
			const result = await actionHandler.handleAction();
			const expectedResult = `A leaderboard with the name ${leaderboardName} could not be found.`;
			expect(result).toEqual(expectedResult);
		});

		it("should return an error if the new leaderboard name already exists", async () => {
			jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));

			const mockLeaderboard: TLeaderboard = {
				name: "Test Leaderboard",
				columns: [],
				rows: [],
				values: []
			};
			const mockNewLeaderboard: TLeaderboard = {
				name: "New Leaderboard",
				columns: [],
				rows: [],
				values: []
			};
			jest.spyOn(Leaderboards, "getLeaderboard")
				.mockReturnValueOnce(Promise.resolve(mockLeaderboard))
				.mockReturnValueOnce(Promise.resolve(mockNewLeaderboard));

			const mockedMessage = createMockedMessage();
			const mockCommand: TCommand = {
				plugin: "leaderboards",
				action: Actions.updateLeaderboard,
				arguments: [mockLeaderboard.name, mockNewLeaderboard.name],
				originalMessage: mockedMessage
			};

			const actionHandler = new UpdateLeaderboardHandler(mockCommand);
			const result = await actionHandler.handleAction();
			const expectedResult = `A leaderboard with the name ${mockNewLeaderboard.name} already exists.`;
			expect(result).toEqual(expectedResult);
		});

		it("should return a success message when updating the leaderboard", async () => {
			jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
			const mockLeaderboard: TLeaderboard = {
				name: "Test Leaderboard",
				columns: [],
				rows: [],
				values: []
			};
			jest.spyOn(Leaderboards, "getLeaderboard")
				.mockReturnValueOnce(Promise.resolve(mockLeaderboard))
				.mockReturnValueOnce(Promise.resolve(null));

			const newLeaderboardName = "Test New Leaderboard";
			const mockedMessage = createMockedMessage();
			const mockCommand: TCommand = {
				plugin: "leaderboards",
				action: Actions.updateLeaderboard,
				arguments: [mockLeaderboard.name, newLeaderboardName],
				originalMessage: mockedMessage
			};

			const actionHandler = new UpdateLeaderboardHandler(mockCommand);
			const result = await actionHandler.handleAction();
			const expectedResult = `Successfully updated leaderboard ${mockLeaderboard.name}.`;
			expect(result).toEqual(expectedResult);
		});
	});
});
