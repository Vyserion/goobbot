import { DataManager } from '../core/dataManager';
import logger from '../core/logger';

export const insertLeaderboard = async (name: string) => {
    let query = ` INSERT INTO leaderboards VALUES (DEFAULT, $1)`;
    let params = [name];

    logger.debug('Running query:');
    logger.debug(query);
    
    try {
        let results = await DataManager.query(query, params);
        return results;
    } catch (e) {
        logger.error('Unexpected error when inserting leaderboard');
        logger.error(e);
        return;
    }
}

export const getLeaderboard = async (name: string) => {
    let query = ` SELECT * FROM leaderboards WHERE name = $1`;
    let params = [name];

    logger.debug('Running query');
    logger.debug(query);

    try {
        let results = await DataManager.query(query, params);
        return results;
    } catch (e) {
        logger.error('Unexpected error when getting leaderboard');
        logger.error(e);
        return;
    }
}