import { TCommand } from "../../../core/typings";
import { getLeaderboard } from "../dao/leaderboards";
import { getColumn } from "../dao/columns";
import { getRow } from "../dao/rows";

/**
 * Tests that a provided command has the correct argument length.
 * @param command The command to test
 * @param min The minimum number of arguments
 * @param max The maximum number of arguments
 * 
 * @returns True if correct, false otherwise
 */
export function commandHasCorrectArgumentLength(command: TCommand, min: number, max?: number): boolean {
	if (max) {
		return min <= command.arguments.length && command.arguments.length <= max;
	} else {
		return command.arguments.length >= min;
	}
}

/**
 * Tests that a leaderboard exists for a given guild.
 * @param leaderboardName The leaderboard name
 * @param guildId The guild id
 * 
 * @returns True if the leaderboard is found, false otherwise
 */
export async function leaderboardExists(leaderboardName: string, guildId: number): Promise<boolean> {
	const leaderboardExists = await getLeaderboard(leaderboardName, guildId);
	return !!leaderboardExists;
}

/**
 * Tests that a column exists for a given leaderboard.
 * @param columnName The column name
 * @param leaderboardId The leaderboard id
 * 
 * @returns True if the column is found, false otherwise
 */
export async function columnExists(columnName: string, leaderboardId: number): Promise<boolean> {
	const columnExists = await getColumn(columnName, leaderboardId);
	return !!columnExists;
}

/**
 * Tests that a row exists for a given leaderboard.
 * @param rowName The row name
 * @param leaderboardId The leaderboard id
 * 
 * @returns True if the column is found, false otherwise
 */
export async function rowExists(rowName: string, leaderboardId: number): Promise<boolean> {
	const rowExists = await getRow(rowName, leaderboardId);
	return !!rowExists;
}
