import { DataManager } from '../core/dataManager';

export const insertLeaderboard = async (name: string) => {
    let query = ` INSERT INTO leaderboards VALUES (DEFAULT, $1)`;
    let params = [name];

    console.log(params);

    let results = await DataManager.query(query, params);
    console.log(results);
    return results;
}