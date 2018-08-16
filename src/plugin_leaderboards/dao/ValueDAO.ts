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
}