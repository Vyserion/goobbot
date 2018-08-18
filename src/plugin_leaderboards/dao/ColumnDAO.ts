import { DataManager } from "../../core/dataManager";
import { Column } from "../models";

export namespace ColumnDAO {
	export async function getLeaderboardColumns(leaderboardId: number): Promise<Column[]> {
		let query = `SELECT * FROM leaderboard_columns WHERE leaderboard_id = $1`;
		let params = [leaderboardId];

		return await DataManager.query(query, params) as Column[];
	}

	export async function getLeaderboardColumn(leaderboardId: number, columnName: string): Promise<Column> | null {
		let query = `SELECT * FROM leaderboard_columns WHERE leaderboard_id = $1 AND name = $2`;
		let params = [leaderboardId, columnName];

		const columnResult = await DataManager.query(query, params) as Column[];
		if (columnResult.length > 0) {
			return columnResult[0];
		} else {
			return null;
		}
	}

	export async function insertLeaderboardColumn(leaderboardId: number, name: string, type: string): Promise<void> {
		let query = `INSERT INTO leaderboard_columns VALUES (DEFAULT, $1, $2, $3)`;
		let params = [leaderboardId, name, type];

		await DataManager.query(query, params);
		return;
	}

	export async function updateLeaderboardColumnName(leaderboardId: number, id: number, name: string): Promise<void> {
		let query = `UPDATE leaderboard_columns SET name = ($3) WHERE leaderboard_id = ($1) AND id = ($2)`;
		let params = [leaderboardId, id, name];

		await DataManager.query(query, params);
		return;	
	}

	export async function updateLeaderboardColumnType(leaderboardId: number, id: number, type: string): Promise<void> {
		let query = `UPDATE leaderboard_columns SET type = ($3) WHERE leaderboard_id = ($1) AND id = ($2)`;
		let params = [leaderboardId, id, type];

		await DataManager.query(query, params);
		return;
	}

	export async function deleteLeaderboardColumns(leaderboardId: number): Promise<void> {
		let query = `DELETE FROM leaderboard_columns WHERE leaderboard_id = ($1)`;
		let params = [leaderboardId];

		await DataManager.query(query, params);
		return;
	}

	export async function deleteLeaderboardColumn(leaderboardId: number, id: number): Promise<void> {
		let query = `DELETE FROM leaderboard_columns WHERE leaderboard_id = ($1) AND id = ($2)`;
		let params = [leaderboardId, id];

		await DataManager.query(query, params);
		return;
	}
}
