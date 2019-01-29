import "mocha";
import { expect } from "chai";
import { stub, SinonStub } from "sinon";
import { TCommand } from "../../../core/typings";
import { Actions, ColumnTypes } from "../config";
import { UpdateColumnHandler, UpdateActions } from "./updateColumn";
import { Leaderboards } from "../dao/leaderboards";
import { TLeaderboard, TColumn } from "../typings";
import { Columns } from "../dao/columns";

function getColumnStub(name: string): Promise<TColumn> {
    const column: TColumn = {
        name: name,
        type: ColumnTypes.DATA
    };

    return new Promise((resolve) => {
        if (name === "A Column") {
            resolve(column);
        } else {
            resolve(null);
        }
    });
}

describe("plugins/leaderboards/actions/updateColumn", () => {
    describe("handleAction()", () => {
        it("should check for less than 4 arguments", async () => {
            const command: TCommand = {
                plugin: "leaderboards",
                action: Actions.updateColumn,
                arguments: [ "not", "enough", "arguments" ],
                originalMessage: null
            };

            const actionHandler = new UpdateColumnHandler(command);
            const result = await actionHandler.handleAction();
            const expectedResult = `Not enough details - please check your command.`;
            expect(result).to.equal(expectedResult);
        });

        it("should return an error if no leaderboard is found", async () => {
            const leaderboardName = "My Leaderboard";
            const command: TCommand = {
                plugin: "leaderboards",
                action: Actions.updateColumn,
                arguments: [ leaderboardName, "A Column", "name", "A Column Name" ],
                originalMessage: null
            };

            stub(Leaderboards, "getLeaderboard").resolves(null);

            const actionHandler = new UpdateColumnHandler(command);
            const result = await actionHandler.handleAction();
            const expectedResult = `A leaderboard with the name ${leaderboardName} was not found.`;
            expect(result).to.equal(expectedResult);

            (Leaderboards.getLeaderboard as SinonStub).restore();
        });

        it("should return an error if no column is found", async () => {    
            const leaderboardName = "My Leaderboard";
            const columnName = "A Column";
            const command: TCommand = {
                plugin: "leaderboards",
                action: Actions.updateColumn,
                arguments: [ leaderboardName, columnName, "name", "A New Column" ],
                originalMessage: null
            };

            const leaderboard: TLeaderboard = {
                name: leaderboardName,
                columns: [],
                rows: [],
                values: []
            };
            stub(Leaderboards, "getLeaderboard").resolves(leaderboard);
            stub(Columns, "getColumn").resolves(null);

            const actionHandler = new UpdateColumnHandler(command);
            const result = await actionHandler.handleAction();
            const expectedResult = `A column with the name ${columnName} for leaderboard ${leaderboardName} was not found.`;
            expect(result).to.equal(expectedResult);

            (Leaderboards.getLeaderboard as SinonStub).restore();
            (Columns.getColumn as SinonStub).restore();
        });

        it("should return an error if the action is invalid", async () => {
            const leaderboardName = "My Leaderboard";
            const columnName = "A Column";
            const commandStr = "invalid";
            const command: TCommand = {
                plugin: "leaderboards",
                action: Actions.updateColumn,
                arguments: [ leaderboardName, columnName, commandStr, "A New Column" ],
                originalMessage: null
            };

            const leaderboard: TLeaderboard = {
                name: leaderboardName,
                columns: [],
                rows: [],
                values: []
            };
            stub(Leaderboards, "getLeaderboard").resolves(leaderboard);
            const column: TColumn = {
                name: columnName,
                type: ColumnTypes.DATA
            };
            stub(Columns, "getColumn").resolves(column);

            const actionHandler = new UpdateColumnHandler(command);
            const result = await actionHandler.handleAction();
            const expectedResult = `Changing the ${commandStr.toLowerCase()} cannot be done on this column.`;
            expect(result).to.equal(expectedResult);

            (Leaderboards.getLeaderboard as SinonStub).restore();
            (Columns.getColumn as SinonStub).restore();
        });

        it("should return an error if the new column name already exists", async () => {
            const leaderboardName = "My Leaderboard";
            const columnName = "A Column";
            const commandStr = UpdateActions.NAME;
            const newColumnName = "A New Column";
            const command: TCommand = {
                plugin: "leaderboards",
                action: Actions.updateColumn,
                arguments: [ leaderboardName, columnName, commandStr, newColumnName ],
                originalMessage: null
            };

            const leaderboard: TLeaderboard = {
                name: leaderboardName,
                columns: [],
                rows: [],
                values: []
            };
            stub(Leaderboards, "getLeaderboard").resolves(leaderboard);
            const column: TColumn = {
                name: columnName,
                type: ColumnTypes.DATA
            };
            stub(Columns, "getColumn").resolves(column);

            const actionHandler = new UpdateColumnHandler(command);
            const result = await actionHandler.handleAction();
            const expectedResult = `A column with the name ${newColumnName} already exists for leaderboard ${leaderboard.name}`;
            expect(result).to.equal(expectedResult);

            (Leaderboards.getLeaderboard as SinonStub).restore();
            (Columns.getColumn as SinonStub).restore();
        });

        it("should return an error if the new column type is invalid", async () => {
            const leaderboardName = "My Leaderboard";
            const columnName = "A Column";
            const commandStr = UpdateActions.TYPE;
            const newColumnType = "NotAType";
            const command: TCommand = {
                plugin: "leaderboards",
                action: Actions.updateColumn,
                arguments: [ leaderboardName, columnName, commandStr, newColumnType ],
                originalMessage: null
            };

            const leaderboard: TLeaderboard = {
                name: leaderboardName,
                columns: [],
                rows: [],
                values: []
            };
            stub(Leaderboards, "getLeaderboard").resolves(leaderboard);
            const column: TColumn = {
                name: columnName,
                type: ColumnTypes.DATA
            };
            stub(Columns, "getColumn").resolves(column);

            const actionHandler = new UpdateColumnHandler(command);
            const result = await actionHandler.handleAction();
            const expectedResult = `The column type ${newColumnType} is invalid.`;
            expect(result).to.equal(expectedResult);

            (Leaderboards.getLeaderboard as SinonStub).restore();
            (Columns.getColumn as SinonStub).restore();
        });

        it("should return a success message when updating the name", async () => {
            const leaderboardName = "My Leaderboard";
            const columnName = "A Column";
            const commandStr = UpdateActions.NAME;
            const newColumnName = "A New Column";
            const command: TCommand = {
                plugin: "leaderboards",
                action: Actions.updateColumn,
                arguments: [ leaderboardName, columnName, commandStr, newColumnName ],
                originalMessage: null
            };

            const leaderboard: TLeaderboard = {
                name: leaderboardName,
                columns: [],
                rows: [],
                values: []
            };
            stub(Leaderboards, "getLeaderboard").resolves(leaderboard);
            stub(Columns, "getColumn").callsFake(getColumnStub);
            stub(Columns, "updateColumnName");

            const actionHandler = new UpdateColumnHandler(command);
            const result = await actionHandler.handleAction();
            const expectedResult = `Successfully changed column ${columnName} to ${newColumnName}`;
            expect(result).to.equal(expectedResult);

            (Leaderboards.getLeaderboard as SinonStub).restore();
            (Columns.getColumn as SinonStub).restore();
            (Columns.updateColumnName as SinonStub).restore();
        });

        it("should return a success message when updating the type", async () => {
            const leaderboardName = "My Leaderboard";
            const columnName = "A Column";
            const commandStr = UpdateActions.TYPE;
            const newColumnType = ColumnTypes.DATA;
            const command: TCommand = {
                plugin: "leaderboards",
                action: Actions.updateColumn,
                arguments: [ leaderboardName, columnName, commandStr, newColumnType ],
                originalMessage: null
            };

            const leaderboard: TLeaderboard = {
                name: leaderboardName,
                columns: [],
                rows: [],
                values: []
            };
            stub(Leaderboards, "getLeaderboard").resolves(leaderboard);
            const column: TColumn = {
                name: columnName,
                type: ColumnTypes.DATA
            };
            stub(Columns, "getColumn").resolves(column);
            stub(Columns, "updateColumnType");

            const actionHandler = new UpdateColumnHandler(command);
            const result = await actionHandler.handleAction();
            const expectedResult = `Successfully changed column ${columnName}'s type to ${newColumnType}`;
            expect(result).to.equal(expectedResult);

            (Leaderboards.getLeaderboard as SinonStub).restore();
            (Columns.getColumn as SinonStub).restore();
            (Columns.updateColumnType as SinonStub).restore();
        });
    });
});