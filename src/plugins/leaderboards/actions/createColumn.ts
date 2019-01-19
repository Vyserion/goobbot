import { IActionHandlerStrategy, ColumnTypes } from "../config";
import { TCommand } from "../../../core/typings";
import { commandHasCorrectArgumentLength, columnExists } from "../util/validators";
import { getLeaderboard } from "../dao/leaderboards";
import { createColumn } from "../dao/columns";
import logger from "../../../core/util/logger";

export class CreateColumnHandler implements IActionHandlerStrategy {
    private readonly command: TCommand;

    constructor(command: TCommand) {
        this.command = command;
    }

    async handleAction(): Promise<string> {
        const correctArguments = commandHasCorrectArgumentLength(this.command, 2);
        if (!correctArguments) {
            return "No leaderboard or column name was provided.";
        }

        const leaderboardName = this.command.arguments[0];
        const leaderboard = await getLeaderboard(leaderboardName);
        if (!leaderboard) {
            return `A leaderboard with the name ${leaderboardName} was not found.`;
        }

        const columnName = this.command.arguments[1];
        const exists = await columnExists(columnName, leaderboard.id);
        if (exists) {
            return `A column with the name ${columnName} already for exists for leaderboard ${leaderboardName}.`;
        }

        let columnType = ColumnTypes.DATA;
        if (this.command.arguments.length > 2) {
            const columnTypeStr = this.command.arguments[2].toUpperCase();
            const validColumnType = ColumnTypes[columnTypeStr];
            if (!validColumnType) {
                return `The column type ${columnTypeStr} is invalid.`;
            }
            columnType = validColumnType;
        }

        await createColumn(columnName, columnType, leaderboard.id);
        logger.info(`Successfully created column ${columnName} in leaderboard ${leaderboardName}`);
        return `Successfully created leaderboard column ${columnName}.`;
    }
}