import { TList } from "../typings/lists";
import { execQuery } from "../../../core/database";

/**
 * Retrieves a set of lists for a guild.
 * @param guildId The guild id
 * @returns A list of all lists for the guild
 */
export async function getLists(guildId: number): Promise<TList[]> {
	const query = `SELECT id, guild_id, name FROM lists WHERE guild_id = $1`;
	const params = [guildId];

	const results = await execQuery<TList>(query, params);
	return results;
}

/**
 * Gets a single list for a guild.
 * @param guildId The guild the list belongs to
 * @param name The list to find
 * @returns The list if found, null otherwise
 */
export async function getList(guildId: number, name: string): Promise<TList> {
	const query = `SELECT id, name FROM lists WHERE guild_id = $1 AND name = $2`;
	const params = [guildId, name];

	const results = await execQuery<TList>(query, params);
	if (results.length > 0) {
		return results[0];
	}
	return null;
}

/**
 * Creates a new list for the given guild.
 * @param guildId The guild the list will belong to
 * @param name The name of the list
 */
export async function createList(guildId: number, name: string): Promise<void> {
	const query = `INSERT INTO lists VALUES (DEFAULT, $1, $2)`;
	const params = [guildId, name];

	await execQuery(query, params);
}

/**
 * Updates the name of a specific list.
 * @param guildId The guild the list belongs to
 * @param name The current name of the list
 * @param newName The new name of the list
 */
export async function updateListName(guildId: number, name: string, newName: string): Promise<void> {
	const query = `UPDATE lists SET name = ($1) WHERE name LIKE ($2) AND guild_id = $3`;
	const params = [newName, name, guildId];

	await execQuery(query, params);
}

/**
 * Deletes a list from a guild.
 * @param guildId The guild the list belongs to
 * @param name The name of the list to remove
 */
export async function deleteList(guildId: number, name: string): Promise<void> {
	const query = `DELETE FROM lists WHERE guild_id = $1 AND name LIKE ($2)`;
	const params = [guildId, name];

	await execQuery(query, params);
}
