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
import { UtilDao } from "../../../util/dao";
import { TGuild } from "../../../util/typings/guilds";
import { Message, Guild } from "discord.js";
import { mock, when } from "ts-mockito";

describe("plugins/leaderboards/actions/deleteRow", () => {
	describe("handleAction()", () => {
		it("should check for less than 2 arguemnts", async () => {
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.deleteRow,
				arguments: ["My Leaderboard"],
				originalMessage: null
			};

			const actionHandler = new DeleteRowHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = "No leaderboard or row name was provided.";
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
				action: Actions.deleteRow,
				arguments: [leaderboardName, "A Row"],
				originalMessage: originalMessage
			};

			const guild: TGuild = {
				discord_id: "1234",
				name: "Test"
			};
			stub(UtilDao, "getGuild").resolves(guild);
			stub(Leaderboards, "getLeaderboard").resolves(null);

			const actionHandler = new DeleteRowHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `A leaderboard with the name ${leaderboardName} was not found.`;
			expect(result).to.equal(expectedResult);

			(UtilDao.getGuild as SinonStub).restore();
			(Leaderboards.getLeaderboard as SinonStub).restore();
		});

		it("should return an error if no row is found", async () => {
			const leaderboardName = "My Leaderboard";
			const rowName = "A Row";
			const originalMessage = mock(Message);
			const mockedGuild = mock(Guild);
			when(mockedGuild.id).thenReturn("1234");
			when(originalMessage.guild).thenReturn(mockedGuild);
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.deleteRow,
				arguments: [leaderboardName, rowName],
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
			stub(Rows, "getRow").resolves(null);

			const actionHandler = new DeleteRowHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `A row with the name ${rowName} for the leaderboard ${leaderboardName} was not found.`;
			expect(result).to.equal(expectedResult);

			(UtilDao.getGuild as SinonStub).restore();
			(Leaderboards.getLeaderboard as SinonStub).restore();
			(Rows.getRow as SinonStub).restore();
		});

		it("should return a success message when the row is deleted", async () => {
			const leaderboardName = "My Leaderboard";
			const rowName = "A Row";
			const originalMessage = mock(Message);
			const mockedGuild = mock(Guild);
			when(mockedGuild.id).thenReturn("1234");
			when(originalMessage.guild).thenReturn(mockedGuild);
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.deleteRow,
				arguments: [leaderboardName, rowName],
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
			
			(UtilDao.getGuild as SinonStub).restore();
			(Leaderboards.getLeaderboard as SinonStub).restore();
			(Rows.getRow as SinonStub).restore();
			(Values.deleteValuesByRow as SinonStub).restore();
			(Rows.deleteRow as SinonStub).restore();
		});
	});
});
