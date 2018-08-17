import { DataManager } from "../../core/dataManager";
import logger from "../../core/logger";

export namespace RowDAO {
	export async function getLeaderboardRows(leaderboardId: number) {
		let query = ` SELECT * FROM leaderboard_rows WHERE leaderboard_id = $1`;
		let params = [leaderboardId];

		try {
			let results: any[] = await DataManager.query(query, params);
			return results;
		} catch (e) {
			logger.error("Unexpected error when inserting leaderboard row");
			logger.error(e);
			return;
		}
	}

	export async function getLeaderboardRow(leaderboardId: number, rowName: string) {
		let query = ` SELECT * FROM leaderboard_rows WHERE leaderboard_id = $1 AND name = $2`;
		let params = [leaderboardId, rowName];

		try {
			let results: any[] = await DataManager.query(query, params);
			return results;
		} catch (e) {
			logger.error("Unexpected error when inserting leaderboard row");
			logger.error(e);
			return;
		}
	}

	export async function insertLeaderboardRow(leaderboardId: number, rowName: string) {
		let query = ` INSERT INTO leaderboard_rows VALUES (DEFAULT, $1, $2)`;
		let params = [leaderboardId, rowName];
		logger.warn(params);

		try {
			let results: any[] = await DataManager.query(query, params);
			return results;
		} catch (e) {
			logger.error("Unexpected error when inserting leaderboard row");
			logger.error(e);
			return;
		}
	}

	export async function updateLeaderboardRow(leaderboardRowId: number, newRowName: string) {
		let query = ` UPDATE leaderboard_rows SET name = ($2) WHERE ID = ($1)`;
		let params = [leaderboardRowId, newRowName];

		try {
			let results: any[] = await DataManager.query(query, params);
			return results;
		} catch (e) {
			logger.error("Unexpected error when updating leaderboard row");
			logger.error(e);
			return;
		}
	}

	export async function deleteLeaderboardRows(leaderboardId: number) {
		const query = ` DELETE FROM leaderboard_rows WHERE leaderboard_id = ($1)`;
		const params = [leaderboardId];

		try {
			let results: any[] = await DataManager.query(query, params);
			return results;
		} catch (e) {
			logger.error("Unexpected error when updating leaderboard row");
			logger.error(e);
			return;
		}
	}

	export async function deleteLeaderboardRow(leaderboardRowId: number) {
		const query = ` DELETE FROM leaderboard_rows WHERE id = ($1)`;
		const params = [leaderboardRowId];

		try {
			let results: any[] = await DataManager.query(query, params);
			return results;
		} catch (e) {
			logger.error("Unexpected error when updating leaderboard row");
			logger.error(e);
			return;
		}
	}
}
