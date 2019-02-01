import { TCommand } from "../../../core/typings";
import { Leaderboards } from "../dao/leaderboards";
import { Columns } from "../dao/columns";
import { Rows } from "../dao/rows";

export function commandHasCorrectArgumentLength(command: TCommand, min: number, max?: number): boolean {
	if (max) {
		return min <= command.arguments.length && command.arguments.length <= max;
	} else {
		return command.arguments.length >= min;
	}
}

export async function leaderboardExists(leaderboardName: string): Promise<boolean> {
	const leaderboardExists = await Leaderboards.getLeaderboard(leaderboardName);
	return !!leaderboardExists;
}

export async function columnExists(columnName: string, leaderboardId: number): Promise<boolean> {
	const columnExists = await Columns.getColumn(columnName, leaderboardId);
	return !!columnExists;
}

export async function rowExists(rowName: string, leaderboardId: number): Promise<boolean> {
	const rowExists = await Rows.getRow(rowName, leaderboardId);
	return !!rowExists;
}
