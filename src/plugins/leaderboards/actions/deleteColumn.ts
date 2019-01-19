import { IActionHandlerStrategy } from "../config";
import { TCommand } from "../../../core/typings";
import { commandHasCorrectArgumentLength } from "../util/validators";
import { getLeaderboard } from "../dao/leaderboards";
import { getColumn } from "../dao/columns";
import { deleteValuesByColumn } from "../dao/values";
import { deleteColumn } from "../dao/columns";

export class DeleteColumnHandler implements IActionHandlerStrategy {
    private readonly command: TCommand;

    constructor(command: TCommand) {
        this.command = command;
    }

    async handleAction(): Promise<string> {
        const correctArguments = commandHasCorrectArgumentLength(this.command, 2);
        if (!correctArguments) {
            return "No leaderboard or column name was provided.";
        }

        const leaderboardName = this.command.arguments[1];
        const leaderboard = await getLeaderboard(leaderboardName);
        if (!leaderboard) {
            return `A leaderboard with the name ${leaderboardName} was not found.`;
        }

        const columnName = this.command.arguments[2];
        const column = await getColumn(columnName, leaderboard.id);
        if (!column) {
            return `A column with the name ${columnName} was not found for leaderboard ${leaderboardName}.`;
        }

        await deleteValuesByColumn(column.id);
        await deleteColumn(leaderboard.id, column.id);
        return `Succesfully removed column ${columnName}.`;
    }
}