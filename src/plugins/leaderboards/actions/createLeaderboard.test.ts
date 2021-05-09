import { TCommand } from "../../../core/typings";
import { Actions } from "../config";
import { CreateLeaderboardHandler } from "./createLeaderboard";
import * as Guilds from "../../../core/guilds/guilds";
import * as Leaderboards from "../dao/leaderboards";
import { TLeaderboard } from "../typings";
import { createMockedMessage } from "../../../test";

describe("plugins/leaderboards/actions/createLeaderboard", () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("handleAction()", () => {
		it("should check for less than 1 argument", async () => {
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.createLeaderboard,
				arguments: [],
				originalMessage: null,
			};

			const actionHandler = new CreateLeaderboardHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = "No name was provided for the leaderboard.";
			expect(result).toEqual(expectedResult);
		});

		it("should return an error if a leaderboard with the same name is found", async () => {
			jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
			const leaderboard: TLeaderboard = {
				name: "Test Leaderboard",
				columns: [],
				rows: [],
				values: [],
			};
			jest.spyOn(Leaderboards, "getLeaderboard").mockReturnValueOnce(Promise.resolve(leaderboard));

			const mockedMessage = createMockedMessage();
			const command: TCommand = {
				plugin: "leadeboards",
				action: Actions.createLeaderboard,
				arguments: [leaderboard.name],
				originalMessage: mockedMessage,
			};

			const actionHandler = new CreateLeaderboardHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `A leaderboard with the name ${leaderboard.name} already exists.`;
			expect(result).toEqual(expectedResult);
		});

		it("should return a success message when a leaderboard is created", async () => {
			jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
			jest.spyOn(Leaderboards, "getLeaderboard").mockReturnValueOnce(Promise.resolve(null));
			const createLeaderboardSpy = jest.spyOn(Leaderboards, "createLeaderboard");

			const leaderboardName = "Test Leaderboard";
			const mockedMessage = createMockedMessage();
			const command: TCommand = {
				plugin: "leadeboards",
				action: Actions.createLeaderboard,
				arguments: [leaderboardName],
				originalMessage: mockedMessage,
			};

			const actionHandler = new CreateLeaderboardHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `Successfully created leaderboard ${leaderboardName}.`;
			expect(result).toEqual(expectedResult);
			expect(createLeaderboardSpy).toHaveBeenCalledTimes(1);
			expect(createLeaderboardSpy).toHaveBeenCalledWith(leaderboardName, 1);
		});
	});
});
