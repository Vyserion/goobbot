import { GaladionBayCode } from "../config/routeInfo";
import { embedPrintLocation } from "./locationPrinter";

describe("plugins/ffxiv/fishing/util/locationPrinter", () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("embedPrintLocation", () => {
		it("should throw an error with an invalid location", () => {
			try {
				embedPrintLocation("notaspot");
			} catch (error) {
				const expectedError = `Unknown fishing location notaspot`;
				expect(error.message).toEqual(expectedError);
			}
		});

		it("should return a valid embed for a valid location", () => {
			const result = embedPrintLocation(GaladionBayCode);
			expect(result).toHaveProperty("title");
			expect(result.title).toEqual("Galadion Bay");
			expect(result).toHaveProperty("fields");
			expect(result.fields).toHaveLength(3);
		});
	});
});
