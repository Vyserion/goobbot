import { TCommand } from "../../../core/typings";
import { getLeaderboard } from "../dao/leaderboards";
import { getColumn } from "../dao/columns";
import { getRow } from "../dao/rows";

export function commandHasCorrectArgumentLength(command: TCommand, min: number, max?: number): boolean {
    if (max) {
        return min < command.arguments.length && command.arguments.length < max;
    } else {
        return command.arguments.length >= min;
    }
}

export async function leaderboardExists(leaderboardName: string): Promise<boolean> {
    const leaderboardExists = await getLeaderboard(leaderboardName);
    return !!leaderboardExists;
}

export async function columnExists(columnName: string, leaderboardId: number): Promise<boolean> {
    const columnExists = await getColumn(columnName, leaderboardId);
    return !!columnExists;
}

export async function rowExists(rowName: string, leaderboardId: number): Promise<boolean> {
    const rowExists = await getRow(rowName, leaderboardId);
    return !!rowExists;
}