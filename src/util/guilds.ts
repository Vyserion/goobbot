import { UtilDao } from "./dao";
import { Guild } from "discord.js";

export async function getGuildId(guild: Guild): Promise<number> {
	let botGuild = await UtilDao.getGuild(guild.id);
	if (!botGuild) {
		botGuild = await UtilDao.createGuild(guild.id, guild.name);
	}

	return botGuild.id;
}
