import * as DataManager from "../../../core/util/dataManager";
import { TList } from "../typings/lists";
import { getLists, getList, createList, updateListName, deleteList } from "./lists";

describe("plugins/lists/dao/lists", () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("getLists()", () => {
		it("should return the lists that are found", async () => {
			const expectedLists: TList[] = [
				{
					id: 1,
					guild_id: 1,
					name: "list1",
					values: [],
				},
				{
					id: 2,
					guild_id: 1,
					name: "list2",
					values: [],
				},
			];
			jest.spyOn(DataManager, "execQuery").mockReturnValueOnce(Promise.resolve(expectedLists));

			const results = await getLists(1);
			expect(results).toHaveLength(2);
			expect(results[0]).toEqual(expectedLists[0]);
			expect(results[1]).toEqual(expectedLists[1]);
		});

		it("should return an empty array when no lists are found", async () => {
			jest.spyOn(DataManager, "execQuery").mockReturnValueOnce(Promise.resolve([]));

			const results = await getLists(1);
			expect(results).toHaveLength(0);
		});
	});

	describe("getList()", () => {
		it("should return a list when one is found", async () => {
			const expectedLists: TList[] = [
				{
					id: 1,
					guild_id: 1,
					name: "list1",
					values: [],
				},
			];
			jest.spyOn(DataManager, "execQuery").mockReturnValueOnce(Promise.resolve(expectedLists));

			const result = await getList(1, "list1");
			expect(result).toBeDefined();
			expect(result).toEqual(expectedLists[0]);
		});

		it("should return null when no list is found", async () => {
			jest.spyOn(DataManager, "execQuery").mockReturnValueOnce(Promise.resolve([]));

			const result = await getList(1, "test");
			expect(result).toBeNull();
		});
	});

	describe("createList()", () => {
		it("should run the insert query when called", async () => {
			const querySpy = jest.spyOn(DataManager, "execQuery");

			await createList(1, "test");
			expect(querySpy).toHaveBeenCalledTimes(1);
			expect(querySpy).toHaveBeenCalledWith(`INSERT INTO lists VALUES (DEFAULT, $1, $2)`, [1, "test"]);
		});
	});

	describe("updateListName()", () => {
		it("should run the update query when called", async () => {
			const querySpy = jest.spyOn(DataManager, "execQuery");

			await updateListName(1, "test", "testName");
			expect(querySpy).toHaveBeenCalledTimes(1);
			expect(querySpy).toHaveBeenCalledWith(
				`UPDATE lists SET name = ($1) WHERE name LIKE ($2) AND guild_id = $3`,
				["testName", "test", 1]
			);
		});
	});

	describe("deleteList()", () => {
		it("should run the delete query when called", async () => {
			const querySpy = jest.spyOn(DataManager, "execQuery");

			await deleteList(1, "test");
			expect(querySpy).toHaveBeenCalledTimes(1);
			expect(querySpy).toHaveBeenCalledWith(`DELETE FROM lists WHERE guild_id = $1 AND name LIKE ($2)`, [
				1,
				"test",
			]);
		});
	});
});
