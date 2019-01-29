import "mocha";
import { expect } from "chai";
import { stub, SinonStub } from "sinon";
import { TCommand } from "../../../core/typings";
import { Actions } from "../config";
import { UpdateLeaderboardHandler } from "./updateLeaderboard";
import { Leaderboards } from "../dao/leaderboards";
import { TLeaderboard } from "../typings";

function getLeaderboardStub(name: string): Promise<TLeaderboard> {
    const leaderboard: TLeaderboard = {
        name: name,
        columns: [],
        rows: [],
        values: []
    };

    return new Promise((resolve) => {
        if (name === "My Leaderboard") {
            resolve(leaderboard);
        } else {
            resolve(null);
        }
    });
}

describe("plugins/leaderboards/actions/updateLeaderboard", () => {
    describe("handleAction()", () => {
        it("should check for less than 2 arguments", async () => {
            const command: TCommand = {
                plugin: "leaderboards",
                action: Actions.updateLeaderboard,
                arguments: [ "not enough arguments" ],
                originalMessage: null
            };

            const actionHandler = new UpdateLeaderboardHandler(command);
            const result = await actionHandler.handleAction();
            const expectedResult = "No names were provided for the leaderboard.";
            expect(result).to.equal(expectedResult);
        });

        it("should return an error if no leaderboard is found", async () => {
            const leaderboardName = "My Leaderboard";
            const command: TCommand = {
                plugin: "leaderboards",
                action: Actions.updateLeaderboard,
                arguments: [ leaderboardName, "New Leaderboard Name" ],
                originalMessage: null
            };

            stub(Leaderboards, "getLeaderboard").resolves(null);

            const actionHandler = new UpdateLeaderboardHandler(command);
            const result = await actionHandler.handleAction();
            const expectedResult = `A leaderboard with the name ${leaderboardName} could not be found.`;
            expect(result).to.equal(expectedResult);

            (Leaderboards.getLeaderboard as SinonStub).restore();
        });

        it("should return an error if the new leaderboard name already exists", async () => {
            const leaderboardName = "My Leaderboard";
            const newLeaderboardName = "New Leaderboard Name";
            const command: TCommand = {
                plugin: "leaderboards",
                action: Actions.updateLeaderboard,
                arguments: [ leaderboardName, newLeaderboardName ],
                originalMessage: null
            };

            const leaderboard: TLeaderboard = {
                name: leaderboardName,
                columns: [],
                rows: [],
                values: []
            };
            stub(Leaderboards, "getLeaderboard").resolves(leaderboard);

            const actionHandler = new UpdateLeaderboardHandler(command);
            const result = await actionHandler.handleAction();
            const expectedResult = `A leaderboard with the name ${newLeaderboardName} already exists.`;
            expect(result).to.equal(expectedResult);

            (Leaderboards.getLeaderboard as SinonStub).restore();
        });
        
        it("should return a success message when updating the leaderboard", async () => {
            const leaderboardName = "My Leaderboard";
            const newLeaderboardName = "New Leaderboard Name";
            const command: TCommand = {
                plugin: "leaderboards",
                action: Actions.updateLeaderboard,
                arguments: [ leaderboardName, newLeaderboardName ],
                originalMessage: null
            };

            stub(Leaderboards, "getLeaderboard").callsFake(getLeaderboardStub);
            stub(Leaderboards, "updateLeaderboard");

            const actionHandler = new UpdateLeaderboardHandler(command);
            const result = await actionHandler.handleAction();
            const expectedResult = `Successfully updated leaderboard ${leaderboardName}.`;
            expect(result).to.equal(expectedResult);

            (Leaderboards.getLeaderboard as SinonStub).restore();
            (Leaderboards.updateLeaderboard as SinonStub).restore();
        });
    });
});