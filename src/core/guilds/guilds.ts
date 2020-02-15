import { getGuild, createGuild } from "./dao";
import { Guild } from "discord.js";

/**
 * Retreives a guild Id for the provided guild. If one does not exist, it will be created.
 * @param guild The guild to get the ID for
 * 
 * @returns The guild Id
 */
export async function getGuildId(guild: Guild): Promise<number> {
	let botGuild = await getGuild(guild.id);
	if (!botGuild) {
		botGuild = await createGuild(guild.id, guild.name);
	}

	return botGuild.id;
}
