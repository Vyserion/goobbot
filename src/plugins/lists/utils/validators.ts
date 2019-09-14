import { Lists } from "../dao/lists";

export async function listExists(listName: string, guildId: number): Promise<boolean> {
	const listExists = await Lists.getList(guildId, listName);
	return !!listExists;
}
