import { Actions, ColumnTypes } from "../config";
import { GetLeaderboardHandler } from "./getLeaderboard";
import { TCommand } from "../../../core/typings";
import * as Guilds from "../../../core/guilds/guilds";
import * as Leaderboards from "../dao/leaderboards";
import * as Columns from "../dao/columns";
import * as Rows from "../dao/rows";
import * as Values from "../dao/values";
import { createMockedMessage } from "../../../test";
import { TLeaderboard, TColumn, TRow, TValue } from "../typings";

describe("plugins/leaderboards/actions/getLeaderboard", () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("handleAction()", () => {
		it("should check for less than one argument", async () => {
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.getLeaderboard,
				arguments: [],
				originalMessage: null,
			};

			const actionHandler = new GetLeaderboardHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = "No name was provided.";
			expect(result).toEqual(expectedResult);
		});

		it("should return an error if no leaderboard is found", async () => {
			jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
			jest.spyOn(Leaderboards, "getLeaderboard").mockReturnValueOnce(Promise.resolve(null));

			const leaderboardName = "Test Leaderboard";
			const mockedMessage = createMockedMessage();
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.getLeaderboard,
				arguments: [leaderboardName],
				originalMessage: mockedMessage,
			};

			const actionHandler = new GetLeaderboardHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `A leaderboard with the name ${leaderboardName} was not found.`;
			expect(result).toEqual(expectedResult);
		});

		it("should return only the leaderboard name is there is no content", async () => {
			jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
			const leaderboard: TLeaderboard = {
				name: "Test Leaderboard",
				columns: [],
				rows: [],
				values: [],
			};
			jest.spyOn(Leaderboards, "getLeaderboard").mockReturnValueOnce(Promise.resolve(leaderboard));
			jest.spyOn(Columns, "getColumns").mockReturnValueOnce(Promise.resolve([]));
			jest.spyOn(Rows, "getRows").mockReturnValueOnce(Promise.resolve([]));
			jest.spyOn(Values, "getValues").mockReturnValueOnce(Promise.resolve([]));

			const mockedMessage = createMockedMessage();
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.getLeaderboard,
				arguments: [leaderboard.name],
				originalMessage: mockedMessage,
			};

			const actionHandler = new GetLeaderboardHandler(command);
			const result = await actionHandler.handleAction();
			const expectedResult = `${leaderboard.name} 

This leaderboard has no content.`;
			expect(result).toEqual(expectedResult);
		});

		it("should return a full leaderboard when successful", async () => {
			jest.spyOn(Guilds, "getGuildId").mockReturnValueOnce(Promise.resolve(1));
			const leaderboard: TLeaderboard = {
				name: "Test Leaderboard",
				columns: [],
				rows: [],
				values: [],
			};
			jest.spyOn(Leaderboards, "getLeaderboard").mockReturnValueOnce(Promise.resolve(leaderboard));
			const mockColumns: TColumn[] = [
				{
					id: 1,
					name: "Test Column",
					type: ColumnTypes.DATA,
				},
			];
			jest.spyOn(Columns, "getColumns").mockReturnValueOnce(Promise.resolve(mockColumns));
			const mockRows: TRow[] = [
				{
					id: 1,
					name: "Test Row",
				},
			];
			const clonedMockRows = JSON.parse(JSON.stringify(mockRows));
			jest.spyOn(Rows, "getRows").mockReturnValueOnce(Promise.resolve(mockRows));
			const mockValues: TValue[] = [
				{
					rowid: 1,
					columnid: 1,
					value: "10",
				},
			];
			jest.spyOn(Values, "getValues").mockReturnValueOnce(Promise.resolve(mockValues));

			const mockedMessage = createMockedMessage();
			const command: TCommand = {
				plugin: "leaderboards",
				action: Actions.getLeaderboard,
				arguments: [leaderboard.name],
				originalMessage: mockedMessage,
			};

			const actionHandler = new GetLeaderboardHandler(command);
			const result = await actionHandler.handleAction();
			const consoleStr = "```";
			const expectedResult = `${leaderboard.name} 

${consoleStr}
|          | ${mockColumns[0].name} |
| ${clonedMockRows[0].name} | ${mockValues[0].value}          |
${consoleStr}`;
			expect(result).toEqual(expectedResult);
		});
	});
});
