import { Guild } from "discord.js";
import { getGuild, createGuild } from "./dao";

/**
 * Retreives a guild id for the provided guild. If one does not exist, it will be created.
 * @param guild The guild name to get the ID for.
 * @returns The guild id.
 */
export async function getGuildId(guild: Guild): Promise<number> {
	let botGuild = await getGuild(guild.id);
	if (!botGuild) {
		botGuild = await createGuild(guild.id, guild.name);
	}

	return botGuild.id;
}
