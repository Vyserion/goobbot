import { execQuery } from "../../../core/util/dataManager";
import { TValue } from "../typings";

export async function getValues(leaderboardId: number): Promise<TValue[]> {
    const query = `SELECT l.id AS leaderboardId, lr.id AS rowid, lc.id AS columnid, lv.value AS value
    FROM leaderboard_values lv
    JOIN leaderboard_rows lr ON lr.id = lv.leaderboard_row_id
    JOIN leaderboard_columns lc ON lc.id = lv.leaderboard_col_id
    JOIN leaderboards l ON l.id = lr.leaderboard_id AND l.id = lc.leaderboard_id
    WHERE l.id = $1;`;
    const params = [ leaderboardId ];

    const results: TValue[] = await execQuery(query, params);
    return results;
}

export async function deleteValuesByLeaderboard(leaderboardId: number): Promise<void> {
    const query = `DELETE FROM leaderboard_values
    WHERE leaderboard_col_id IN (SELECT id FROM leaderboard_columns WHERE leaderboard_id = ?)
    AND leaderboard_row_id IN (SELECT id FROM leaderboard_rows WHERE leaderboard_id = ?)`;
    const params = [ leaderboardId, leaderboardId ];

    await execQuery(query, params);
}

export async function deleteValuesByColumn(columnId: number): Promise<void> {
    const query = `DELETE FROM leaderboard_values WHERE leaderboard_col_id = (?)`;
    const params = [ columnId ];

    await execQuery(query, params);
}