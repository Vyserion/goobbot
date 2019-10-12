import { execQuery } from "../../../core/util/dataManager";
import { TValue } from "../typings/lists";

/**
 * Gets a list of values for the given list.
 * @param listId The list to get the values of
 * 
 * @returns The list of values
 */
export async function getValues(listId: number): Promise<TValue[]> {
	const query = `SELECT id, list_id, value FROM list_value WHERE list_id = $1`;
	const params = [listId];

	const result = await execQuery<TValue>(query, params);
	return result;
}

/**
 * Gets a single value from a given list, if it exists.
 * @param listId The list to check the value for
 * @param value The value to check
 * 
 * @returns The value if found, null otherwise
 */
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

/**
 * Adds a value to the given list.
 * @param listId The list to add the value to
 * @param value The value to add
 */
export async function addValue(listId: number, value: string): Promise<void> {
	const query = `INSERT INTO list_value VALUES (DEFAULT, $1, $2)`;
	const params = [listId, value];

	await execQuery(query, params);
}

/**
 * Removes a value from the given list
 * @param listId The list to remove the value from
 * @param valueId The value to be removed
 */
export async function removeValue(listId: number, valueId: number): Promise<void> {
	const query = `DELETE FROM list_value WHERE list_id = $1 AND id = $2`;
	const params = [listId, valueId];

	await execQuery(query, params);
}
