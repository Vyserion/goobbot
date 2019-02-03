import "mocha";
import { expect } from "chai";
import { stub, SinonStub } from "sinon";
import { Actions } from "../config";
import { TCommand } from "../../../core/typings";
import { DeleteLeaderboardHandler } from "./deleteLeaderboard";
import { Leaderboards } from "../dao/leaderboards";
import { TLeaderboard } from "../typings";
import { Values } from "../dao/values";
import { Rows } from "../dao/rows";
import { Columns } from "../dao/columns";
import { Message, Guild } from "discord.js";
import { mock, when } from "ts-mockito";
import { TGuild } from "../../../util/typings/guilds";
import { UtilDao } from "../../../util/dao";

describe("plugins/leaderboards/actions/deleteLeaderboard", () => {
	describe("handleAction()", () => {
		it("should check for less than 1 argument", async () => {
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.deleteLeaderboard,
				arguments: [],
				originalMessage: null
			};

			const actionHandler = new DeleteLeaderboardHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = "No names were provided for the leaderboard.";
			expect(result).to.equal(expectedResult);
		});

		it("should return an error if no leaderboard is found", async () => {
			const leaderboardName = "My Leaderboard";
			const originalMessage = mock(Message);
			const mockedGuild = mock(Guild);
			when(mockedGuild.id).thenReturn("1234");
			when(originalMessage.guild).thenReturn(mockedGuild);
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.deleteLeaderboard,
				arguments: [leaderboardName],
				originalMessage: originalMessage
			};

			const guild: TGuild = {
				discord_id: "1234",
				name: "Test"
			};
			stub(UtilDao, "getGuild").resolves(guild);
			stub(Leaderboards, "getLeaderboard").resolves(null);

			const actionHandler = new DeleteLeaderboardHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `A leaderboard with the name ${leaderboardName} could not be found.`;
			expect(result).to.equal(expectedResult);

			(UtilDao.getGuild as SinonStub).restore();
			(Leaderboards.getLeaderboard as SinonStub).restore();
		});

		it("should return a success message when the leaderboard is deleted", async () => {
			const leaderboardName = "My Leaderboard";
			const originalMessage = mock(Message);
			const mockedGuild = mock(Guild);
			when(mockedGuild.id).thenReturn("1234");
			when(originalMessage.guild).thenReturn(mockedGuild);
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.deleteLeaderboard,
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
			stub(Values, "deleteValuesByLeaderboard");
			stub(Rows, "deleteRows");
			stub(Columns, "deleteColumns");
			stub(Leaderboards, "deleteLeaderboard");

			const actionHandler = new DeleteLeaderboardHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `Successfully deleted leaderboard ${leaderboardName}`;
			expect(result).to.equal(expectedResult);

			(UtilDao.getGuild as SinonStub).restore();
			(Leaderboards.getLeaderboard as SinonStub).restore();
			(Values.deleteValuesByLeaderboard as SinonStub).restore();
			(Rows.deleteRows as SinonStub).restore();
			(Columns.deleteColumns as SinonStub).restore();
			(Leaderboards.deleteLeaderboard as SinonStub).restore();
		});
	});
});
