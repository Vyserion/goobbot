import { TCommand } from "../../../core/typings";
import { Actions } from "../config";
import { CreateRowHandler } from "./createRow";
import * as Guilds from "../../../core/guilds/guilds";
import * as Leaderboards from "../dao/leaderboards";
import * as Rows from "../dao/rows";
import { createMockedMessage } from "../../../test";
import { TLeaderboard, TRow } from "../typings";

describe("plugins/leaderboards/actions/createRow", () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe("handleAction()", () => {

        it("should check for less than 2 arguments", async () => {
            const command: TCommand = {
                plugin: "leaderboards",
                action: Actions.createRow,
                arguments: ["not enough arguments"],
                originalMessage: null
            };

            const actionHandler = new CreateRowHandler(command);
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
                action: Actions.createRow,
                arguments: [leaderboardName, "A Row"],
                originalMessage: mockedMessage
            };

            const actionHandler = new CreateRowHandler(command);
            const result = await actionHandler.handleAction();
            const expectedResult = `A leaderboard with the name ${leaderboardName} was not found.`;
            expect(result).toEqual(expectedResult);
        });

        it("should return an error if a row with the same name is found", async () => {
            jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
            const leaderboard: TLeaderboard = {
                name: "Test Leaderboard",
                columns: [],
                rows: [],
                values: []
            };
            jest.spyOn(Leaderboards, "getLeaderboard").mockReturnValueOnce(Promise.resolve(leaderboard));
            const row: TRow = {
                name: "Test Row"
            };
            jest.spyOn(Rows, "getRow").mockReturnValue(Promise.resolve(row));

            const mockedMessage = createMockedMessage();
            const command: TCommand = {
                plugin: "leaderboards",
                action: Actions.createRow,
                arguments: [leaderboard.name, row.name],
                originalMessage: mockedMessage
            };

            const actionHandler = new CreateRowHandler(command);
            const result = await actionHandler.handleAction();
            const expectedResult = `A row with the name ${row.name} already exists for leaderboard ${leaderboard.name}.`;
            expect(result).toEqual(expectedResult);
        });

        it("should return a success message when successfully creating a row", async () => {
            jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
            const leaderboard: TLeaderboard = {
                id: 35,
                name: "Test Leaderboard",
                columns: [],
                rows: [],
                values: []
            };
            jest.spyOn(Leaderboards, "getLeaderboard").mockReturnValueOnce(Promise.resolve(leaderboard));
            jest.spyOn(Rows, "getRow").mockReturnValue(Promise.resolve(null));
            const createRowSpy = jest.spyOn(Rows, "createRow");

            const rowName = "Test Row";
            const mockedMessage = createMockedMessage();
            const command: TCommand = {
                plugin: "leaderboards",
                action: Actions.createRow,
                arguments: [leaderboard.name, rowName],
                originalMessage: mockedMessage
            };

            const actionHandler = new CreateRowHandler(command);
            const result = await actionHandler.handleAction();
            const expectedResult = `Sucessfully created leaderboard row ${rowName}.`;
            expect(result).toEqual(expectedResult);
            expect(createRowSpy).toHaveBeenCalledTimes(1);
            expect(createRowSpy).toHaveBeenCalledWith(rowName, leaderboard.id);
        });
    });
});
