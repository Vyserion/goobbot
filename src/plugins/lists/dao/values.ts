import { execQuery } from "../../../core/util/dataManager";

export namespace Values {
    export async function addValue(listId: number, value: string): Promise<void> {
        const query = `INSERT INTO list_value VALUES (DEFAULT, $1, $2)`;
        const params = [ listId, value ];

        await execQuery(query, params);
    }
}