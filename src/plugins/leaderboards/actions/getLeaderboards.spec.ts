import "mocha";
import { expect } from "chai";
import { stub, SinonStub } from "sinon";
import { TLeaderboard } from "../typings";
import { Leaderboards } from "../dao/leaderboards";
import { GetLeaderboardsHandler } from "./getLeaderboards";
import { TCommand } from "../../../core/typings";
import { mock, when } from "ts-mockito";
import { Message, Guild } from "discord.js";
import { Actions } from "../config";
import { TGuild } from "../../../util/typings/guilds";
import { UtilDao } from "../../../util/dao";

describe("plugins/leaderboards/actions/getLeaderboards", () => {
	describe("handleAction()", () => {
		it("should return an error if there are no leaderboards", async () => {
			const originalMessage = mock(Message);
			const mockedGuild = mock(Guild);
			when(mockedGuild.id).thenReturn("1");
			when(originalMessage.guild).thenReturn(mockedGuild);
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.createColumn,
				arguments: [],
				originalMessage: originalMessage
			};

			const guild: TGuild = {
				discord_id: "1234",
				name: "Test"
			};
			stub(UtilDao, "getGuild").resolves(guild);
			const leaderboards: TLeaderboard[] = [];
			stub(Leaderboards, "getLeaderboards").resolves(leaderboards);

			const actionHandler = new GetLeaderboardsHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `There are currently no leaderboards`;
			expect(result).to.equal(expectedResult);

			(UtilDao.getGuild as SinonStub).restore();
			(Leaderboards.getLeaderboards as SinonStub).restore();
		});

		it("should return a list of leaderboards if succesful", async () => {
			const leaderboardName = "My Leaderboard";

			const originalMessage = mock(Message);
			const mockedGuild = mock(Guild);
			when(mockedGuild.id).thenReturn("1");
			when(originalMessage.guild).thenReturn(mockedGuild);
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.createColumn,
				arguments: [],
				originalMessage: originalMessage
			};

			const guild: TGuild = {
				discord_id: "1234",
				name: "Test"
			};
			stub(UtilDao, "getGuild").resolves(guild);
			const leaderboards: TLeaderboard[] = [
				{
					name: leaderboardName,
					columns: [],
					rows: [],
					values: []
				}
			];
			stub(Leaderboards, "getLeaderboards").resolves(leaderboards);

			const actionHandler = new GetLeaderboardsHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `${leaderboardName}\n`;
			expect(result).to.equal(expectedResult);

			(UtilDao.getGuild as SinonStub).restore();
			(Leaderboards.getLeaderboards as SinonStub).restore();
		});
	});
});
