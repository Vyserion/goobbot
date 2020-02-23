import * as DataManager from "../../../core/util/dataManager";
import { TLeaderboard } from "../typings";
import {
	getLeaderboard,
	getLeaderboards,
	createLeaderboard,
	updateLeaderboard,
	deleteLeaderboard
} from "./leaderboards";

describe("plugins/leaderboards/dao/leaderboards", () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("getLeaderboard", () => {
		it("should return the leaderboard that is found", async () => {
			const expectedLeaderboard: TLeaderboard = {
				name: "one",
				columns: [],
				rows: [],
				values: []
			};
			jest.spyOn(DataManager, "execQuery").mockReturnValueOnce(Promise.resolve([expectedLeaderboard]));

			const result = await getLeaderboard("test", 1);
			expect(result).not.toBeNull();
			expect(result.name).toEqual(expectedLeaderboard.name);
		});

		it("should return null when a leaderboard isn't found", async () => {
			jest.spyOn(DataManager, "execQuery").mockReturnValueOnce(Promise.resolve([]));

			const result = await getLeaderboard("a missing leaderboard", 1);
			expect(result).toBeNull();
		});
	});

	describe("getLeaderboards", () => {
		it("should return the leaderboards that are found", async () => {
			const expectedLeaderboards: TLeaderboard[] = [
				{
					name: "leaderboard one",
					columns: [],
					rows: [],
					values: []
				},
				{
					name: "leaderboard two",
					columns: [],
					rows: [],
					values: []
				}
			];
			jest.spyOn(DataManager, "execQuery").mockReturnValueOnce(Promise.resolve(expectedLeaderboards));

			const results = await getLeaderboards(1);
			expect(results).toHaveLength(2);
			expect(results[0].name).toEqual(expectedLeaderboards[0].name);
			expect(results[1].name).toEqual(expectedLeaderboards[1].name);
		});

		it("should return an empty array when no leaderboards are found", async () => {
			jest.spyOn(DataManager, "execQuery").mockReturnValueOnce(Promise.resolve([]));

			const results = await getLeaderboards(1);
			expect(results).toHaveLength(0);
		});
	});

	describe("createLeaderboards()", () => {
		it("should run the insert query when called", async () => {
			const querySpy = jest.spyOn(DataManager, "execQuery");

			await createLeaderboard("test", 1);
			expect(querySpy).toHaveBeenCalledTimes(1);
			expect(querySpy).toHaveBeenCalledWith(`INSERT INTO leaderboards VALUES (DEFAULT, $1, $2)`, [1, "test"]);
		});
	});

	describe("updateLeaderboard()", () => {
		it("should run the update query when called", async () => {
			const querySpy = jest.spyOn(DataManager, "execQuery");

			await updateLeaderboard(1, "test", "newtest");
			expect(querySpy).toHaveBeenCalledTimes(1);
			expect(
				querySpy
			).toHaveBeenCalledWith(`UPDATE leaderboards SET name = ($1) WHERE guild_id = $2 AND name LIKE ($3)`, [
				"newtest",
				1,
				"test"
			]);
		});
	});

	describe("deleteLeaderboard()", () => {
		it("should run the delete query when called", async () => {
			const querySpy = jest.spyOn(DataManager, "execQuery");

			await deleteLeaderboard(1);
			expect(querySpy).toHaveBeenCalledTimes(1);
			expect(querySpy).toHaveBeenCalledWith(`DELETE FROM leaderboards WHERE id = ($1)`, [1]);
		});
	});
});
