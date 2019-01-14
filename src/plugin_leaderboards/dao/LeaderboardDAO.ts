import { execQuery } from "../../core/dataManager";
import { Leaderboard } from "../models";

export namespace LeaderboardDAO {
	export async function getLeaderboards(): Promise<Leaderboard[]> {
		const query = `SELECT * FROM leaderboards`;

		return (await execQuery(query)) as Leaderboard[];
	}

	export async function getLeaderboard(name: string): Promise<Leaderboard> | null {
		let query = `SELECT * FROM leaderboards WHERE name = $1`;
		let params = [name];

		const rowResult: Leaderboard[] = (await execQuery(query, params)) as Leaderboard[];
		if (rowResult.length > 0) {
			return rowResult[0];
		} else {
			return null;
		}
	}

	export async function insertLeaderboard(name: string): Promise<void> {
		let query = `INSERT INTO leaderboards VALUES (DEFAULT, $1)`;
		let params = [name];

		await execQuery(query, params);
		return;
	}

	export async function updateLeaderboard(id: number, name: string): Promise<void> {
		let query = `UPDATE leaderboards SET name = ($1) WHERE id = ($2)`;
		let params = [name, id];

		await execQuery(query, params);
		return;
	}

	export async function deleteLeaderboard(id: number): Promise<void> {
		let query = `DELETE FROM leaderboards WHERE id = ($1)`;
		let params = [id];

		await execQuery(query, params);
		return;
	}
}
