import { ActionHandlerStrategy, ColumnTypes } from "../config";
import { TCommand } from "../../../core/typings";
import { commandHasCorrectArgumentLength, columnExists } from "../util/validators";
import { getLeaderboard } from "../dao/leaderboards";
import { createColumn } from "../dao/columns";
import logger from "../../../core/util/logger";
import { getGuildId } from "../../../core/guilds/guilds";

export class CreateColumnHandler implements ActionHandlerStrategy {
	private readonly command: TCommand;

	constructor(command: TCommand) {
		this.command = command;
	}

	async handleAction(): Promise<string> {
		const correctArguments = commandHasCorrectArgumentLength(this.command, 2, 3);
		if (!correctArguments) {
			if (this.command.arguments.length < 3) {
				return "No leaderboard or column name was provided.";
			}
			return "Too many arguments provided.";
		}

		const guildId = await getGuildId(this.command.originalMessage.guild);
		const leaderboardName = this.command.arguments[0];
		const leaderboard = await getLeaderboard(leaderboardName, guildId);
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
