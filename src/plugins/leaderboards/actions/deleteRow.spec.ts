import "mocha";
import { expect } from "chai";
import { stub, SinonStub } from "sinon";
import { TCommand } from "../../../core/typings";
import { Actions } from "../config";
import { DeleteRowHandler } from "./deleteRow";
import { Leaderboards } from "../dao/leaderboards";
import { TLeaderboard, TRow } from "../typings";
import { Rows } from "../dao/rows";
import { Values } from "../dao/values";

describe("plugins/leaderboards/actions/deleteRow", () => {
    describe("handleAction()", () => {
        it('should check for less than 2 arguemnts', async () => {
            const command: TCommand = {
                plugin: "leaderboards",
                action: Actions.deleteRow,
                arguments: [ "My Leaderboard" ],
                originalMessage: null
            };

            const actionHandler = new DeleteRowHandler(command);
            const result = await actionHandler.handleAction();
            const expectedResult = "No leaderboard or row name was provided.";
            expect(result).to.equal(expectedResult);
        });

        it("should return an error if no leaderboard is found", async () => {
            const leaderboardName = "My Leaderboard";
            const command: TCommand = {
                plugin: "leaderboards",
                action: Actions.deleteRow,
                arguments: [ leaderboardName, "A Row" ],
                originalMessage: null
            };

            stub(Leaderboards, "getLeaderboard").resolves(null);

            const actionHandler = new DeleteRowHandler(command);
            const result = await actionHandler.handleAction();
            const expectedResult =  `A leaderboard with the name ${leaderboardName} was not found.`;
            expect(result).to.equal(expectedResult);

            (Leaderboards.getLeaderboard as SinonStub).restore();
        });

        it('should return an error if no row is found', async () => {
            const leaderboardName = "My Leaderboard";
            const rowName = "A Row";
            const command: TCommand = {
                plugin: "leaderboards",
                action: Actions.deleteRow,
                arguments: [ leaderboardName, rowName ],
                originalMessage: null
            };

            const leaderboard: TLeaderboard = {
                name: leaderboardName,
                columns: [],
                rows: [],
                values: []
            };
            stub(Leaderboards, "getLeaderboard").resolves(leaderboard);
            stub(Rows, "getRow").resolves(null);

            const actionHandler = new DeleteRowHandler(command);
            const result = await actionHandler.handleAction();
            const expectedResult = `A row with the name ${rowName} for the leaderboard ${leaderboardName} was not found.`;
            expect(result).to.equal(expectedResult);

            (Leaderboards.getLeaderboard as SinonStub).restore();
            (Rows.getRow as SinonStub).restore();
        });

        it("should return a success message when the row is deleted", async () => {
            const leaderboardName = "My Leaderboard";
            const rowName = "A Row";
            const command: TCommand = {
                plugin: "leaderboards",
                action: Actions.deleteRow,
                arguments: [ leaderboardName, rowName ],
                originalMessage: null
            };

            const leaderboard: TLeaderboard = {
                name: leaderboardName,
                columns: [],
                rows: [],
                values: []
            };
            stub(Leaderboards, "getLeaderboard").resolves(leaderboard);
            const row: TRow = {
                name: rowName
            };
            stub(Rows, "getRow").resolves(row);
            stub(Values, "deleteValuesByRow");
            stub(Rows, "deleteRow");

            const actionHandler = new DeleteRowHandler(command);
            const result = await actionHandler.handleAction();
            const expectedResult = `Successfully removed row ${rowName}.`;
            expect(result).to.equal(expectedResult);

            (Leaderboards.getLeaderboard as SinonStub).restore();
            (Rows.getRow as SinonStub).restore();
            (Values.deleteValuesByRow as SinonStub).restore();
            (Rows.deleteRow as SinonStub).restore();
        });
    });
});