import { IActionHandlerStrategy } from "../config";
import { TCommand } from "../../../core/typings";
import { commandHasCorrectArgumentLength } from "../util/validators";
import { Leaderboards } from "../dao/leaderboards";
import { Columns } from "../dao/columns";
import { Rows } from "../dao/rows";
import { getValues } from "../dao/values";
import { TLeaderboard } from "../typings";
import { prettyPrintLeaderboard } from "../util/format";

export class GetLeaderboardHandler implements IActionHandlerStrategy {
    private readonly command: TCommand;

    constructor(command: TCommand) {
        this.command = command;
    }

    async handleAction(): Promise<string> {
        const correctArguments = commandHasCorrectArgumentLength(this.command, 1);
        if (!correctArguments) {
            return "No name was provided.";
        }

        const name = this.command.arguments[0];
        const leaderboard = await Leaderboards.getLeaderboard(name);
        if (!leaderboard) {
            return `A leaderboard with the name ${name} was not found.`;
        }

        const columns = await Columns.getColumns(leaderboard.id);
        const rows = await Rows.getRows(leaderboard.id);
        const values = await getValues(leaderboard.id);

        const filledLeaderboard: TLeaderboard = {
            rows: rows,
            columns: columns,
            values: values,
            ...leaderboard
        };

        return prettyPrintLeaderboard(filledLeaderboard);
    }
}