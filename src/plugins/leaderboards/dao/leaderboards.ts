import { TLeaderboard } from "../typings";
import { execQuery } from "../../../core/util/dataManager";

/**
 * Retrieves a single leaderbaord.
 * @param name The name of the leaderboard
 * @param guildId The guild id
 * 
 * @returns The leaderboard, if one is found, or null otherwise
 */
export async function getLeaderboard(name: string, guildId: number): Promise<TLeaderboard> {
	const query = `SELECT * FROM leaderboards WHERE guild_id = $1 AND name = $2`;
	const params = [guildId, name];

	const result: TLeaderboard[] = await execQuery(query, params);
	if (result.length > 0) {
		return result[0];
	} else {
		return null;
	}
}

/**
 * Retrieves the full list of leaderboards for a given guild.
 * @param guildId The guild id
 * 
 * @returns An array of leaderboards for the guild
 */
export async function getLeaderboards(guildId: number): Promise<TLeaderboard[]> {
	const query = `SELECT * FROM leaderboards WHERE guild_id = $1`;
	const params = [guildId];

	const results = await execQuery<TLeaderboard>(query, params);
	return results;
}

/**
 * Inserts a single leaderboard.
 * @param name The name of the leaderboard
 * @param guildId The guild id
 */
export async function createLeaderboard(name: string, guildId: number): Promise<void> {
	const query = `INSERT INTO leaderboards VALUES (DEFAULT, $1, $2)`;
	const params = [guildId, name];

	await execQuery(query, params);
}

/**
 * Updates the name of a leaderboard.
 * @param guildId The guild id
 * @param name The current name of the leaderboard
 * @param newName The new name of the leaderboard
 */
export async function updateLeaderboard(guildId: number, name: string, newName: string): Promise<void> {
	const query = `UPDATE leaderboards SET name = ($1) WHERE guild_id = $2 AND name LIKE ($3)`;
	const params = [newName, guildId, name];

	await execQuery(query, params);
}

/**
 * Deletes the leaderboard.
 * @param id The leaderboard id
 */
export async function deleteLeaderboard(id: number): Promise<void> {
	const query = `DELETE FROM leaderboards WHERE id = ($1)`;
	const params = [id];

	await execQuery(query, params);
}
