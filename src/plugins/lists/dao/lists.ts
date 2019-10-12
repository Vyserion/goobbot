import { TList } from "../typings/lists";
import { execQuery } from "../../../core/util/dataManager";

export async function getLists(guildId: number): Promise<TList[]> {
	const query = `SELECT id, guild_id, name FROM lists WHERE guild_id = $1`;
	const params = [guildId];

	const results = await execQuery<TList>(query, params);
	return results;
}

export async function getList(guildId: number, name: string): Promise<TList> {
	const query = `SELECT id, name FROM lists WHERE guild_id = $1 AND name = $2`;
	const params = [guildId, name];

	const results = await execQuery<TList>(query, params);
	if (results.length > 0) {
		return results[0];
	} else {
		return null;
	}
}

export async function createList(guildId: number, name: string): Promise<void> {
	const query = `INSERT INTO lists VALUES (DEFAULT, $1, $2)`;
	const params = [guildId, name];

	await execQuery(query, params);
}

export async function updateListName(guildId: number, name: string, newName: string): Promise<void> {
	const query = `UPDATE lists SET name = ($1) WHERE name LIKE ($2) AND guild_id = $3`;
	const params = [newName, name, guildId];

	await execQuery(query, params);
}

export async function deleteList(guildId: number, name: string): Promise<void> {
	const query = `DELETE FROM lists WHERE guild_id = $1 AND name LIKE ($2)`;
	const params = [guildId, name];

	await execQuery(query, params);
}
