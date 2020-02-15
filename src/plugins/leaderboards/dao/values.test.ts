import * as DataManager from "../../../core/util/dataManager";
import { TValue } from "../typings";
import { getValues, upsertValue, deleteValuesByLeaderboard, deleteValuesByColumn, deleteValuesByRow } from "./values";

describe("plugins/leaderboards/dao/values", () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe("getValues()", () => {

        it("should return the values that are found", async () => {
            const expectedValues: TValue[] = [
                {
                    rowid: 1,
                    columnid: 1,
                    value: "one"
                },
                {
                    rowid: 2,
                    columnid: 1,
                    value: "two"
                }
            ];
            jest.spyOn(DataManager, "execQuery").mockReturnValueOnce(Promise.resolve(expectedValues));

            const results = await getValues(1);
            expect(results).toHaveLength(2);
            expect(results[0].value).toEqual(expectedValues[0].value);
            expect(results[1].value).toEqual(expectedValues[1].value);
        });

        it("should return an empty array when no values are found", async () => {
            jest.spyOn(DataManager, "execQuery").mockReturnValueOnce(Promise.resolve([]));

            const results = await getValues(1);
            expect(results).toHaveLength(0);
        });
    });

    describe("upsertValue()", () => {

        it("should run the insert query when called", async () => {
            const querySpy = jest.spyOn(DataManager, "execQuery");

            await upsertValue(1, 1, "one");
            expect(querySpy).toHaveBeenCalledTimes(1);
            expect(querySpy).toHaveBeenCalledWith(
                `INSERT INTO leaderboard_values 
    VALUES (DEFAULT, $1, $2, $3) 
    ON CONFLICT (leaderboard_col_id, leaderboard_row_id) DO UPDATE SET value = $3`,
                [1, 1, "one"]
            );
        });
    });

    describe("deleteValuesByLeaderboard()", () => {

        it("should run the delete by leaderboard query when called", async () => {
            const querySpy = jest.spyOn(DataManager, "execQuery");

            await deleteValuesByLeaderboard(1);
            expect(querySpy).toHaveBeenCalledTimes(1);
            expect(querySpy).toHaveBeenCalledWith(
                `DELETE FROM leaderboard_values
    WHERE leaderboard_col_id IN (SELECT id FROM leaderboard_columns WHERE leaderboard_id = ?)
    AND leaderboard_row_id IN (SELECT id FROM leaderboard_rows WHERE leaderboard_id = ?)`,
                [1, 1]
            );
        });
    });

    describe("deleteValuesByColumn()", () => {

        it("should run the delete by column query when called", async () => {
            const querySpy = jest.spyOn(DataManager, "execQuery");

            await deleteValuesByColumn(1);
            expect(querySpy).toHaveBeenCalledTimes(1);
            expect(querySpy).toHaveBeenCalledWith(
                `DELETE FROM leaderboard_values WHERE leaderboard_col_id = (?)`,
                [1]
            );
        });
    });

    describe("deleteValuesByRow()", () => {

        it("should run the delete by row query when called", async () => {
            const querySpy = jest.spyOn(DataManager, "execQuery");

            await deleteValuesByRow(1);
            expect(querySpy).toHaveBeenCalledTimes(1);
            expect(querySpy).toHaveBeenCalledWith(
                `DELETE FROM leaderboard_rows WHERE leaderboard_row_id = (?)`,
                [1]
            );
        });
    });
});