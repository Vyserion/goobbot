import { getList } from "../dao/lists";

/**
 * Checks if a list exists.
 * @param listName The list name to check
 * @param guildId The guild id the list should belong to
 * 
 * @returns True if the list exists, false otherwise
 */
export async function listExists(listName: string, guildId: number): Promise<boolean> {
	const listExists = await getList(guildId, listName);
	return !!listExists;
}
