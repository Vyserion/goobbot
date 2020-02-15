import { TCommand } from "../../../core/typings";
import { Actions } from "../config";
import * as Guilds from "../../../core/guilds/guilds";
import * as Leaderboards from "../dao/leaderboards";
import { GetLeaderboardsHandler } from "./getLeaderboards";
import { TLeaderboard } from "../typings";
import { createMockedMessage } from "../../../test";

describe("plugin/leaderboards/actions/getLeaderboards", () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe("handleAction()", () => {

        it("should return an error if there are no leaderboards", async () => {
            jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
            jest.spyOn(Leaderboards, "getLeaderboards").mockReturnValueOnce(Promise.resolve([]));

            const mockedMessage = createMockedMessage();
            const mockCommand: TCommand = {
                plugin: "leaderboards",
                action: Actions.getLeaderboard,
                arguments: [],
                originalMessage: mockedMessage
            };

            const actionHandler = new GetLeaderboardsHandler(mockCommand);
            const result = await actionHandler.handleAction();
            const expectedResult = `There are currently no leaderboards`;
            expect(result).toEqual(expectedResult);
        });
        
        it("should return a leaderboard if one is found", async () => {
            jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
            const leaderboardName = "Test leaderboard";
            const mockLeaderboards: TLeaderboard[] =  [
                {
                    name: leaderboardName,
                    columns: [],
                    rows: [],
                    values: []
                }
            ];
            jest.spyOn(Leaderboards, "getLeaderboards").mockReturnValueOnce(Promise.resolve(mockLeaderboards));
        
            const mockedMessage = createMockedMessage();
            const mockCommand: TCommand = {
                plugin: "leaderboards",
                action: Actions.getLeaderboard,
                arguments: [],
                originalMessage: mockedMessage
            };

            const actionHandler = new GetLeaderboardsHandler(mockCommand);
            const result = await actionHandler.handleAction();
            const expectedResult = `${leaderboardName}\n`;
            expect(result).toEqual(expectedResult);
        });

        it("should return all leaderboards if some are found", async () => {
            jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
            const leaderboardName = "Test leaderboard";
            const secondLeaderboardName = "Second Test";
            const mockLeaderboards: TLeaderboard[] =  [
                {
                    name: leaderboardName,
                    columns: [],
                    rows: [],
                    values: []
                },
                {
                    name: secondLeaderboardName,
                    columns: [],
                    rows: [],
                    values: []
                }
            ];
            jest.spyOn(Leaderboards, "getLeaderboards").mockReturnValueOnce(Promise.resolve(mockLeaderboards));
        
            const mockedMessage = createMockedMessage();
            const mockCommand: TCommand = {
                plugin: "leaderboards",
                action: Actions.getLeaderboard,
                arguments: [],
                originalMessage: mockedMessage
            };

            const actionHandler = new GetLeaderboardsHandler(mockCommand);
            const result = await actionHandler.handleAction();
            const expectedResult = `${leaderboardName}\n${secondLeaderboardName}\n`;
            expect(result).toEqual(expectedResult);
        });
    });
});
