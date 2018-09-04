import { LeaderboardDAO, ColumnDAO, RowDAO, ValueDAO } from "../dao";
import logger from "../../core/logger";
import { Command } from "../../core/command";
import { ReturnCodes } from "../config/ReturnCodes";
import { Leaderboard } from "../models";
import { commandHasCorrectArgumentsLength, getLeaderboardId } from "../util/validators";

export namespace LeaderboardController {
	export async function getLeaderboards() {
		return await LeaderboardDAO.getLeaderboards();
	}

	export async function getLeaderboard(command: Command) {
		if (!commandHasCorrectArgumentsLength(command, 1)) {
			logger.warn(`${ReturnCodes.INCORRECT_PARAM_LENGTH} - Incorrect number of parameters provided`);
			return ReturnCodes.INCORRECT_PARAM_LENGTH;
		}

		const leaderboardName = command.arguments[0];
		const leaderboard = await LeaderboardDAO.getLeaderboard(leaderboardName);
		if (!leaderboard) {
			logger.warn(`${ReturnCodes.LEADERBOARD_NOT_FOUND} - No leaderboard found for the given name`);
			return ReturnCodes.LEADERBOARD_NOT_FOUND;
		}

		const columns = await ColumnDAO.getLeaderboardColumns(leaderboard.id);
		const rows = await RowDAO.getLeaderboardRows(leaderboard.id);
		const values = await ValueDAO.getValues(leaderboard.id);

		const leaderboardObj: Leaderboard = {
			id: leaderboard.id,
			name: leaderboard.name,
			rows: rows,
			columns: columns,
			values: values
		};

		return leaderboardObj;
	}

	export async function insertLeaderboard(command: Command): Promise<ReturnCodes> {
		if (!commandHasCorrectArgumentsLength(command, 1)) {
			logger.warn(`${ReturnCodes.INCORRECT_PARAM_LENGTH} - Incorrect number of parameters provided`);
			return ReturnCodes.INCORRECT_PARAM_LENGTH;
		}

		const leaderboardName = command.arguments[0];
		const leaderboardId = await getLeaderboardId(leaderboardName);
		if (leaderboardId > -1) {
			logger.warn(`${ReturnCodes.LEADERBOARD_NOT_FOUND} - A leaderboard with that name already exists`);
			return ReturnCodes.LEADERBOARD_NOT_FOUND;
		}

		await LeaderboardDAO.insertLeaderboard(name);
		logger.info(`Created new leaderboard ${name}`);
		return ReturnCodes.SUCCESS;
	}

	export async function updateLeaderboard(command: Command): Promise<ReturnCodes> {
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

		const newName = command.arguments[1];
		await LeaderboardDAO.updateLeaderboard(leaderboardId, newName);
		logger.info(`Updated leaderboard ${name} to ${newName}`);
		return ReturnCodes.SUCCESS;
	}

	export async function deleteLeaderboard(command: Command): Promise<ReturnCodes> {
		if (!commandHasCorrectArgumentsLength(command, 1)) {
			logger.warn(`${ReturnCodes.INCORRECT_PARAM_LENGTH} - Incorrect number of parameters provided`);
			return ReturnCodes.INCORRECT_PARAM_LENGTH;
		}

		const leaderboardName = command.arguments[0];
		const leaderboardId = await getLeaderboardId(leaderboardName);
		if (leaderboardId === -1) {
			logger.warn(`${ReturnCodes.LEADERBOARD_NOT_FOUND} - No leaderboard found for the given name`);
			return ReturnCodes.LEADERBOARD_NOT_FOUND;
		}

		await ValueDAO.deleteValueByLeaderboard(leaderboardId);
		await RowDAO.deleteLeaderboardRows(leaderboardId);
		await ColumnDAO.deleteLeaderboardColumns(leaderboardId);
		await LeaderboardDAO.deleteLeaderboard(leaderboardId);

		logger.info(`Deleted leaderboard ${name}`);
		return ReturnCodes.SUCCESS;
	}
}
