import "mocha";
import { expect } from "chai";
import { stub, SinonStub } from "sinon";
import { TLeaderboard } from "../typings";
import { Leaderboards } from "../dao/leaderboards";
import { GetLeaderboardsHandler } from "./getLeaderboards";

describe("plugins/leaderboards/actions/getLeaderboards", () => {
    describe("handleAction()", () => {
        it("should return an error if there are no leaderboards", async () => {
            const leaderboards: TLeaderboard[] = [];
            stub(Leaderboards, "getLeaderboards").resolves(leaderboards);

            const actionHandler = new GetLeaderboardsHandler();
            const result = await actionHandler.handleAction();
            const expectedResult = `There are currently no leaderboards`;
            expect(result).to.equal(expectedResult);

            (Leaderboards.getLeaderboards as SinonStub).restore();
        });

        it("should return a list of leaderboards if succesful", async () => {
            const leaderboardName = "My Leaderboard";
            const leaderboards: TLeaderboard[] = [{
                name: leaderboardName,
                columns: [],
                rows: [],
                values: []
            }];
            stub(Leaderboards, "getLeaderboards").resolves(leaderboards);

            const actionHandler = new GetLeaderboardsHandler();
            const result = await actionHandler.handleAction();
            const expectedResult = `${leaderboardName}\n`;
            expect(result).to.equal(expectedResult);

            (Leaderboards.getLeaderboards as SinonStub).restore();
        });
    });
})