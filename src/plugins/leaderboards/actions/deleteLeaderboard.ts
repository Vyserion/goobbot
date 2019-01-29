import { IActionHandlerStrategy } from "../config";
import { TCommand } from "../../../core/typings";
import { commandHasCorrectArgumentLength } from "../util/validators";
import { Values } from "../dao/values";
import { Leaderboards } from "../dao/leaderboards";
import logger from "../../../core/util/logger";
import { Rows } from "../dao/rows";
import { Columns } from "../dao/columns";

export class DeleteLeaderboardHandler implements IActionHandlerStrategy {
	private readonly command: TCommand;

	constructor(command: TCommand) {
		this.command = command;
	}

	async handleAction(): Promise<string> {
		const correctArguments = commandHasCorrectArgumentLength(this.command, 1);
		if (!correctArguments) {
			return "No names were provided for the leaderboard.";
		}

		const name = this.command.arguments[0];

		const leaderboard = await Leaderboards.getLeaderboard(name);
		if (!leaderboard) {
			return `A leaderboard with the name ${name} could not be found.`;
		}

		await Values.deleteValuesByLeaderboard(leaderboard.id);
		await Rows.deleteRows(leaderboard.id);
		await Columns.deleteColumns(leaderboard.id);
		await Leaderboards.deleteLeaderboard(leaderboard.id);
		logger.info(`Successfully deleted leaderboard ${name}`);
		return `Successfully deleted leaderboard ${name}`;
	}
}
