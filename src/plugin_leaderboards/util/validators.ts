import { TCommand } from "../../new_core/command";
import { LeaderboardDAO, ColumnDAO, RowDAO } from "../dao";

export async function commandHasCorrectArgumentsLength(command: TCommand, min: number, max?: number): Promise<boolean> {
	if (max) {
		return min < command.arguments.length && command.arguments.length < max;
	} else {
		return command.arguments.length === min;
	}
}

export async function getLeaderboardId(leaderboardName: string): Promise<number> {
	const leaderboard = await LeaderboardDAO.getLeaderboard(leaderboardName);
	if (leaderboard) {
		return leaderboard.id;
	} else {
		return -1;
	}
}

export async function getColumnId(leaderboardId: number, columnName: string): Promise<number> {
	const column = await ColumnDAO.getLeaderboardColumn(leaderboardId, columnName);
	if (column) {
		return column.id;
	} else {
		return -1;
	}
}

export async function getRowId(leaderboardId: number, rowName: string): Promise<number> {
	const row = await RowDAO.getLeaderboardRow(leaderboardId, rowName);
	if (row) {
		return row.id;
	} else {
		return -1;
	}
}
