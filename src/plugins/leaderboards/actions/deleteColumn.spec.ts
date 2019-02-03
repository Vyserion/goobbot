import "mocha";
import { expect } from "chai";
import { stub, SinonStub } from "sinon";
import { TCommand } from "../../../core/typings";
import { Actions, ColumnTypes } from "../config";
import { DeleteColumnHandler } from "./deleteColumn";
import { Leaderboards } from "../dao/leaderboards";
import { TLeaderboard, TColumn } from "../typings";
import { Columns } from "../dao/columns";
import { Values } from "../dao/values";
import { Message, Guild } from "discord.js";
import { mock, when } from "ts-mockito";
import { TGuild } from "../../../util/typings/guilds";
import { UtilDao } from "../../../util/dao";

describe("plugins/leaderboards/actions/deleteColumn", () => {
	describe("handleAction()", () => {
		it("should check for less than 2 arguments", async () => {
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.deleteColumn,
				arguments: ["not enough arguments"],
				originalMessage: null
			};

			const actionHandler = new DeleteColumnHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = "No leaderboard or column name was provided.";
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
				action: Actions.deleteColumn,
				arguments: [leaderboardName, "A Column"],
				originalMessage: originalMessage
			};

			const guild: TGuild = {
				discord_id: "1234",
				name: "Test"
			};
			stub(UtilDao, "getGuild").resolves(guild);
			stub(Leaderboards, "getLeaderboard").resolves(null);

			const actionHandler = new DeleteColumnHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `A leaderboard with the name ${leaderboardName} was not found.`;
			expect(result).to.equal(expectedResult);

			(UtilDao.getGuild as SinonStub).restore();
			(Leaderboards.getLeaderboard as SinonStub).restore();
		});

		it("should return an error if no column is found", async () => {
			const leaderboardName = "My Leaderboard";
			const columnName = "A Column";
			const originalMessage = mock(Message);
			const mockedGuild = mock(Guild);
			when(mockedGuild.id).thenReturn("1234");
			when(originalMessage.guild).thenReturn(mockedGuild);
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.deleteColumn,
				arguments: [leaderboardName, columnName],
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
			stub(Columns, "getColumn").resolves(null);

			const actionHandler = new DeleteColumnHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `A column with the name ${columnName} was not found for leaderboard ${leaderboardName}.`;
			expect(result).to.equal(expectedResult);

			(UtilDao.getGuild as SinonStub).restore();
			(Leaderboards.getLeaderboard as SinonStub).restore();
			(Columns.getColumn as SinonStub).restore();
		});

		it("should return a success message when the column is deleted", async () => {
			const leaderboardName = "My Leaderboard";
			const columnName = "A Column";
			const originalMessage = mock(Message);
			const mockedGuild = mock(Guild);
			when(mockedGuild.id).thenReturn("1234");
			when(originalMessage.guild).thenReturn(mockedGuild);
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.deleteColumn,
				arguments: [leaderboardName, columnName],
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
			const column: TColumn = {
				name: columnName,
				type: ColumnTypes.DATA
			};
			stub(Columns, "getColumn").resolves(column);
			stub(Values, "deleteValuesByColumn");
			stub(Columns, "deleteColumn");

			const actionHandler = new DeleteColumnHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `Succesfully removed column ${columnName}.`;
			expect(result).to.equal(expectedResult);

			(UtilDao.getGuild as SinonStub).restore();
			(Leaderboards.getLeaderboard as SinonStub).restore();
			(Columns.getColumn as SinonStub).restore();
		});
	});
});
