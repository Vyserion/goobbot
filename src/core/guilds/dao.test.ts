import { getGuild, createGuild } from "./dao";
import * as DataManager from "../database";
import { TGuild } from "./typings/guild";

describe("core/guilds/dao", () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("getGuild()", () => {
		it("should return null when the guild is not found", async () => {
			jest.spyOn(DataManager, "execQuery").mockReturnValueOnce(Promise.resolve([]));

			const result = await getGuild("this id does not exist");
			expect(result).toBeNull();
		});

		it("should return the guild when the guild is found", async () => {
			const queryResult: TGuild[] = [
				{
					id: 1,
					discord_id: "my guild",
					name: "My Guild",
				},
			];
			jest.spyOn(DataManager, "execQuery").mockReturnValueOnce(Promise.resolve(queryResult));

			const result = await getGuild("my guild");
			expect(result).toEqual(queryResult[0]);
		});
	});

	describe("createGuild()", () => {
		it("should create the guild when called", async () => {
			const expectedGuild: TGuild = {
				id: 1,
				discord_id: "my guild",
				name: "My Guild",
			};
			const querySpy = jest
				.spyOn(DataManager, "execQuery")
				.mockReturnValueOnce(Promise.resolve(null))
				.mockReturnValueOnce(Promise.resolve([expectedGuild]));

			const createdGuild = await createGuild(expectedGuild.discord_id, expectedGuild.name);

			expect(querySpy).toHaveBeenCalledTimes(2);
			expect(createdGuild.discord_id).toEqual(expectedGuild.discord_id);
		});
	});
});
