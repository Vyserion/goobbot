import { execQuery } from "../../../core/util/dataManager";
import { TColumn } from "../typings";

export async function getColumn(columnName: string, leaderboardId: number): Promise<TColumn> {
    const query = `SELECT * FROM columns WHERE name = $1 AND leaderboard_id = $2;`;
    const params = [ columnName, leaderboardId ];

    const result: TColumn[] = await execQuery(query, params);
    if (result.length > 0) {
        return result[0];
    } else {
        return null;
    }
}

export async function getColumns(leaderboardId: number): Promise<TColumn[]> {
    const query = `SELECT * FROM leaderboard_columns WHERE leaderboard_id = $1`;
    const params = [ leaderboardId ];

    const result: TColumn[] = await execQuery(query, params);
    return result;
}

export async function createColumn(name: string, type: string, leaderboardId: number): Promise<void> {
    const query = `INSERT INTO leaderboard_columns VALUES (DEFAULT, $1, $2, $3)`;;
    const params = [ leaderboardId, name, type ];

    await execQuery(query, params);
}

export async function updateColumnName(name: string, columnId: number, leaderboardId: number): Promise<void> {
    const query = `UPDATE leaderboard_columns SET name = ($3) WHERE leaderboard_id = ($1) AND id = ($2)`;
    const params = [ leaderboardId, columnId, name ];

    await execQuery(query, params);
}

export async function updateColumnType(type: string, columnId: number, leaderboardId: number): Promise<void> {
    const query = `UPDATE leaderboard_columns SET type = ($3) WHERE leaderboard_id = ($1) AND id = ($2)`;
    const params = [ leaderboardId, columnId, type ];

    await execQuery(query, params);
}

export async function deleteColumn(leaderboardId: number, columnId: number): Promise<void> {
    const query = `DELETE FROM leaderboard_columns WHERE leaderboard_id = ($1) AND id = ($2)`;
    const params = [ leaderboardId, columnId ];

    await execQuery(query, params);
}

export async function deleteColumns(leaderboardId: number): Promise<void> {
    const query = `DELETE FROM leaderboard_columns WHERE leaderboard_id = ($1)`;
    const params = [leaderboardId];

    await execQuery(query, params);
}