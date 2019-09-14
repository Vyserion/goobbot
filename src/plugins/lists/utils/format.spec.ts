import "mocha";
import { expect } from "chai";
import { TList } from "../typings/lists";
import { prettyPrintList } from "./format";

describe("plugins/lists/util/format", () => {
	describe("prettyPrintList()", () => {
		it("should format the output correctly with no values", () => {
			const list: TList = {
				name: "My List",
				values: []
			};

			const expectedOutput = `My List 

This list has no content.`;

			const output = prettyPrintList(list);

			expect(output).to.equal(expectedOutput);
		});

		it("should format the output correctly with no values", () => {
			const list: TList = {
				name: "My List",
				values: [
					{
						list_id: 1,
						value: "one"
					},
					{
						list_id: 1,
						value: "two"
					}
				]
			};

			const expectedOutput = `My List 

one
two
`;

			const output = prettyPrintList(list);

			expect(output).to.equal(expectedOutput);
		});
	});
});
