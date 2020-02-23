import { TGuild } from "./typings/guild";
import { execQuery } from "../util/dataManager";

/**
 * Gets a given guild from the database.
 * @param guildId The guild id to fetch.
 * @returns The guild if found, null otherwise.
 */
export async function getGuild(guildId: string): Promise<TGuild | null> {
	const query = `SELECT /* getGuild */ id, discord_id, name FROM guilds WHERE discord_id = $1`;
	const params = [guildId];

	const result = await execQuery<TGuild>(query, params);
	if (result.length > 0) {
		return result[0];
	}
	return null;
}

/**
 * Creates a new guild in the guild table.
 * @param guildId The discord guild id.
 * @param name The name of the guild.
 * @returns The inserted guild.
 */
export async function createGuild(guildId: string, name: string): Promise<TGuild> {
	const query = `INSERT /* createGuild */ INTO guilds(id, discord_id, name) VALUES (DEFAULT, $1, $2)`;
	const params = [guildId, name];

	await execQuery(query, params);
	return getGuild(guildId);
}
