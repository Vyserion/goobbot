import * as DataManager from "../../../core/util/dataManager";
import { TValue } from "../typings/lists";
import { getValues, getValue, addValue, removeValue } from "./values";

describe("plugins/lists/dao/values", () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe("getValues()", () => {

        it("should return the values from the list provided", async () => {
            const expectedValues: TValue[] = [
                {
                    id: 1,
                    list_id: 1,
                    value: "val1"
                },
                {
                    id: 2,
                    list_id: 1,
                    value: "val2"
                }
            ];
            jest.spyOn(DataManager, "execQuery").mockReturnValueOnce(Promise.resolve(expectedValues));

            const results = await getValues(1);
            expect(results).toHaveLength(expectedValues.length);
            expect(results[0]).toEqual(expectedValues[0]);
            expect(results[1]).toEqual(expectedValues[1]);
        });

        it("should return an empty array when there are no values found", async () => {
            jest.spyOn(DataManager, "execQuery").mockReturnValueOnce(Promise.resolve([]));

            const results = await getValues(1);
            expect(results).toHaveLength(0);
        });
    });

    describe("getValue()", () => {

        it("should return the value when one is returned", async () => {
            const expectedValues: TValue[] = [
                {
                    id: 1,
                    list_id: 1,
                    value: "val1"
                }
            ];
            jest.spyOn(DataManager, "execQuery").mockReturnValueOnce(Promise.resolve(expectedValues));

            const result = await getValue(1, "val1");
            expect(result).toBeDefined();
            expect(result).toEqual(expectedValues[0]);
        });

        it("should return null when no values are found", async () => {
            jest.spyOn(DataManager, "execQuery").mockReturnValueOnce(Promise.resolve([]));

            const result = await getValue(1, "test");
            expect(result).toBeNull();
        });
    });
    
    describe("addValue()", () => {

        it("should run the insert query when called", async () => {
            const querySpy = jest.spyOn(DataManager, "execQuery");
            
            await addValue(1, "test");
            expect(querySpy).toHaveBeenCalledTimes(1);
            expect(querySpy).toHaveBeenCalledWith(
                `INSERT INTO list_value VALUES (DEFAULT, $1, $2)`,
                [1, "test"]
            );
        });
    });

    describe("removeValue()", () => {

        it("should run the delete query when called", async () => {
            const querySpy = jest.spyOn(DataManager, "execQuery");

            await removeValue(1, 1);
            expect(querySpy).toHaveBeenCalledTimes(1);
            expect(querySpy).toHaveBeenCalledWith(
                `DELETE FROM list_value WHERE list_id = $1 AND id = $2`,
                [1, 1]
            );
        });
    });
});