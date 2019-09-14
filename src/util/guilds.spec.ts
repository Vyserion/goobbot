import "mocha";
import { expect } from "chai";
import { stub, SinonStub } from "sinon";
import { UtilDao } from "./dao";
import { TGuild } from "./typings/guilds";
import { getGuildId } from "./guilds";
import { mock, when } from "ts-mockito";
import { Guild } from "discord.js";

describe("util/guilds", () => {
	describe("getGuildId()", () => {
		it("should return a guild when the guild already exists", async () => {
			const guildId = "123456789";
			const guildName = "Test Guild";

			const guild: Guild = mock(Guild);
			when(guild.id).thenReturn(guildId);
			when(guild.name).thenReturn(guildName);

			const expectedGuild: TGuild = {
				id: 1,
				discord_id: guildId,
				name: guildName
			};

			stub(UtilDao, "getGuild").resolves(expectedGuild);

			const result = await getGuildId(guild);
			expect(result).to.equal(expectedGuild.id);

			(UtilDao.getGuild as SinonStub).restore();
		});

		it("should return a guild when the guild doesn't exist", async () => {
			const guildId = "123456789";
			const guildName = "Test Guild";

			const guild: Guild = mock(Guild);
			when(guild.id).thenReturn(guildId);
			when(guild.name).thenReturn(guildName);

			const expectedGuild: TGuild = {
				id: 1,
				discord_id: guildId,
				name: guildName
			};

			stub(UtilDao, "getGuild").resolves(expectedGuild);
			stub(UtilDao, "createGuild").resolves(expectedGuild);

			const result = await getGuildId(guild);
			expect(result).to.equal(expectedGuild.id);

			(UtilDao.getGuild as SinonStub).restore();
			(UtilDao.createGuild as SinonStub).restore();
		});
	});
});
