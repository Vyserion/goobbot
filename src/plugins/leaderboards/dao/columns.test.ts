import * as DataManager from "../../../core/database";
import { TColumn } from "../typings";
import { ColumnTypes } from "../config";
import {
	getColumn,
	getColumns,
	createColumn,
	updateColumnName,
	updateColumnType,
	deleteColumn,
	deleteColumns,
} from "./columns";

describe("plugins/leaderboards/dao/columns", () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("getColumn", () => {
		it("should return the columns that are found", async () => {
			const expectedColumn: TColumn = {
				name: "test",
				type: ColumnTypes.DATA,
			};
			jest.spyOn(DataManager, "execQuery").mockReturnValueOnce(Promise.resolve([expectedColumn]));

			const result = await getColumn("test", 1);
			expect(result).not.toBeNull();
			expect(result.name).toEqual(expectedColumn.name);
		});

		it("should return null when a column isn't found", async () => {
			jest.spyOn(DataManager, "execQuery").mockReturnValueOnce(Promise.resolve([]));

			const result = await getColumn("test", 1);
			expect(result).toBeNull();
		});
	});

	describe("getColumns()", () => {
		it("should return the columns that are found", async () => {
			const expectedColumns: TColumn[] = [
				{
					name: "test one",
					type: ColumnTypes.DATA,
				},
				{
					name: "test two",
					type: ColumnTypes.DATA,
				},
			];
			jest.spyOn(DataManager, "execQuery").mockReturnValueOnce(Promise.resolve(expectedColumns));

			const results = await getColumns(1);
			expect(results).toHaveLength(2);
			expect(results[0].name).toEqual(expectedColumns[0].name);
			expect(results[1].name).toEqual(expectedColumns[1].name);
		});

		it("should return an empty array when no columns are found", async () => {
			jest.spyOn(DataManager, "execQuery").mockReturnValueOnce(Promise.resolve([]));

			const results = await getColumns(1);
			expect(results).toHaveLength(0);
		});
	});

	describe("createColumns()", () => {
		it("should run the insert query when called", async () => {
			const querySpy = jest.spyOn(DataManager, "execQuery");

			await createColumn("test", ColumnTypes.DATA, 1);
			expect(querySpy).toHaveBeenCalledTimes(1);
			expect(querySpy).toHaveBeenCalledWith(`INSERT INTO leaderboard_columns VALUES (DEFAULT, $1, $2, $3)`, [
				1,
				"test",
				ColumnTypes.DATA,
			]);
		});
	});

	describe("updateColumnName()", () => {
		it("should run the update query when called", async () => {
			const querySpy = jest.spyOn(DataManager, "execQuery");

			await updateColumnName("test", 2, 1);
			expect(querySpy).toHaveBeenCalledTimes(1);
			expect(
				querySpy
			).toHaveBeenCalledWith(
				`UPDATE leaderboard_columns SET name = ($3) WHERE leaderboard_id = ($1) AND id = ($2)`,
				[1, 2, "test"]
			);
		});
	});

	describe("updateColumnType()", () => {
		it("should run the update query when called", async () => {
			const querySpy = jest.spyOn(DataManager, "execQuery");

			await updateColumnType(ColumnTypes.DATA, 2, 1);
			expect(querySpy).toHaveBeenCalledTimes(1);
			expect(
				querySpy
			).toHaveBeenCalledWith(
				`UPDATE leaderboard_columns SET type = ($3) WHERE leaderboard_id = ($1) AND id = ($2)`,
				[1, 2, ColumnTypes.DATA]
			);
		});
	});

	describe("deleteColumn()", () => {
		it("should run the delete query when called", async () => {
			const querySpy = jest.spyOn(DataManager, "execQuery");

			await deleteColumn(2, 1);
			expect(querySpy).toHaveBeenCalledTimes(1);
			expect(
				querySpy
			).toHaveBeenCalledWith(`DELETE FROM leaderboard_columns WHERE leaderboard_id = ($1) AND id = ($2)`, [2, 1]);
		});
	});

	describe("deleteColumns()", () => {
		it("should run the delete query when called", async () => {
			const querySpy = jest.spyOn(DataManager, "execQuery");

			await deleteColumns(1);
			expect(querySpy).toHaveBeenCalledTimes(1);
			expect(querySpy).toHaveBeenCalledWith(`DELETE FROM leaderboard_columns WHERE leaderboard_id = ($1)`, [1]);
		});
	});
});
