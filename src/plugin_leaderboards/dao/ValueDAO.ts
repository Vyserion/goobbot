import { DataManager } from '../../core/dataManager';
import logger from '../../core/logger';

export namespace ValueDAO {

    export async function upsertValue(leaderboardColumnId: number, leaderboardRowId: number, value: any) {
        const query = ` INSERT INTO leaderboard_values VALUES (DEFAULT, $1, $2, $3) ON CONFLICT (leaderboard_col_id, leaderboard_row_id) DO UPDATE SET value = $3`;
        const params = [leaderboardColumnId, leaderboardRowId, value];

        try {
            let results: any[] = await DataManager.query(query, params);
            return results;
        } catch (e) {
            logger.error('Unexpected error when updating leaderboard row');
            logger.error(e);
            return;
        }
    }

    export async function deleteValuesByRow(leaderboardRowId: number) {
        const query = 'DELETE FROM leaderboard_values WHERE leaderboard_row_id = (?)';
        const params = [leaderboardRowId];

        try {
            let results: any[] = await DataManager.query(query, params);
            return results;
        } catch (e) {
            logger.error('Unexpected error when deleting values by leaderboard row');
            logger.error(e);
            return;
        }
    }

    export async function deleteValuesByColumn(leaderboardColumnId: number) {
        const query = 'DELETE FROM leaderboard_values WHERE leaderboard_col_id = (?)';
        const params = [leaderboardColumnId];

        try {
            let results: any[] = await DataManager.query(query, params);
            return results;
        } catch (e) {
            logger.error('Unexpected error when deleting values by leaderboard row');
            logger.error(e);
            return;
        }
    }

    export async function deleteValueByLeaderboard(leaderboardId: number) {
        const query = `DELETE FROM leaderboard_values
        WHERE leaderboard_col_id IN (SELECT id FROM leaderboard_columns WHERE leaderboard_id = ?)
        AND leaderboard_row_id IN (SELECT id FROM leaderboard_rows WHERE leaderboard_id = ?)`;
        const params = [leaderboardId, leaderboardId];

        try {
            let results: any[] = await DataManager.query(query, params);
            return results;
        } catch (e) {
            logger.error('Unexpected error when deleting values by leaderboard row');
            logger.error(e);
            return;
        }
    }
}