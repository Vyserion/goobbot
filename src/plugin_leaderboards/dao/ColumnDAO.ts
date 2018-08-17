import { DataManager } from "../../core/dataManager";
import logger from "../../core/logger";

export namespace ColumnDAO {
	export async function getLeaderboardColumns(leaderboardId: number) {
		let query = ` SELECT * FROM leaderboard_columns WHERE leaderboard_id = $1`;
		let params = [leaderboardId];

		try {
			let results: any[] = await DataManager.query(query, params);
			return results;
		} catch (e) {
			logger.error("Unexpected error when getting leaderboard");
			logger.error(e);
			return;
		}
	}

	export async function getLeaderboardColumn(leaderboardId: number, columnName: string) {
		let query = ` SELECT * FROM leaderboard_columns WHERE leaderboard_id = $1 AND name = $2`;
		let params = [leaderboardId, columnName];

		try {
			let results: any[] = await DataManager.query(query, params);
			return results;
		} catch (e) {
			logger.error("Unexpected error when getting leaderboard");
			logger.error(e);
			return;
		}
	}

	export async function insertLeaderboardColumn(leaderboardId: number, name: string, type: string) {
		let query = " INSERT INTO leaderboard_columns VALUES (DEFAULT, $1, $2, $3)";
		let params = [leaderboardId, name, type];

		try {
			let results: any[] = await DataManager.query(query, params);
			return results;
		} catch (e) {
			logger.error("Unexpected error when inserting leaderboard column");
			logger.error(e);
			return;
		}
	}

	export async function updateLeaderboardColumnName(leaderboardId: number, id: number, name: string) {
		let query = ` UPDATE leaderboard_columns SET name = ($3) WHERE leaderboard_id = ($1) AND id = ($2)`;
		let params = [leaderboardId, id, name];

		try {
			let results: any[] = await DataManager.query(query, params);
			return results;
		} catch (e) {
			logger.error("Unexpected error when updating leaderboard column");
			logger.error(e);
			return;
		}
	}

	export async function updateLeaderboardColumnType(leaderboardId: number, id: number, type: string) {
		let query = ` UPDATE leaderboard_columns SET type = ($3) WHERE leaderboard_id = ($1) AND id = ($2)`;
		let params = [leaderboardId, id, type];

		try {
			let results: any[] = await DataManager.query(query, params);
			return results;
		} catch (e) {
			logger.error("Unexpected error when updating leaderboard column");
			logger.error(e);
			return;
		}
	}

	export async function deleteLeaderboardColumns(leaderboardId: number) {
		let query = ` DELETE FROM leaderboard_columns WHERE leaderboard_id = ($1)`;
		let params = [leaderboardId];

		try {
			let results: any[] = await DataManager.query(query, params);
			return results;
		} catch (e) {
			logger.error("Unexpected error when deleting leaderboard columns");
			logger.error(e);
			return;
		}
	}

	export async function deleteLeaderboardColumn(leaderboardId: number, id: number) {
		let query = ` DELETE FROM leaderboard_columns WHERE leaderboard_id = ($1) AND id = ($2)`;
		let params = [leaderboardId, id];

		try {
			let results: any[] = await DataManager.query(query, params);
			return results;
		} catch (e) {
			logger.error("Unexpected error when deleting leaderboard column");
			logger.error(e);
			return;
		}
	}
}
