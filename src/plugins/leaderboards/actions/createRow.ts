import { IActionHandlerStrategy } from "../config";
import { TCommand } from "../../../core/typings";
import { commandHasCorrectArgumentLength, rowExists } from "../util/validators";
import { Leaderboards } from "../dao/leaderboards";
import { Rows } from "../dao/rows";
import logger from "../../../core/util/logger";
import { getGuildId } from "../../../util/guilds";

export class CreateRowHandler implements IActionHandlerStrategy {
	private readonly command: TCommand;

	constructor(command: TCommand) {
		this.command = command;
	}

	async handleAction(): Promise<string> {
		const correctArguments = commandHasCorrectArgumentLength(this.command, 2);
		if (!correctArguments) {
			return "No leaderboard or row name was provided.";
		}

		const guildId = await getGuildId(this.command.originalMessage.guild);
		const leaderboardName = this.command.arguments[0];
		const leaderboard = await Leaderboards.getLeaderboard(leaderboardName, guildId);
		if (!leaderboard) {
			return `A leaderboard with the name ${leaderboardName} was not found.`;
		}

		const rowName = this.command.arguments[1];
		const exists = await rowExists(rowName, leaderboard.id);
		if (exists) {
			return `A row with the name ${rowName} already exists for leaderboard ${leaderboardName}.`;
		}

		await Rows.createRow(rowName, leaderboard.id);
		logger.info(`Successfully created column ${rowName} in leaderboard ${leaderboardName}`);
		return `Sucessfully created leaderboard row ${rowName}.`;
	}
}
