import { execQuery } from "../../../core/util/dataManager";
import { TRow } from "../typings";

export namespace Rows {
    export async function getRow(rowName: string, leaderboardId: number): Promise<TRow> {
        const query = `SELECT * FROM rows WHERE name = $1 and leaderboard_id = $2`;
        const params = [ rowName, leaderboardId ];
    
        const result: TRow[] = await execQuery(query, params);
        if (result.length > 0) {
            return result[0];
        } else {
            return null;
        }
    }
    
    export async function getRows(leaderboardId: number): Promise<TRow[]> {
        const query = `SELECT * FROM leaderboard_rows WHERE leaderboard_id = $1`;
        const params = [ leaderboardId ];
        
        const result: TRow[] = await execQuery(query, params);
        return result;
    }
    
    export async function createRow(name: string, leaderboardId: number): Promise<void> {
        const query = `INSERT INTO leaderboard_rows VALUES (DEFAULT, $1, $2)`;
        const params = [ leaderboardId, name ];
    
        await execQuery(query, params);
    }
    
    export async function updateRowName(rowId: number, newName: string): Promise<void> {
        const query = `UPDATE leaderboard_rows SET name = ($2) WHERE ID = ($1);`;
        const params = [ rowId, newName ];
    
        await execQuery(query, params);
    }
    
    export async function deleteRows(leaderboardId: number): Promise<void> {
        const query = `DELETE FROM leaderboard_rows WHERE leaderboard_id = ($1)`;
        const params = [ leaderboardId ];
    
        await execQuery(query, params);
    }
    
    export async function deleteRow(rowId: number): Promise<void> {
        const query = `DELETE FROM leaderboard_rows WHERE leaderboard_row_id = ($1)`;
        const params = [ rowId ];
    
        await execQuery(query, params);
    }
}