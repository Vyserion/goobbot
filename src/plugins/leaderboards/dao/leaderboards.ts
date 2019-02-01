import { TLeaderboard } from "../typings";
import { execQuery } from "../../../core/util/dataManager";

export namespace Leaderboards {
	export async function getLeaderboards(): Promise<TLeaderboard[]> {
		const query = `SELECT * FROM leaderboards`;
		const results = await execQuery(query);
		return results;
	}

	export async function getLeaderboard(name: string): Promise<TLeaderboard> {
		const query = `SELECT * FROM leaderboards WHERE name = $1`;
		const params = [name];

		const result: TLeaderboard[] = await execQuery(query, params);
		if (result.length > 0) {
			return result[0];
		} else {
			return null;
		}
	}

	export async function createLeaderboard(name: string): Promise<void> {
		const query = `INSERT INTO leaderboards VALUES (DEFAULT, $1)`;
		const params = [name];

		await execQuery(query, params);
	}

	export async function updateLeaderboard(name: string, newName: string): Promise<void> {
		const query = `UPDATE leaderboards SET name = ($1) WHERE name LIKE ($2)`;
		const params = [newName, name];

		await execQuery(query, params);
	}

	export async function deleteLeaderboard(id: number): Promise<void> {
		const query = `DELETE FROM leaderboards WHERE id = ($1)`;
		const params = [id];

		await execQuery(query, params);
	}
}
