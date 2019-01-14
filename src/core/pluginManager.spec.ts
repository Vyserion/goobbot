import "mocha";
import { expect } from "chai";
import { isPluginMessage } from "./PluginManager";

describe("core/pluginManager", () => {
	// @ts-ignore - Reads as unused variable.
	let env;

	beforeEach(() => {
		env = process.env;
		process.env = {
			PREFIX: "!"
		};
	});

	describe("isPluginMessage()", () => {
		it("should return true when the prefix and a length is found.", () => {
			const input: string = process.env.PREFIX + "message";
			const result: boolean = isPluginMessage(input);
			expect(result).to.be.true;
		});

		it("should return false when just the prefix is provided.", () => {
			const input: string = process.env.PREFIX;
			const result: boolean = isPluginMessage(input);
			expect(result).to.be.false;
		});

		it("should return false when a string without the prefix is provided.", () => {
			const input: string = "message";
			const result: boolean = isPluginMessage(input);
			expect(result).to.be.false;
		});
	});
});
