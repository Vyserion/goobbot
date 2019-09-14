import { TGuild } from "./typings/guilds";
import { execQuery } from "../core/util/dataManager";

export namespace UtilDao {
	export async function getGuild(guildId: string): Promise<TGuild> {
		const query = `SELECT * FROM guilds WHERE discord_id = $1`;
		const params = [guildId];

		const result: TGuild[] = await execQuery(query, params);
		if (result.length > 0) {
			return result[0];
		} else {
			return null;
		}
	}

	export async function createGuild(guildId: string, name: string): Promise<TGuild> {
		const query = `INSERT INTO guilds(id, discord_id, name) VALUES (DEFAULT, $1, $2)`;
		const params = [guildId, name];

		await execQuery(query, params);
		return getGuild(guildId);
	}
}
