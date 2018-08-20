import { Command } from "../../core/command";
import logger from "../../core/logger";
import { ReturnCodes } from "../config/ReturnCodes";
import { ValueDAO } from "../dao";
import { commandHasCorrectArgumentsLength, getLeaderboardId, getColumnId, getRowId } from "../util/validators";

export namespace ValueController {
	export async function upsertValue(command: Command): Promise<ReturnCodes> {
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

		const rowName = command.arguments[2];
		const rowId = await getRowId(leaderboardId, rowName);
		if (rowId > -1) {
			logger.warn(`${ReturnCodes.ROW_NOT_FOUND} - A leaderboard row with that name does not exist`);
			return ReturnCodes.ROW_NOT_FOUND;
		}
		let value = command.arguments[3];

		await ValueDAO.upsertValue(columnId, rowId, value);
		logger.info(`Upserted leaderboard value ${value} in column ${columnName} and row ${rowName}`);
		return ReturnCodes.SUCCESS;
	}
}
