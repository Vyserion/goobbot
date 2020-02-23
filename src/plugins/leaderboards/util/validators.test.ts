import { TCommand } from "../../../core/typings";
import { commandHasCorrectArgumentLength, leaderboardExists, columnExists, rowExists } from "./validators";
import * as LeaderboardsDao from "../dao/leaderboards";
import * as ColumnsDao from "../dao/columns";
import * as RowsDao from "../dao/rows";
import { TLeaderboard, TColumn, TRow } from "../typings";
import { ColumnTypes } from "../config";

describe("plugins/leaderboards/util/validators", () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("commandHasCorrectArgumentLength", () => {
		it("should return true when the command has the minimum amount of arguments", () => {
			const command: TCommand = {
				plugin: "string",
				arguments: ["one", "two"],
				originalMessage: null
			};
			const result = commandHasCorrectArgumentLength(command, 2);
			expect(result).toBeTruthy();
		});

		it("should return true when the command has more than the minimum amount of arguments", () => {
			const command: TCommand = {
				plugin: "string",
				arguments: ["one", "two", "three"],
				originalMessage: null
			};
			const result = commandHasCorrectArgumentLength(command, 2);
			expect(result).toBeTruthy();
		});

		it("should return false when the command has less than the minimum amount of arguments", () => {
			const command: TCommand = {
				plugin: "string",
				arguments: ["one"],
				originalMessage: null
			};
			const result = commandHasCorrectArgumentLength(command, 2);
			expect(result).toBeFalsy();
		});

		it("should return true when the command has an amount of arguments between the minimum and maximum", () => {
			const command: TCommand = {
				plugin: "string",
				arguments: ["one", "two"],
				originalMessage: null
			};
			const result = commandHasCorrectArgumentLength(command, 1, 3);
			expect(result).toBeTruthy();
		});

		it("should return false when the command has an amount of arguments less than the minimum with a maximum", () => {
			const command: TCommand = {
				plugin: "string",
				arguments: ["one"],
				originalMessage: null
			};
			const result = commandHasCorrectArgumentLength(command, 2, 3);
			expect(result).toBeFalsy();
		});

		it("should return false when the command has an amount of arguments of the minimum with a maximum", () => {
			const command: TCommand = {
				plugin: "string",
				arguments: ["one"],
				originalMessage: null
			};
			const result = commandHasCorrectArgumentLength(command, 2, 3);
			expect(result).toBeFalsy();
		});

		it("should return false when the command has an amount of arguments more than the maximum", () => {
			const command: TCommand = {
				plugin: "string",
				arguments: ["one", "two", "three", "four"],
				originalMessage: null
			};
			const result = commandHasCorrectArgumentLength(command, 1, 3);
			expect(result).toBeFalsy();
		});

		it("should return false when the command has an amount of arguments more than the maximum", () => {
			const command: TCommand = {
				plugin: "string",
				arguments: ["one", "two", "three", "four"],
				originalMessage: null
			};
			const result = commandHasCorrectArgumentLength(command, 1, 3);
			expect(result).toBeFalsy();
		});

		it("should return true when the command has the maximum amount of arguments", () => {
			const command: TCommand = {
				plugin: "string",
				arguments: ["one", "two", "three"],
				originalMessage: null
			};
			const result = commandHasCorrectArgumentLength(command, 1, 3);
			expect(result).toBeTruthy();
		});
	});

	describe("leaderboardExists()", () => {
		it("should return true when the leaderboard exists", async () => {
			const mockLeaderboard: TLeaderboard = {
				name: "test",
				columns: [],
				rows: [],
				values: []
			};
			jest.spyOn(LeaderboardsDao, "getLeaderboard").mockReturnValueOnce(Promise.resolve(mockLeaderboard));

			const result = await leaderboardExists("test", 1);
			expect(result).toBeTruthy();
		});

		it("should return false when the leaderboard does not exist", async () => {
			jest.spyOn(LeaderboardsDao, "getLeaderboard").mockReturnValueOnce(Promise.resolve(null));

			const result = await leaderboardExists("test", 1);
			expect(result).toBeFalsy();
		});
	});

	describe("columnExists()", () => {
		it("should return true when the column exists", async () => {
			const mockColumn: TColumn = {
				name: "test",
				type: ColumnTypes.DATA
			};
			jest.spyOn(ColumnsDao, "getColumn").mockReturnValueOnce(Promise.resolve(mockColumn));

			const result = await columnExists("test", 1);
			expect(result).toBeTruthy();
		});

		it("should return false when the column does not exist", async () => {
			jest.spyOn(ColumnsDao, "getColumn").mockReturnValueOnce(Promise.resolve(null));

			const result = await columnExists("test", 1);
			expect(result).toBeFalsy();
		});
	});

	describe("rowExists()", () => {
		it("should return true when the row exists", async () => {
			const mockRow: TRow = {
				name: "test"
			};
			jest.spyOn(RowsDao, "getRow").mockReturnValueOnce(Promise.resolve(mockRow));

			const result = await rowExists("test", 1);
			expect(result).toBeTruthy();
		});

		it("should return false when the row does not exist", async () => {
			jest.spyOn(RowsDao, "getRow").mockReturnValueOnce(Promise.resolve(null));

			const result = await rowExists("test", 1);
			expect(result).toBeFalsy();
		});
	});
});
