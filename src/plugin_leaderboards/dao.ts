import { DataManager } from '../core/dataManager';
import logger from '../core/logger';

export class LeaderboardDAO {

    getLeaderboards = async () => {
        let query = ` SELECT * FROM leaderboards`;

        try {
            let results: any[] = await DataManager.query(query);
            return results;
        } catch (e) {
            logger.error('Unexpected error when inserting leaderboard');
            logger.error(e);
            return;
        }
    }

    getLeaderboard = async (name: string) => {
        let query = ` SELECT * FROM leaderboards WHERE name = ($1)`;
        let params = [name];

        try {
            let results: any[] = await DataManager.query(query, params);
            return results;
        } catch (e) {
            logger.error('Unexpected error when getting leaderboard');
            logger.error(e);
            return;
        }
    }

    getLeaderboardColumns = async (leaderboardId: number) => {
        let query = ` SELECT * FROM leaderboardColumns WHERE leaderboardId = $1`;
        let params = [leaderboardId];

        try {
            let results: any[] = await DataManager.query(query, params);
            return results;
        } catch (e) {
            logger.error('Unexpected error when getting leaderboard');
            logger.error(e);
            return;
        }
    }

    getLeaderboardColumn = async (leaderboardId: number, columnName: string) => {
        let query = ` SELECT * FROM leaderboardColumns WHERE leaderboardId = $1 AND name = $2`;
        let params = [leaderboardId, columnName];

        try {
            let results: any[] = await DataManager.query(query, params);
            return results;
        } catch (e) {
            logger.error('Unexpected error when getting leaderboard');
            logger.error(e);
            return;
        }
    }

    insertLeaderboard = async (name: string) => {
        let query = ` INSERT INTO leaderboards VALUES (DEFAULT, $1)`;
        let params = [name];
        
        try {
            let results: any[] = await DataManager.query(query, params);
            return results;
        } catch (e) {
            logger.error('Unexpected error when inserting leaderboard');
            logger.error(e);
            return;
        }
    }

    insertLeaderboardColumn = async (leaderboardId: number, name: string, type: string) => {
        let query = ' INSERT INTO leaderboardColumns VALUES (DEFAULT, $1, $2, $3)';
        let params = [leaderboardId, name, type];

        try {
            let results: any[] = await DataManager.query(query, params);
            return results;
        } catch (e) {
            logger.error('Unexpected error when inserting leaderboard column');
            logger.error(e);
            return;
        }
    }

    updateLeaderboard = async (id: number, name: string) => {
        let query = ` UPDATE leaderboards SET name = ($1) WHERE id = ($2)`;
        let params = [name, id];
    
        try {
            let results: any[] = await DataManager.query(query, params);
            return results;
        } catch (e) {
            logger.error('Unexpected error when updating leaderboard');
            logger.error(e);
            return;
        }
    }

    deleteLeaderboard = async (id: number) => {
        let query = ` DELETE FROM leaderboards WHERE id = ($1)`;
        let params = [id];
    
        try {
            let results: any[] = await DataManager.query(query, params);
            return results;
        } catch (e) {
            logger.error('Unexpected error when deleting leaderboard');
            logger.error(e);
            return;
        }
    }
}