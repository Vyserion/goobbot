import * as DAO from "./dao";
import { TGuild } from "./typings/guild";
import { getGuildId } from "./guilds";
import { createMockedGuild } from "../../test";

describe("core/guilds/guilds", () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("getGuildId()", () => {
		it("should return the guild id when the guild exists", async () => {
			const expectedGuild: TGuild = {
				id: 1,
				discord_id: "expected_guild",
				name: "Expected Guild",
			};
			jest.spyOn(DAO, "getGuild").mockReturnValueOnce(Promise.resolve(expectedGuild));

			const mockedGuild = createMockedGuild(expectedGuild.discord_id);
			const result = await getGuildId(mockedGuild);
			expect(result).toEqual(expectedGuild.id);
		});

		it("should return the guild id when the guild does not exist and is created", async () => {
			const expectedGuild: TGuild = {
				id: 1,
				discord_id: "expected_guild",
				name: "Expected Guild",
			};
			jest.spyOn(DAO, "getGuild").mockReturnValueOnce(Promise.resolve(null));
			jest.spyOn(DAO, "createGuild").mockReturnValueOnce(Promise.resolve(expectedGuild));

			const mockedGuild = createMockedGuild(expectedGuild.discord_id);
			const result = await getGuildId(mockedGuild);
			expect(result).toEqual(expectedGuild.id);
		});
	});
});
