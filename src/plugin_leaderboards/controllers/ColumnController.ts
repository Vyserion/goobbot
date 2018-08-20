import { ColumnDAO, ValueDAO } from "../dao";
import logger from "../../core/logger";
import { Command } from "../../core/command";
import { ReturnCodes } from "../config/ReturnCodes";
import { UpdateActions } from "../config/UpdateActions";
import { ColumnTypes } from "../config/ColumnTypes";
import { commandHasCorrectArgumentsLength, getLeaderboardId, getColumnId } from "../util/validators";

export namespace ColumnController {
	export async function insertLeaderboardColumn(command: Command): Promise<ReturnCodes> {
		if (commandHasCorrectArgumentsLength(command, 2, 3)) {
			logger.warn(`${ReturnCodes.INCORRECT_PARAM_LENGTH} - Incorrect number of parameters provided`);
			return ReturnCodes.INCORRECT_PARAM_LENGTH;
		}

		const leaderboardName = command.arguments[0];
		const leaderboardId = await getLeaderboardId(leaderboardName);
		if (leaderboardId === -1) {
			logger.warn(`${ReturnCodes.LEADERBOARD_NOT_FOUND} - No leaderboard found for the given name`);
			return ReturnCodes.LEADERBOARD_NOT_FOUND;
		}

		const columnName = command.arguments[1];
		const columnId = await getColumnId(leaderboardId, columnName);
		if (columnId > -1) {
			logger.warn(`${ReturnCodes.LEADERBOARD_DUPLICATE_NAME} - A leaderboard column with that name already exists`);
			return ReturnCodes.LEADERBOARD_DUPLICATE_NAME;
		}

		let columnType: string = ColumnTypes.DATA;
		if (command.arguments.length == 3) {
			const columnTypeStr = command.arguments[2].toUpperCase();
			const validColumnType = ColumnTypes[columnTypeStr];
			if (!validColumnType) {
				logger.warn(`${ReturnCodes.BAD_PARAMETER_TYPE} - The given column type is not valid`);
				return ReturnCodes.BAD_PARAMETER_TYPE;
			}
			columnType = columnTypeStr;
		}

		await ColumnDAO.insertLeaderboardColumn(leaderboardId, columnName, columnType);
		logger.info(`Created new leaderboard column ${leaderboardName}:${columnName}:${columnType}`);
		return ReturnCodes.SUCCESS;
	}

	export async function updateLeaderboardColumn(command: Command): Promise<ReturnCodes> {
		if (commandHasCorrectArgumentsLength(command, 4)) {
			logger.warn(`${ReturnCodes.INCORRECT_PARAM_LENGTH} - Incorrect number of parameters provided`);
			return ReturnCodes.INCORRECT_PARAM_LENGTH;
		}

		const leaderboardName = command.arguments[0];
		const leaderboardId = await getLeaderboardId(leaderboardName);
		if (leaderboardId === -1) {
			logger.warn(`${ReturnCodes.LEADERBOARD_NOT_FOUND} - No leaderboard found for the given name`);
			return ReturnCodes.LEADERBOARD_NOT_FOUND;
		}

		const columnName = command.arguments[1];
		const columnId = await getColumnId(leaderboardId, columnName);
		if (columnId === -1) {
			logger.warn(`${ReturnCodes.LEADERBOARD_DUPLICATE_NAME} - A leaderboard column with that name does not exist`);
			return ReturnCodes.COLUMN_NOT_FOUND;
		}

		const action = command.arguments[2].toUpperCase();
		const validAction = UpdateActions[action];
		if (!validAction) {
			logger.warn(`${ReturnCodes.INVALID_PARAMETER} - The given update action is not valid`);
			return ReturnCodes.INVALID_PARAMETER;
		}

		if (validAction === UpdateActions.TYPE) {
			const columnTypeStr = command.arguments[3].toUpperCase();
			const validColumnType = ColumnTypes[columnTypeStr];
			if (!validColumnType) {
				logger.warn(`${ReturnCodes.BAD_PARAMETER_TYPE} - The given column type is not valid`);
				return ReturnCodes.BAD_PARAMETER_TYPE;
			}

			await ColumnDAO.updateLeaderboardColumnType(leaderboardId, columnId, columnTypeStr);
			logger.info(`Updated leaderboard column ${columnId} to ${columnTypeStr}`);
		} else if (validAction === UpdateActions.NAME) {
			const value = command.arguments[3];

			await ColumnDAO.updateLeaderboardColumnName(leaderboardId, columnId, value);
			logger.info(`Update leaderboard column ${columnId}'s type to ${value}`);
		}

		return ReturnCodes.SUCCESS;
	}

	export async function deleteLeaderboardColumn(command: Command): Promise<ReturnCodes> {
		if (commandHasCorrectArgumentsLength(command, 2)) {
			logger.warn(`${ReturnCodes.INCORRECT_PARAM_LENGTH} - Incorrect number of parameters provided`);
			return ReturnCodes.INCORRECT_PARAM_LENGTH;
		}

		const leaderboardName = command.arguments[0];
		const leaderboardId = await getLeaderboardId(leaderboardName);
		if (leaderboardId === -1) {
			logger.warn(`${ReturnCodes.LEADERBOARD_NOT_FOUND} - No leaderboard found for the given name`);
			return ReturnCodes.LEADERBOARD_NOT_FOUND;
		}

		const columnName = command.arguments[1];
		const columnId = await getColumnId(leaderboardId, columnName);
		if (columnId === -1) {
			logger.warn(`${ReturnCodes.LEADERBOARD_DUPLICATE_NAME} - A leaderboard column with that name does not exist`);
			return ReturnCodes.COLUMN_NOT_FOUND;
		}

		await ValueDAO.deleteValuesByColumn(columnId);
		await ColumnDAO.deleteLeaderboardColumn(leaderboardId, columnId);
		logger.info(`Deleted leaderboard column ${columnName}`);
		return ReturnCodes.SUCCESS;
	}
}
