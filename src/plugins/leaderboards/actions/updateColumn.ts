import { ActionHandlerStrategy, ColumnTypes } from "../config";
import { TCommand } from "../../../core/typings";
import { commandHasCorrectArgumentLength, columnExists } from "../util/validators";
import { getLeaderboard } from "../dao/leaderboards";
import { getColumn, updateColumnName, updateColumnType } from "../dao/columns";
import { TColumn, TLeaderboard } from "../typings";
import { getGuildId } from "../../../core/guilds/guilds";
import logger from "../../../core/util/logger";

export enum UpdateActions {
	NAME = "NAME",
	TYPE = "TYPE"
}

export class UpdateColumnHandler implements ActionHandlerStrategy {
	private readonly command: TCommand;

	constructor(command: TCommand) {
		this.command = command;
	}

	async handleAction(): Promise<string> {
		const correctArguments = commandHasCorrectArgumentLength(this.command, 4);
		if (!correctArguments) {
			return `Not enough details - please check your command.`;
		}

		const guildId = await getGuildId(this.command.originalMessage.guild);
		const leaderboardName = this.command.arguments[0];
		const leaderboard = await getLeaderboard(leaderboardName, guildId);
		if (!leaderboard) {
			return `A leaderboard with the name ${leaderboardName} was not found.`;
		}

		const columnName = this.command.arguments[1];
		const column = await getColumn(columnName, leaderboard.id);
		if (!column) {
			return `A column with the name ${columnName} for leaderboard ${leaderboardName} was not found.`;
		}

		const action = this.command.arguments[2].toUpperCase();
		const validAction = UpdateActions[action];
		if (!validAction) {
			return `Changing the ${action.toLowerCase()} cannot be done on this column.`;
		}

		if (validAction === UpdateActions.NAME) {
			return this.changeName(column, leaderboard);
		}
		return this.changeType(column, leaderboard);
	}

	async changeName(column: TColumn, leaderboard: TLeaderboard): Promise<string> {
		const newName = this.command.arguments[3];

		const exists = await columnExists(newName, leaderboard.id);
		if (exists) {
			return `A column with the name ${newName} already exists for leaderboard ${leaderboard.name}`;
		}

		await updateColumnName(newName, column.id, leaderboard.id);
		logger.info(`Successfully updated leaderboard column ${column.name}`);
		return `Successfully changed column ${column.name} to ${newName}`;
	}

	async changeType(column: TColumn, leaderboard: TLeaderboard): Promise<string> {
		const newType = this.command.arguments[3];
		const validColumnType: ColumnTypes = ColumnTypes[newType];
		if (!validColumnType) {
			return `The column type ${newType} is invalid.`;
		}

		await updateColumnType(validColumnType, column.id, leaderboard.id);
		logger.info(`Successfully updated leaderboard column ${column.name}`);
		return `Successfully changed column ${column.name}'s type to ${newType}`;
	}
}
