import { IActionHandlerStrategy } from "../config";
import { TCommand } from "../../../core/typings";
import { commandHasCorrectArgumentLength, rowExists } from "../util/validators";
import { Leaderboards } from "../dao/leaderboards";
import { Rows } from "../dao/rows";
import logger from "../../../core/util/logger";
import { getGuildId } from "../../../util/guilds";

export class UpdateRowHandler implements IActionHandlerStrategy {
	private readonly command: TCommand;

	constructor(command: TCommand) {
		this.command = command;
	}

	async handleAction(): Promise<string> {
		const correctArguments = commandHasCorrectArgumentLength(this.command, 3);
		if (!correctArguments) {
			return `Not enough details - please check your command.`;
		}

		const guildId = await getGuildId(this.command.originalMessage.guild);
		const leaderboardName = this.command.arguments[0];
		const leaderboard = await Leaderboards.getLeaderboard(leaderboardName, guildId);
		if (!leaderboard) {
			return `A leaderboard with the name ${leaderboardName} was not found.`;
		}

		const rowName = this.command.arguments[1];
		const row = await Rows.getRow(rowName, leaderboard.id);
		if (!row) {
			return `A row with the name ${rowName} for leaderboard ${leaderboardName} was not found.`;
		}

		const newName = this.command.arguments[2];
		const exists = await rowExists(newName, leaderboard.id);
		if (exists) {
			return `A row with the name ${newName} for leaderboard ${leaderboardName} already exists.`;
		}

		await Rows.updateRowName(row.id, newName);
		logger.info(`Successfully updated row ${rowName} to ${newName}`);
		return `Successfully updated row ${rowName}.`;
	}
}
