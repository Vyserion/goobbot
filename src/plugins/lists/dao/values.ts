import { execQuery } from "../../../core/util/dataManager";
import { TValue } from "../typings/lists";

export namespace Values {
	export async function getValues(listId: number): Promise<TValue[]> {
		const query = `SELECT id, list_id, value FROM list_value WHERE list_id = $1`;
		const params = [listId];

		const result = await execQuery<TValue>(query, params);
		return result;
	}

	export async function getValue(listId: number, value: string): Promise<TValue> {
		const query = `SELECT id, list_id, value FROM list_value WHERE list_id = $1 AND value LIKE ($2)`;
		const params = [listId, value];

		const results = await execQuery<TValue>(query, params);
		if (results.length > 0) {
			return results[0];
		} else {
			return null;
		}
	}

	export async function addValue(listId: number, value: string): Promise<void> {
		const query = `INSERT INTO list_value VALUES (DEFAULT, $1, $2)`;
		const params = [listId, value];

		await execQuery(query, params);
	}

	export async function removeValue(listId: number, valueId: number) {
		const query = `DELETE FROM list_value WHERE list_id = $1 AND id = $2`;
		const params = [listId, valueId];

		await execQuery(query, params);
	}
}
