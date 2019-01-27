import { IActionHandlerStrategy } from "../config";
import { TCommand } from "../../../core/typings";
import { commandHasCorrectArgumentLength } from "../util/validators";
import { Leaderboards } from "../dao/leaderboards";
import { Rows } from "../dao/rows";
import { Values } from "../dao/values";

export class DeleteRowHandler implements IActionHandlerStrategy {
    private readonly command: TCommand;

    constructor(command: TCommand) {
        this.command = command;
    }

    async handleAction(): Promise<string> {
        const correctArguments = commandHasCorrectArgumentLength(this.command, 2);
        if (!correctArguments) {
            return "No leaderboard or row name was provided.";
        }

        const leaderboardName = this.command.arguments[0];
        const leaderboard = await Leaderboards.getLeaderboard(leaderboardName);
        if (!leaderboard) {
            return `A leaderboard with the name ${leaderboardName} was not found.`;
        }

        const rowName = this.command.arguments[1];
        const row = await Rows.getRow(rowName, leaderboard.id);
        if (!row) {
            return `A row with the name ${rowName} for the leaderboard ${leaderboardName} was not found.`;
        }

        await Values.deleteValuesByRow(row.id);
        await Rows.deleteRow(row.id);
        return `Successfully removed row ${rowName}.`;
    }
}