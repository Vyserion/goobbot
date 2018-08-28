import { DataManager } from "../../core/dataManager";
import { Value } from "../models";

export namespace ValueDAO {
	export async function getValues(leaderboardId: number): Promise<Value[]> {
		const query = `SELECT l.id AS leaderboard_id, lr.id AS rowId, lc.id AS columnId, lv.value
		FROM leaderboard_values lv
		JOIN leaderboard_rows lr ON lr.id = lv.leaderboard_row_id
		JOIN leaderboard_columns lc ON lc.id = lv.leaderboard_col_id
		JOIN leaderboards l ON l.id = lr.leaderboard_id AND l.id = lc.leaderboard_id
		WHERE l.id = $1;`;
		const params = [leaderboardId];

		await DataManager.query(query, params);
		return;
	}

	export async function upsertValue(
		leaderboardColumnId: number,
		leaderboardRowId: number,
		value: any
	): Promise<void> {
		const query = `INSERT INTO leaderboard_values VALUES (DEFAULT, $1, $2, $3) ON CONFLICT (leaderboard_col_id, leaderboard_row_id) DO UPDATE SET value = $3`;
		const params = [leaderboardColumnId, leaderboardRowId, value];

		await DataManager.query(query, params);
		return;
	}

	export async function deleteValuesByRow(leaderboardRowId: number): Promise<void> {
		const query = `DELETE FROM leaderboard_values WHERE leaderboard_row_id = (?)`;
		const params = [leaderboardRowId];

		await DataManager.query(query, params);
		return;
	}

	export async function deleteValuesByColumn(leaderboardColumnId: number): Promise<void> {
		const query = `DELETE FROM leaderboard_values WHERE leaderboard_col_id = (?)`;
		const params = [leaderboardColumnId];

		await DataManager.query(query, params);
		return;
	}

	export async function deleteValueByLeaderboard(leaderboardId: number): Promise<void> {
		const query = `DELETE FROM leaderboard_values
        WHERE leaderboard_col_id IN (SELECT id FROM leaderboard_columns WHERE leaderboard_id = ?)
        AND leaderboard_row_id IN (SELECT id FROM leaderboard_rows WHERE leaderboard_id = ?)`;
		const params = [leaderboardId, leaderboardId];

		await DataManager.query(query, params);
		return;
	}
}
