import { TList } from "../typings/lists";
import { prettyPrintList } from "./format";

/**
 * Formatted list with no values - spacing is accurate.
 */
const expectedEmptyList = `My List 

This list has no content.`;

/**
 * Formatted list with values - spacing is accurate.
 */
const expectedFilledList = `My List 

one
two
`;

describe("plugins/lists/utils/format", () => {

    describe("prettyPrintList", () => {

        it("should format the output correctly with no values", () => {
            const list: TList = {
                name: "My List",
                values: []
            };
            const output = prettyPrintList(list);
            expect(output).toEqual(expectedEmptyList);
        });

        it("should format the output correctly when provided with values", () => {
            const list: TList = {
                name: "My List",
                values: [
                    {
                        list_id: 1,
                        value: "one"
                    },
                    {
                        list_id: 2,
                        value: "two"
                    }
                ]
            };
            const output = prettyPrintList(list);
            expect(output).toEqual(expectedFilledList);
        });
    });
});
