import * as DataManager from "../../../core/util/dataManager";
import { TRow } from "../typings";
import { getRow, getRows, createRow, updateRowName, deleteRows, deleteRow } from "./rows";

describe("plugins/leaderboards/dao/rows", () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("getRow()", () => {
		it("should return the row that is found", async () => {
			const expectedRow: TRow = {
				name: "test row",
			};
			jest.spyOn(DataManager, "execQuery").mockReturnValueOnce(Promise.resolve([expectedRow]));

			const result = await getRow("test row", 1);
			expect(result).not.toBeNull();
			expect(result).toEqual(expectedRow);
		});

		it("should return null when a row isn't found", async () => {
			jest.spyOn(DataManager, "execQuery").mockReturnValueOnce(Promise.resolve([]));

			const result = await getRow("a missing row", 1);
			expect(result).toBeNull();
		});
	});

	describe("getRows()", () => {
		it("should return the rows that are found", async () => {
			const expectedRows: TRow[] = [
				{
					name: "row one",
				},
				{
					name: "row two",
				},
			];
			jest.spyOn(DataManager, "execQuery").mockReturnValueOnce(Promise.resolve(expectedRows));

			const results = await getRows(1);
			expect(results).toHaveLength(2);
			expect(results[0].name).toEqual(expectedRows[0].name);
			expect(results[1].name).toEqual(expectedRows[1].name);
		});

		it("should return an empty array when no rows are found", async () => {
			jest.spyOn(DataManager, "execQuery").mockReturnValueOnce(Promise.resolve([]));

			const results = await getRows(1);
			expect(results).toHaveLength(0);
		});
	});

	describe("createRow()", () => {
		it("should run the insert query when called", async () => {
			const querySpy = jest.spyOn(DataManager, "execQuery");

			await createRow("test row", 1);
			expect(querySpy).toHaveBeenCalledTimes(1);
			expect(querySpy).toHaveBeenCalledWith(`INSERT INTO leaderboard_rows VALUES (DEFAULT, $1, $2)`, [
				1,
				"test row",
			]);
		});
	});

	describe("updateRowName()", () => {
		it("should run the update query when called", async () => {
			const querySpy = jest.spyOn(DataManager, "execQuery");

			await updateRowName(1, "new row name");
			expect(querySpy).toHaveBeenCalledTimes(1);
			expect(querySpy).toHaveBeenCalledWith(`UPDATE leaderboard_rows SET name = ($2) WHERE ID = ($1)`, [
				1,
				"new row name",
			]);
		});
	});

	describe("deleteRows()", () => {
		it("should run the delete query when called", async () => {
			const querySpy = jest.spyOn(DataManager, "execQuery");

			await deleteRows(1);
			expect(querySpy).toHaveBeenCalledTimes(1);
			expect(querySpy).toHaveBeenCalledWith(`DELETE FROM leaderboard_rows WHERE leaderboard_id = ($1)`, [1]);
		});
	});

	describe("deleteRow()", () => {
		it("should run the delete query when called", async () => {
			const querySpy = jest.spyOn(DataManager, "execQuery");

			await deleteRow(1);
			expect(querySpy).toHaveBeenCalledTimes(1);
			expect(querySpy).toHaveBeenCalledWith(`DELETE FROM leaderboard_rows WHERE leaderboard_row_id = ($1)`, [1]);
		});
	});
});
