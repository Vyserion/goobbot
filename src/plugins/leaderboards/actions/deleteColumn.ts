import { IActionHandlerStrategy } from "../config";
import { TCommand } from "../../../core/typings";
import { commandHasCorrectArgumentLength } from "../util/validators";
import { Leaderboards } from "../dao/leaderboards";
import { Columns } from "../dao/columns";
import { Values } from "../dao/values";

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

		const leaderboardName = this.command.arguments[0];
		const leaderboard = await Leaderboards.getLeaderboard(leaderboardName);
		if (!leaderboard) {
			return `A leaderboard with the name ${leaderboardName} was not found.`;
		}

		const columnName = this.command.arguments[1];
		const column = await Columns.getColumn(columnName, leaderboard.id);
		if (!column) {
			return `A column with the name ${columnName} was not found for leaderboard ${leaderboardName}.`;
		}

		await Values.deleteValuesByColumn(column.id);
		await Columns.deleteColumn(leaderboard.id, column.id);
		return `Succesfully removed column ${columnName}.`;
	}
}
