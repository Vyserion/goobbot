import { TCommand } from "../../../core/typings";
import { Actions, ColumnTypes } from "../config";
import { UpdateColumnHandler, UpdateActions } from "./updateColumn";
import * as Guilds from "../../../core/guilds/guilds";
import * as Leaderboards from "../dao/leaderboards";
import * as Columns from "../dao/columns";
import { createMockedMessage } from "../../../test";
import { TLeaderboard, TColumn } from "../typings";

describe("plugin/leaderboards/actions/updateColumn", () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe("handleAction()", () => {

        it("should check for less than 4 arguments", async () => {
            const mockCommand: TCommand = {
                plugin: "leaderboards",
                action: Actions.updateColumn,
                arguments: ["not", "enough", "arguments"],
                originalMessage: null
            };

            const actionHandler = new UpdateColumnHandler(mockCommand);
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
                action: Actions.updateColumn,
                arguments: [leaderboardName, "", "", ""],
                originalMessage: mockedMessage,
            };

            const actionHandler = new UpdateColumnHandler(mockCommand);
            const result = await actionHandler.handleAction();
            const expectedResult = `A leaderboard with the name ${leaderboardName} was not found.`;
            expect(result).toEqual(expectedResult);
        });

        it("should return an error if no column is found", async () => {
            jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
            const mockLeaderboard: TLeaderboard = {
                name: "Test Leaderboard",
                columns: [],
                rows: [],
                values: []
            }
            jest.spyOn(Leaderboards, "getLeaderboard").mockReturnValueOnce(Promise.resolve(mockLeaderboard));
            jest.spyOn(Columns, "getColumn").mockReturnValueOnce(Promise.resolve(null));

            const columnName = "Test Column";
            const mockedMessage = createMockedMessage();
            const mockCommand: TCommand = {
                plugin: "leaderboards",
                action: Actions.updateColumn,
                arguments: [mockLeaderboard.name, columnName, "", ""],
                originalMessage: mockedMessage,
            };

            const actionHandler = new UpdateColumnHandler(mockCommand);
            const result = await actionHandler.handleAction();
            const expectedResult = `A column with the name ${columnName} for leaderboard ${mockLeaderboard.name} was not found.`;
            expect(result).toEqual(expectedResult);
        });

        it("should return an error if the action is invalid", async () => {
            jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
            const mockLeaderboard: TLeaderboard = {
                name: "Test Leaderboard",
                columns: [],
                rows: [],
                values: []
            }
            jest.spyOn(Leaderboards, "getLeaderboard").mockReturnValueOnce(Promise.resolve(mockLeaderboard));
            const mockColumn: TColumn = {
                name: "Test Column",
                type: ColumnTypes.DATA
            };
            jest.spyOn(Columns, "getColumn").mockReturnValueOnce(Promise.resolve(mockColumn));

            const action = "invalid action";
            const mockedMessage = createMockedMessage();
            const mockCommand: TCommand = {
                plugin: "leaderboards",
                action: Actions.updateColumn,
                arguments: [mockLeaderboard.name, mockColumn.name, action, ""],
                originalMessage: mockedMessage,
            };

            const actionHandler = new UpdateColumnHandler(mockCommand);
            const result = await actionHandler.handleAction();
            const expectedResult = `Changing the ${action.toLowerCase()} cannot be done on this column.`;
            expect(result).toEqual(expectedResult);
        });

        it("should return an error if the new column name already exists", async () => {
            jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
            const mockLeaderboard: TLeaderboard = {
                name: "Test Leaderboard",
                columns: [],
                rows: [],
                values: []
            }
            jest.spyOn(Leaderboards, "getLeaderboard").mockReturnValueOnce(Promise.resolve(mockLeaderboard));
            const mockColumn: TColumn = {
                name: "Test Column",
                type: ColumnTypes.DATA
            };
            const mockNewColumn: TColumn = {
                name: "New Test Column",
                type: ColumnTypes.DATA
            };
            jest.spyOn(Columns, "getColumn")
                .mockReturnValueOnce(Promise.resolve(mockColumn))
                .mockReturnValueOnce(Promise.resolve(mockNewColumn));

            const mockedMessage = createMockedMessage();
            const mockCommand: TCommand = {
                plugin: "leaderboards",
                action: Actions.updateColumn,
                arguments: [mockLeaderboard.name, mockColumn.name, UpdateActions.NAME, mockNewColumn.name],
                originalMessage: mockedMessage,
            };

            const actionHandler = new UpdateColumnHandler(mockCommand);
            const result = await actionHandler.handleAction();
            const expectedResult = `A column with the name ${mockNewColumn.name} already exists for leaderboard ${mockLeaderboard.name}`;
            expect(result).toEqual(expectedResult);
        });

        it("should return a success message when updating the name", async () => {
            jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
            const mockLeaderboard: TLeaderboard = {
                name: "Test Leaderboard",
                columns: [],
                rows: [],
                values: []
            }
            jest.spyOn(Leaderboards, "getLeaderboard").mockReturnValueOnce(Promise.resolve(mockLeaderboard));
            const mockColumn: TColumn = {
                name: "Test Column",
                type: ColumnTypes.DATA
            };
            jest.spyOn(Columns, "getColumn")
                .mockReturnValueOnce(Promise.resolve(mockColumn))
                .mockReturnValueOnce(Promise.resolve(null));

            const newColumnName = "Test New Column";
            const mockedMessage = createMockedMessage();
            const mockCommand: TCommand = {
                plugin: "leaderboards",
                action: Actions.updateColumn,
                arguments: [mockLeaderboard.name, mockColumn.name, UpdateActions.NAME, newColumnName],
                originalMessage: mockedMessage,
            };

            const actionHandler = new UpdateColumnHandler(mockCommand);
            const result = await actionHandler.handleAction();
            const expectedResult = `Successfully changed column ${mockColumn.name} to ${newColumnName}`;
            expect(result).toEqual(expectedResult);
        });

        it("should return an error if the new column type is invalid", async () => {
            jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
            const mockLeaderboard: TLeaderboard = {
                name: "Test Leaderboard",
                columns: [],
                rows: [],
                values: []
            }
            jest.spyOn(Leaderboards, "getLeaderboard").mockReturnValueOnce(Promise.resolve(mockLeaderboard));
            const mockColumn: TColumn = {
                name: "Test Column",
                type: ColumnTypes.DATA
            };
            jest.spyOn(Columns, "getColumn").mockReturnValueOnce(Promise.resolve(mockColumn));

            const invalidColumnType = "Invalid column type";
            const mockedMessage = createMockedMessage();
            const mockCommand: TCommand = {
                plugin: "leaderboards",
                action: Actions.updateColumn,
                arguments: [mockLeaderboard.name, mockColumn.name, UpdateActions.TYPE, invalidColumnType],
                originalMessage: mockedMessage,
            };

            const actionHandler = new UpdateColumnHandler(mockCommand);
            const result = await actionHandler.handleAction();
            const expectedResult = `The column type ${invalidColumnType} is invalid.`;
            expect(result).toEqual(expectedResult);
        });

        it("should return a success message when updating the type", async () => {
            jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
            const mockLeaderboard: TLeaderboard = {
                name: "Test Leaderboard",
                columns: [],
                rows: [],
                values: []
            }
            jest.spyOn(Leaderboards, "getLeaderboard").mockReturnValueOnce(Promise.resolve(mockLeaderboard));
            const mockColumn: TColumn = {
                name: "Test Column",
                type: ColumnTypes.DATA
            };
            jest.spyOn(Columns, "getColumn").mockReturnValueOnce(Promise.resolve(mockColumn));

            const columnType = ColumnTypes.DATA;
            const mockedMessage = createMockedMessage();
            const mockCommand: TCommand = {
                plugin: "leaderboards",
                action: Actions.updateColumn,
                arguments: [mockLeaderboard.name, mockColumn.name, UpdateActions.TYPE, columnType],
                originalMessage: mockedMessage,
            };

            const actionHandler = new UpdateColumnHandler(mockCommand);
            const result = await actionHandler.handleAction();
            const expectedResult = `Successfully changed column ${mockColumn.name}'s type to ${columnType}`;
            expect(result).toEqual(expectedResult);
        });
    });
});
