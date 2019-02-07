import { TList } from "../typings/lists";
import { execQuery } from "../../../core/util/dataManager";

export namespace Lists { 
    export async function getList(guildId: number, name: string): Promise<TList[]> {
        const query = `SELECT id, name FROM lists WHERE guild_id = $1 AND name = $2`;
        const params = [ guildId, name ];

        const results = await execQuery(query, params);
        return results;
    }

    export async function createList(guildId: number, name: string): Promise<void> {
        const query = `INSERT INTO lists VALUES (DEFAULT, $1, $2)`;
        const params = [ guildId, name ];

        await execQuery(query, params);
    }
}