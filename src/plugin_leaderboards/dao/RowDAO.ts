import { DataManager } from "../../core/dataManager";
import { Row } from "../models";

export namespace RowDAO {
	export async function getLeaderboardRows(leaderboardId: number): Promise<Row[]> {
		let query = `SELECT * FROM leaderboard_rows WHERE leaderboard_id = $1`;
		let params = [leaderboardId];

		return await DataManager.query(query, params) as Row[];
	}

	export async function getLeaderboardRow(leaderboardId: number, rowName: string): Promise<Row> | null {
		let query = `SELECT * FROM leaderboard_rows WHERE leaderboard_id = $1 AND name = $2`;
		let params = [leaderboardId, rowName];

		const rowResult = await DataManager.query(query, params);
		if (rowResult.length > 0) {
			return rowResult[0];
		} else {
			return null;
		}
	}

	export async function insertLeaderboardRow(leaderboardId: number, rowName: string): Promise<void> {
		let query = `INSERT INTO leaderboard_rows VALUES (DEFAULT, $1, $2)`;
		let params = [leaderboardId, rowName];

		await DataManager.query(query, params);
		return;
	}

	export async function updateLeaderboardRow(leaderboardRowId: number, newRowName: string): Promise<void> {
		let query = `UPDATE leaderboard_rows SET name = ($2) WHERE ID = ($1)`;
		let params = [leaderboardRowId, newRowName];

		await DataManager.query(query, params);
		return;
	}

	export async function deleteLeaderboardRows(leaderboardId: number): Promise<void> {
		const query = `DELETE FROM leaderboard_rows WHERE leaderboard_id = ($1)`;
		const params = [leaderboardId];

		await DataManager.query(query, params);
		return;
	}

	export async function deleteLeaderboardRow(leaderboardRowId: number): Promise<void> {
		const query = `DELETE FROM leaderboard_rows WHERE id = ($1)`;
		const params = [leaderboardRowId];

		await DataManager.query(query, params);
		return;
	}
}
