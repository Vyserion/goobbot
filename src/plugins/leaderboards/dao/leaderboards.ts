import { TLeaderboard } from "../typings";
import { execQuery } from "../../../core/util/dataManager";

export namespace Leaderboards {
	export async function getLeaderboards(guildId: number): Promise<TLeaderboard[]> {
		const query = `SELECT * FROM leaderboards WHERE guild_id = $1`;
		const params = [guildId];

		const results = await execQuery(query, params);
		return results;
	}

	export async function getLeaderboard(name: string, guildId: number): Promise<TLeaderboard> {
		const query = `SELECT * FROM leaderboards WHERE guild_id = $1 AND name = $2`;
		const params = [guildId, name];

		const result: TLeaderboard[] = await execQuery(query, params);
		if (result.length > 0) {
			return result[0];
		} else {
			return null;
		}
	}

	export async function createLeaderboard(name: string, guildId: number): Promise<void> {
		const query = `INSERT INTO leaderboards VALUES (DEFAULT, $1, $2)`;
		const params = [guildId, name];

		await execQuery(query, params);
	}

	export async function updateLeaderboard(guildId: number, name: string, newName: string): Promise<void> {
		const query = `UPDATE leaderboards SET name = ($1) WHERE guild_id = $2 AND name LIKE ($3)`;
		const params = [newName, guildId, name];

		await execQuery(query, params);
	}

	export async function deleteLeaderboard(id: number): Promise<void> {
		const query = `DELETE FROM leaderboards WHERE id = ($1)`;
		const params = [id];

		await execQuery(query, params);
	}
}
