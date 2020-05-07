import { isPluginMessage } from "./plugins";

describe("core/util/plugins", () => {
	beforeEach(() => {
		process.env = {
			BOTPREFIX: "!"
		};
	});

	describe("isPluginMessage()", () => {
		it("should return true when the prefix and a length is found.", () => {
			const input = `${process.env.BOTPREFIX}message`;
			const result: boolean = isPluginMessage(input);
			expect(result).toBeTruthy();
		});

		it("should return false when just the prefix is provided.", () => {
			const input: string = process.env.BOTPREFIX;
			const result: boolean = isPluginMessage(input);
			expect(result).toBeFalsy();
		});

		it("should return false when a string without the prefix is provided.", () => {
			const input = "message";
			const result: boolean = isPluginMessage(input);
			expect(result).toBeFalsy();
		});
	});
});
