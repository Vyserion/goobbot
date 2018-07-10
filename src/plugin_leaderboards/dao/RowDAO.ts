import { DataManager } from '../../core/dataManager';
import logger from '../../core/logger';

export namespace RowDAO {

    export async function getLeaderboardRow(leaderboardId: number, rowName: string) {
        let query = ` SELECT * FROM leaderboard_rows WHERE leaderboard_id = $1 AND name = $2`;
        let params = [leaderboardId, rowName];

        try {
            let results: any[] = await DataManager.query(query, params);
            return results;
        } catch (e) {
            logger.error('Unexpected error when inserting leaderboard row');
            logger.error(e);
            return;
        }
    }

    export async function insertLeaderboardRow(leaderboardId: number, rowName: string) {
        let query = ` INSERT INTO leaderboard_rows VALUES (DEFAULT, $1, $2)`;
        let params = [leaderboardId, rowName];

        try {
            let results: any[] = await DataManager.query(query, params);
            return results;
        } catch (e) {
            logger.error('Unexpected error when inserting leaderboard row');
            logger.error(e);
            return;
        }
    }

}