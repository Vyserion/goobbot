import { execQuery } from "../../../core/database";
import { TValue } from "../typings";

/**
 * Retreives a set of values for a given leaderboard.
 * @param leaderboardId The leaderboard id
 *
 * @returns An array of values for the leaderboard
 */
export async function getValues(leaderboardId: number): Promise<TValue[]> {
	const query = `SELECT l.id AS leaderboardId, lr.id AS rowid, lc.id AS columnid, lv.value AS value
	FROM leaderboard_values lv
	JOIN leaderboard_rows lr ON lr.id = lv.leaderboard_row_id
	JOIN leaderboard_columns lc ON lc.id = lv.leaderboard_col_id
	JOIN leaderboards l ON l.id = lr.leaderboard_id AND l.id = lc.leaderboard_id
	WHERE l.id = $1;`;
	const params = [leaderboardId];

	const results: TValue[] = await execQuery(query, params);
	return results;
}

/**
 * Upserts a single value to a provided column and row.
 * @param columnId The column id
 * @param rowId The row id
 * @param value The value to add
 */
export async function upsertValue(columnId: number, rowId: number, value: string): Promise<void> {
	const query = `INSERT INTO leaderboard_values 
    VALUES (DEFAULT, $1, $2, $3) 
    ON CONFLICT (leaderboard_col_id, leaderboard_row_id) DO UPDATE SET value = $3`;
	const params = [columnId, rowId, value];

	await execQuery(query, params);
}

/**
 * Removes all values for a given leaderboard.
 * @param leaderboardId The leaderboard to remove all values from
 */
export async function deleteValuesByLeaderboard(leaderboardId: number): Promise<void> {
	const query = `DELETE FROM leaderboard_values
    WHERE leaderboard_col_id IN (SELECT id FROM leaderboard_columns WHERE leaderboard_id = ?)
    AND leaderboard_row_id IN (SELECT id FROM leaderboard_rows WHERE leaderboard_id = ?)`;
	const params = [leaderboardId, leaderboardId];

	await execQuery(query, params);
}

/**
 * Removes all values from a given column.
 * @param columnId The column to remove all values from
 */
export async function deleteValuesByColumn(columnId: number): Promise<void> {
	const query = `DELETE FROM leaderboard_values WHERE leaderboard_col_id = (?)`;
	const params = [columnId];

	await execQuery(query, params);
}

/**
 * Removes all values from a given row.
 * @param rowId The row to remove all values from
 */
export async function deleteValuesByRow(rowId: number): Promise<void> {
	const query = `DELETE FROM leaderboard_rows WHERE leaderboard_row_id = (?)`;
	const params = [rowId];

	await execQuery(query, params);
}
