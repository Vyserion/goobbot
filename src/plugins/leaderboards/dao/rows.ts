import { execQuery } from "../../../core/database";
import { TRow } from "../typings";

/**
 * Retrieves a single row for a given leaderboard.
 * @param rowName The name of the row to return
 * @param leaderboardId The leaderboard id
 *
 * @returns The row, if one is found, or null otherwise
 */
export async function getRow(rowName: string, leaderboardId: number): Promise<TRow | null> {
	const query = `SELECT * FROM leaderboard_rows WHERE name = $1 and leaderboard_id = $2`;
	const params = [rowName, leaderboardId];

	const result: TRow[] = await execQuery(query, params);
	if (result.length > 0) {
		return result[0];
	}
	return null;
}

/**
 * Retrieves a set of rows for a given leaderboard.
 * @param leaderboardId The leaderboard id
 *
 * @returns An array of rows for the leaderboard
 */
export async function getRows(leaderboardId: number): Promise<TRow[]> {
	const query = `SELECT * FROM leaderboard_rows WHERE leaderboard_id = $1`;
	const params = [leaderboardId];

	const result: TRow[] = await execQuery(query, params);
	return result;
}

/**
 * Upserts a single row to the provided leaderboard.
 * @param name The name of the row to add
 * @param leaderboardId The leaderboard id
 */
export async function createRow(name: string, leaderboardId: number): Promise<void> {
	const query = `INSERT INTO leaderboard_rows VALUES (DEFAULT, $1, $2)`;
	const params = [leaderboardId, name];

	await execQuery(query, params);
}

/**
 * Updates the name of a single row.
 * @param rowId The row to update
 * @param newName The new row name
 */
export async function updateRowName(rowId: number, newName: string): Promise<void> {
	const query = `UPDATE leaderboard_rows SET name = ($2) WHERE ID = ($1)`;
	const params = [rowId, newName];

	await execQuery(query, params);
}

/**
 * Deletes all rows for the provided leaderboard.
 * @param leaderboardId The leaderboard id
 */
export async function deleteRows(leaderboardId: number): Promise<void> {
	const query = `DELETE FROM leaderboard_rows WHERE leaderboard_id = ($1)`;
	const params = [leaderboardId];

	await execQuery(query, params);
}

/**
 * Deletes a single row
 * @param rowId The row id
 */
export async function deleteRow(rowId: number): Promise<void> {
	const query = `DELETE FROM leaderboard_rows WHERE leaderboard_row_id = ($1)`;
	const params = [rowId];

	await execQuery(query, params);
}
