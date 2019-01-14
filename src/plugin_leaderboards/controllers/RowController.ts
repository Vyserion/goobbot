import { RowDAO, ValueDAO } from "../dao";
import logger from "../../core/logger";
import { TCommand } from "../../core/command";
import { ReturnCodes } from "../config/ReturnCodes";
import { commandHasCorrectArgumentsLength, getLeaderboardId, getRowId } from "../util/validators";

export namespace RowController {
	export async function insertLeaderboardRow(command: TCommand): Promise<ReturnCodes> {
		if (!commandHasCorrectArgumentsLength(command, 2)) {
			logger.warn(`${ReturnCodes.INCORRECT_PARAM_LENGTH} - Incorrect number of parameters provided`);
			return ReturnCodes.INCORRECT_PARAM_LENGTH;
		}

		const leaderboardName = command.arguments[0];
		const leaderboardId = await getLeaderboardId(leaderboardName);
		if (leaderboardId === -1) {
			logger.warn(`${ReturnCodes.LEADERBOARD_NOT_FOUND} - No leaderboard found for the given name`);
			return ReturnCodes.LEADERBOARD_NOT_FOUND;
		}

		const rowName = command.arguments[1];
		const rowid = await getRowId(leaderboardId, rowName);
		if (rowid === -1) {
			logger.warn(`${ReturnCodes.LEADERBOARD_DUPLICATE_NAME} - A leaderboard row with that name already exists`);
			return ReturnCodes.LEADERBOARD_DUPLICATE_NAME;
		}

		await RowDAO.insertLeaderboardRow(leaderboardId, rowName);
		logger.info(`Created new leaderboard row ${leaderboardId}:${rowName}`);
		return ReturnCodes.SUCCESS;
	}

	export async function updateLeaderboardRow(command: TCommand): Promise<ReturnCodes> {
		if (!commandHasCorrectArgumentsLength(command, 3)) {
			logger.warn(`${ReturnCodes.INCORRECT_PARAM_LENGTH} - Incorrect number of parameters provided`);
			return ReturnCodes.INCORRECT_PARAM_LENGTH;
		}

		const leaderboardName = command.arguments[0];
		const leaderboardId = await getLeaderboardId(leaderboardName);
		if (leaderboardId === -1) {
			logger.warn(`${ReturnCodes.LEADERBOARD_NOT_FOUND} - No leaderboard found for the given name`);
			return ReturnCodes.LEADERBOARD_NOT_FOUND;
		}

		const rowName = command.arguments[1];
		const rowid = await getRowId(leaderboardId, rowName);
		if (rowid > -1) {
			logger.warn(`${ReturnCodes.ROW_NOT_FOUND} - A leaderboard row with that name does not exist`);
			return ReturnCodes.ROW_NOT_FOUND;
		}

		const newRowName = command.arguments[2];
		await RowDAO.updateLeaderboardRow(rowid, newRowName);
		logger.info(`Updated leaderboard row ${rowid} to ${newRowName}`);
		return ReturnCodes.SUCCESS;
	}

	export async function deleteLeaderboardRow(command: TCommand): Promise<ReturnCodes> {
		if (!commandHasCorrectArgumentsLength(command, 2)) {
			logger.warn(`${ReturnCodes.INCORRECT_PARAM_LENGTH} - Incorrect number of parameters provided`);
			return ReturnCodes.INCORRECT_PARAM_LENGTH;
		}

		const leaderboardName = command.arguments[0];
		const leaderboardId = await getLeaderboardId(leaderboardName);
		if (leaderboardId === -1) {
			logger.warn(`${ReturnCodes.LEADERBOARD_NOT_FOUND} - No leaderboard found for the given name`);
			return ReturnCodes.LEADERBOARD_NOT_FOUND;
		}

		const rowName = command.arguments[1];
		const rowid = await getRowId(leaderboardId, rowName);
		if (rowid > -1) {
			logger.warn(`${ReturnCodes.ROW_NOT_FOUND} - A leaderboard row with that name does not exist`);
			return ReturnCodes.ROW_NOT_FOUND;
		}

		await ValueDAO.deleteValuesByRow(rowid);
		await RowDAO.deleteLeaderboardRow(rowid);
		logger.info(`Deleted leaderboard row ${rowName}`);
		return ReturnCodes.SUCCESS;
	}
}
