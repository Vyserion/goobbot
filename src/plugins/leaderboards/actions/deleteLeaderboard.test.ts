import { TCommand } from "../../../core/typings";
import { Actions } from "../config";
import { DeleteLeaderboardHandler } from "./deleteLeaderboard";
import * as Guilds from "../../../core/guilds/guilds";
import * as Leaderboards from "../dao/leaderboards";
import * as Values from "../dao/values";
import * as Rows from "../dao/rows";
import * as Columns from "../dao/columns";
import { createMockedMessage } from "../../../test";
import { TLeaderboard } from "../typings";

describe("plugins/leaderboards/actions/deleteLeaderboard", () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe("handleAction()", () => {

        it("should check for less than 1 arguments", async () => {
            const command: TCommand = {
                plugin: "leaderboards",
                action: Actions.deleteLeaderboard,
                arguments: [],
                originalMessage: null,
            };

            const actionHandler = new DeleteLeaderboardHandler(command);
            const result = await actionHandler.handleAction();
            const expectedResult = "No names were provided for the leaderboard.";
            expect(result).toEqual(expectedResult);
        });

        it("should return an error if no leaderboard is found", async () => {
            jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
            jest.spyOn(Leaderboards, "getLeaderboard").mockReturnValueOnce(Promise.resolve(null));

            const leaderboardName = "Test Leaderboard";
            const mockedMessage = createMockedMessage();
            const command: TCommand = {
                plugin: "leaderboards",
                action: Actions.deleteLeaderboard,
                arguments: [leaderboardName],
                originalMessage: mockedMessage
            };

            const actionHandler = new DeleteLeaderboardHandler(command);
            const result = await actionHandler.handleAction();
            const expectedResult = `A leaderboard with the name ${leaderboardName} could not be found.`;
            expect(result).toEqual(expectedResult);
        });

        it("should return a succes message when the leaderboard is deleted", async () => {
            jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
            const leaderboard: TLeaderboard = {
                id: 12,
                name: "Test Leaderboard",
                columns: [],
                rows: [],
                values: []
            };
            jest.spyOn(Leaderboards, "getLeaderboard").mockReturnValueOnce(Promise.resolve(leaderboard));
            const deleteValuesSpy = jest.spyOn(Values, "deleteValuesByLeaderboard");
            const deleteRowsSpy = jest.spyOn(Rows, "deleteRows");
            const deleteColumnsSpy = jest.spyOn(Columns, "deleteColumns");
            const deleteLeaderboardsSpy = jest.spyOn(Leaderboards, "deleteLeaderboard");

            const mockedMessage = createMockedMessage();
            const command: TCommand = {
                plugin: "leaderboards",
                action: Actions.deleteLeaderboard,
                arguments: [leaderboard.name],
                originalMessage: mockedMessage
            };

            const actionHandler = new DeleteLeaderboardHandler(command);
            const result = await actionHandler.handleAction();
            const expectedResult = `Successfully deleted leaderboard ${leaderboard.name}`;
            expect(result).toEqual(expectedResult);
            expect(deleteValuesSpy).toHaveBeenCalledTimes(1);
            expect(deleteValuesSpy).toHaveBeenCalledWith(leaderboard.id);
            expect(deleteRowsSpy).toHaveBeenCalledTimes(1);
            expect(deleteRowsSpy).toHaveBeenCalledWith(leaderboard.id);
            expect(deleteColumnsSpy).toHaveBeenCalledTimes(1);
            expect(deleteColumnsSpy).toHaveBeenCalledWith(leaderboard.id);
            expect(deleteLeaderboardsSpy).toHaveBeenCalledTimes(1);
            expect(deleteLeaderboardsSpy).toHaveBeenCalledWith(leaderboard.id);
        });
    });
});
