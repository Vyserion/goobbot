import "mocha";
import { expect } from "chai";
import { stub, SinonStub } from "sinon";
import { mock, when } from "ts-mockito";
import { TCommand } from "../../../core/typings";
import { Actions } from "../config";
import { CreateLeaderboardHandler } from "./createLeaderboard";
import { TLeaderboard } from "../typings";
import { Leaderboards } from "../dao/leaderboards";
import { UtilDao } from "../../../util/dao";
import { TGuild } from "../../../util/typings/guilds";
import { Message, Guild } from "discord.js";

describe("plugins/leaderboards/actions/createLeaderboard", () => {
	describe("handleAction()", () => {
		it("should check for less than 1 argument", async () => {
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.createLeaderboard,
				arguments: [],
				originalMessage: null
			};

			const actionHandler = new CreateLeaderboardHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = "No name was provided for the leaderboard.";
			expect(result).to.equal(expectedResult);
		});

		it("should return an error if a leaderboard with the same name is found", async () => {
			const leaderboardName = "My Leaderboard";
			const originalMessage = mock(Message);
			const mockedGuild = mock(Guild);
			when(mockedGuild.id).thenReturn("1234");
			when(originalMessage.guild).thenReturn(mockedGuild);
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.createLeaderboard,
				arguments: [leaderboardName],
				originalMessage: originalMessage
			};

			const guild: TGuild = {
				discord_id: "1234",
				name: "Test"
			};
			stub(UtilDao, "getGuild").resolves(guild);
			const leaderboard: TLeaderboard = {
				name: leaderboardName,
				columns: [],
				rows: [],
				values: []
			};
			stub(Leaderboards, "getLeaderboard").resolves(leaderboard);

			const actionHandler = new CreateLeaderboardHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `A leaderboard with the name ${leaderboardName} already exists.`;
			expect(result).to.equal(expectedResult);

			(Leaderboards.getLeaderboard as SinonStub).restore();
			(UtilDao.getGuild as SinonStub).restore();
		});

		it("should return a success message when the leaderboard is created", async () => {
			const leaderboardName = "My Leaderboard";
			const originalMessage = mock(Message);
			const mockedGuild = mock(Guild);
			when(mockedGuild.id).thenReturn("1234");
			when(originalMessage.guild).thenReturn(mockedGuild);
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.createLeaderboard,
				arguments: [leaderboardName],
				originalMessage: originalMessage
			};

			const guild: TGuild = {
				discord_id: "1234",
				name: "Test"
			};
			stub(UtilDao, "getGuild").resolves(guild);
			stub(Leaderboards, "getLeaderboard").resolves(null);
			stub(Leaderboards, "createLeaderboard");

			const actionHandler = new CreateLeaderboardHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `Successfully created leaderboard ${leaderboardName}.`;
			expect(result).to.equal(expectedResult);

			(UtilDao.getGuild as SinonStub).restore();
			(Leaderboards.getLeaderboard as SinonStub).restore();
			(Leaderboards.createLeaderboard as SinonStub).restore();
		});
	});
});
