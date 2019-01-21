import { IActionHandlerStrategy } from "../config";
import { TCommand } from "../../../core/typings";
import { commandHasCorrectArgumentLength } from "../util/validators";
import { getLeaderboard } from "../dao/leaderboards";
import { getColumn } from "../dao/columns";
import { getRow } from "../dao/rows";
import { upsertValue } from "../dao/values";
import logger from "../../../core/util/logger";

export class UpdateValueHandler implements IActionHandlerStrategy {
    private readonly command: TCommand;

    constructor(command: TCommand) {
        this.command = command;
    }

    async handleAction(): Promise<string> {
        const correctArguments = commandHasCorrectArgumentLength(this.command, 4);
        if (!correctArguments) {
            return "Not enough parameters provided - please check your command.";
        }

        const leaderboardName = this.command.arguments[0];
        const leaderboard = await getLeaderboard(leaderboardName);
        if (!leaderboard) {
            return `A leaderboard with the name ${leaderboardName} was not found.`;
        }

        const columnName = this.command.arguments[1];
        const column = await getColumn(columnName, leaderboard.id);
        if (!column) {
            return `A column with the with name ${columnName} does not exists for leaderboard ${leaderboardName}.`;
        }

        const rowName = this.command.arguments[2];
        const row = await getRow(rowName, leaderboard.id);
        if (!row) {
            return `A row with the name ${rowName} does not exist for leaderboard ${leaderboardName}.`;
        }

        const value = this.command.arguments[4];

        await upsertValue(column.id, row.id, value);
        logger.info(`Successfully upserted value in ${leaderboardName}`);
        return `Successfully updated the value.`;
    }
}