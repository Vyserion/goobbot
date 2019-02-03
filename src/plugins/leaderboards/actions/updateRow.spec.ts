import "mocha";
import { expect } from "chai";
import { stub, SinonStub } from "sinon";
import { TCommand } from "../../../core/typings";
import { Actions } from "../config";
import { UpdateRowHandler } from "./updateRow";
import { Leaderboards } from "../dao/leaderboards";
import { TLeaderboard, TRow } from "../typings";
import { Rows } from "../dao/rows";
import { UtilDao } from "../../../util/dao";
import { TGuild } from "../../../util/typings/guilds";
import { Message, Guild } from "discord.js";
import { mock, when } from "ts-mockito";

function getRowStub(name: string): Promise<TRow> {
	const row: TRow = {
		name: name
	};

	return new Promise(resolve => {
		if (name === "A Row") {
			resolve(row);
		} else {
			resolve(null);
		}
	});
}

describe("plugins/leaderboards/actions/updateRow", () => {
	describe("handleAction()", () => {
		it("should check for less than 3 arguments", async () => {
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.updateRow,
				arguments: ["not enough arguments"],
				originalMessage: null
			};

			const actionHandler = new UpdateRowHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `Not enough details - please check your command.`;
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
				action: Actions.updateRow,
				arguments: [leaderboardName, "A Row", "A New Row"],
				originalMessage: originalMessage
			};

			const guild: TGuild = {
				discord_id: "1234",
				name: "Test"
			};
			stub(UtilDao, "getGuild").resolves(guild);
			stub(Leaderboards, "getLeaderboard").resolves(null);

			const actionHandler = new UpdateRowHandler(command);
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
				action: Actions.updateRow,
				arguments: [leaderboardName, rowName, "A New Row"],
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

			const actionHandler = new UpdateRowHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `A row with the name ${rowName} for leaderboard ${leaderboardName} was not found.`;
			expect(result).to.equal(expectedResult);

			(UtilDao.getGuild as SinonStub).restore();
			(Leaderboards.getLeaderboard as SinonStub).restore();
			(Rows.getRow as SinonStub).restore();
		});

		it("should return an error if the new row already exists", async () => {
			const leaderboardName = "My Leaderboard";
			const rowName = "A Row";
			const newRowName = "A New Row";
			const originalMessage = mock(Message);
			const mockedGuild = mock(Guild);
			when(mockedGuild.id).thenReturn("1234");
			when(originalMessage.guild).thenReturn(mockedGuild);
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.updateRow,
				arguments: [leaderboardName, rowName, newRowName],
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

			const actionHandler = new UpdateRowHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `A row with the name ${newRowName} for leaderboard ${leaderboardName} already exists.`;
			expect(result).to.equal(expectedResult);

			(UtilDao.getGuild as SinonStub).restore();
			(Leaderboards.getLeaderboard as SinonStub).restore();
			(Rows.getRow as SinonStub).restore();
		});

		it("should return a success message when updating the row", async () => {
			const leaderboardName = "My Leaderboard";
			const rowName = "A Row";
			const newRowName = "A New Row";
			const originalMessage = mock(Message);
			const mockedGuild = mock(Guild);
			when(mockedGuild.id).thenReturn("1234");
			when(originalMessage.guild).thenReturn(mockedGuild);
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.updateRow,
				arguments: [leaderboardName, rowName, newRowName],
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
			stub(Rows, "getRow").callsFake(getRowStub);
			stub(Rows, "updateRowName");

			const actionHandler = new UpdateRowHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `Successfully updated row ${rowName}.`;
			expect(result).to.equal(expectedResult);

			(UtilDao.getGuild as SinonStub).restore();
			(Leaderboards.getLeaderboard as SinonStub).restore();
			(Rows.getRow as SinonStub).restore();
			(Rows.updateRowName as SinonStub).restore();
		});
	});
});
