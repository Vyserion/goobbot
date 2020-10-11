import {
	GaladionBayCode,
	getAllLocations,
	getLocationKeyFromInput,
	isALocation,
	NorthernStraitCode,
	RhotanoSeaCode,
	SouthernStraitCode
} from "./routeInfo";

describe("plugins/ffxiv/fishing/config/routeInfo", () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("getAllLocations()", () => {
		it("should return all codes", () => {
			const result = getAllLocations();
			const expectedLocations = [GaladionBayCode, NorthernStraitCode, SouthernStraitCode, RhotanoSeaCode];
			expect(result).toEqual(expectedLocations);
		});
	});

	describe("isALocation()", () => {
		it("should return true for a code", () => {
			const val = GaladionBayCode;
			const result = isALocation(val);
			expect(result).toBe(true);
		});

		it("should return true for an alias", () => {
			const val = "NS";
			const result = isALocation(val);
			expect(result).toBe(true);
		});

		it("should return false for an invalid location", () => {
			const val = "notanumber";
			const result = isALocation(val);
			expect(result).toBe(false);
		});
	});

	describe("getLocationKeyFromInput()", () => {
		it("should return the code from Galadion", () => {
			const val = "GB";
			const result = getLocationKeyFromInput(val);
			expect(result).toEqual(GaladionBayCode);
		});

		it("should throw an error if the key is invalid", () => {
			const val = "notaval";
			try {
				getLocationKeyFromInput(val);
			} catch (error) {
				const expected = `Unknown location key ${val}, unable to parse`;
				expect(error.message).toEqual(expected);
			}
		});
	});
});
