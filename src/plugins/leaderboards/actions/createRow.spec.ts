import "mocha";
import { expect } from "chai";
import { stub, SinonStub } from "sinon";
import { TCommand } from "../../../core/typings";
import { Actions } from "../config";
import { CreateRowHandler } from "./createRow";
import { Leaderboards } from "../dao/leaderboards";
import { TLeaderboard, TRow } from "../typings";
import { Rows } from "../dao/rows";
import { mock, when } from "ts-mockito";
import { Message, Guild } from "discord.js";
import { UtilDao } from "../../../util/dao";
import { TGuild } from "../../../util/typings/guilds";

describe("plugins/leaderboards/actions/createRow", () => {
	describe("handleAction()", () => {
		it("should check for less than 2 arguments", async () => {
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.createRow,
				arguments: ["one"],
				originalMessage: null
			};

			const actionHandler = new CreateRowHandler(command);
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
				action: Actions.createRow,
				arguments: [leaderboardName, "A Row"],
				originalMessage: originalMessage
			};

			
			const guild: TGuild = {
				discord_id: "1234",
				name: "Test"
			};
			stub(UtilDao, "getGuild").resolves(guild);
			stub(Leaderboards, "getLeaderboard").resolves(null);

			const actionHandler = new CreateRowHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `A leaderboard with the name ${leaderboardName} was not found.`;
			expect(result).to.equal(expectedResult);

			(UtilDao.getGuild as SinonStub).restore();
			(Leaderboards.getLeaderboard as SinonStub).restore();
		});

		it("should return an error if a row with the same name is found", async () => {
			const leaderboardName = "My Leaderboard";
			const rowName = "A Row";

			const originalMessage = mock(Message);
			const mockedGuild = mock(Guild);
			when(mockedGuild.id).thenReturn("1234");
			when(originalMessage.guild).thenReturn(mockedGuild);
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.createRow,
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

			const actionHandler = new CreateRowHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `A row with the name ${rowName} already exists for leaderboard ${leaderboardName}.`;
			expect(result).to.equal(expectedResult);

			(UtilDao.getGuild as SinonStub).restore();
			(Leaderboards.getLeaderboard as SinonStub).restore();
			(Rows.getRow as SinonStub).restore();
		});

		it("should return a success message when the row is created", async () => {
			const leaderboardName = "My Leaderboard";
			const rowName = "A Row";

			const originalMessage = mock(Message);
			const mockedGuild = mock(Guild);
			when(mockedGuild.id).thenReturn("1234");
			when(originalMessage.guild).thenReturn(mockedGuild);
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.createRow,
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
			stub(Rows, "createRow");

			const actionHandler = new CreateRowHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `Sucessfully created leaderboard row ${rowName}.`;
			expect(result).to.equal(expectedResult);

			(UtilDao.getGuild as SinonStub).restore();
			(Leaderboards.getLeaderboard as SinonStub).restore();
			(Rows.getRow as SinonStub).restore();
			(Rows.createRow as SinonStub).restore();
		});
	});
});
