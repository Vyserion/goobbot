import { RowDAO, ValueDAO } from "../dao";
import logger from "../../core/logger";
import { Command } from "../../core/command";
import { ReturnCodes } from "../config/ReturnCodes";
import { commandHasCorrectArgumentsLength, getLeaderboardId, getRowId } from "../util/validators";

export namespace RowController {
	export async function insertLeaderboardRow(command: Command): Promise<ReturnCodes> {
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

		const rowName = command.arguments[1];
		const rowId = await getRowId(leaderboardId, rowName);
		if (rowId === -1) {
			logger.warn(`${ReturnCodes.LEADERBOARD_DUPLICATE_NAME} - A leaderboard row with that name already exists`);
			return ReturnCodes.LEADERBOARD_DUPLICATE_NAME;
		}

		await RowDAO.insertLeaderboardRow(leaderboardId, rowName);
		logger.info(`Created new leaderboard row ${leaderboardId}:${rowName}`);
		return ReturnCodes.SUCCESS;
	}

	export async function updateLeaderboardRow(command: Command): Promise<ReturnCodes> {
		if (commandHasCorrectArgumentsLength(command, 3)) {
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
		const rowId = await getRowId(leaderboardId, rowName);
		if (rowId > -1) {
			logger.warn(`${ReturnCodes.ROW_NOT_FOUND} - A leaderboard row with that name does not exist`);
			return ReturnCodes.ROW_NOT_FOUND;
		}

		const newRowName = command.arguments[2];
		await RowDAO.updateLeaderboardRow(rowId, newRowName);
		logger.info(`Updated leaderboard row ${rowId} to ${newRowName}`);
		return ReturnCodes.SUCCESS;
	}

	export async function deleteLeaderboardRow(command: Command): Promise<ReturnCodes> {
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

		const rowName = command.arguments[1];
		const rowId = await getRowId(leaderboardId, rowName);
		if (rowId > -1) {
			logger.warn(`${ReturnCodes.ROW_NOT_FOUND} - A leaderboard row with that name does not exist`);
			return ReturnCodes.ROW_NOT_FOUND;
		}

		await ValueDAO.deleteValuesByRow(rowId);
		await RowDAO.deleteLeaderboardRow(rowId);
		logger.info(`Deleted leaderboard row ${rowName}`);
		return ReturnCodes.SUCCESS;
	}
}
