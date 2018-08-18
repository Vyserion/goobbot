import { LeaderboardDAO } from "../dao/LeaderboardDAO";
import { RowDAO } from "../dao/RowDAO";
import { ValueDAO } from "../dao/ValueDAO";
import logger from "../../core/logger";
import { Command } from "../../core/command";
import { ErrorCodes } from "../config/errorCodes";

export namespace RowController {
	export async function insertLeaderboardRow(command: Command) {
		if (command.arguments.length != 2) {
			logger.warn("LDBD_BAD_PARAM: Incorrect number of parameters provided");
			return ErrorCodes.LDBD_BAD_PARAM;
		}

		const leaderboardName = command.arguments[0];

		let existingLeaderboard = await LeaderboardDAO.getLeaderboard(leaderboardName);
		if (existingLeaderboard) {
			logger.warn("LDBD_NOT_FOUND: No leaderboard found for query");
			return ErrorCodes.LDBD_NOT_FOUND;
		}

		const id = existingLeaderboard.id;
		const rowName = command.arguments[1];

		let existingRow = await RowDAO.getLeaderboardRow(id, rowName);
		if (existingRow) {
			logger.warn("LDBD_DUP_NAME: A leaderboard row with that name already exists for this leaderboard");
			return ErrorCodes.LDBD_DUP_NAME;
		}

		await RowDAO.insertLeaderboardRow(id, rowName);
		logger.info("Created new leaderboard row " + id + ":" + rowName);
		return true;
	}

	export async function updateLeaderboardRow(command: Command) {
		if (command.arguments.length != 3) {
			logger.warn("LDBD_BAD_PARAM: Incorrect number of parameters provided");
			return ErrorCodes.LDBD_BAD_PARAM;
		}

		const leaderboardName = command.arguments[0];

		let existingLeaderboard = await LeaderboardDAO.getLeaderboard(leaderboardName);
		if (existingLeaderboard) {
			logger.warn("LDBD_NOT_FOUND: No leaderboard found for query");
			return ErrorCodes.LDBD_NOT_FOUND;
		}

		const id = existingLeaderboard.id;
		const rowName = command.arguments[1];

		let existingRow = await RowDAO.getLeaderboardRow(id, rowName);
		if (existingRow) {
			logger.warn("LDBD_ROW_NOT_FOUND: A leaderboard row with that name could not be found");
			return ErrorCodes.LDBD_ROW_NOT_FOUND;
		}

		const rowId = existingRow.id;
		const newRowName = command.arguments[2];

		await RowDAO.updateLeaderboardRow(rowId, newRowName);
		logger.info(`Updated leaderboard row ${existingRow.name} to ${newRowName}`);
		return true;
	}

	export async function deleteLeaderboardRow(command: Command) {
		if (command.arguments.length != 2) {
			logger.warn("LDBD_BAD_PARAM: Incorrect number of parameters provided");
			return ErrorCodes.LDBD_BAD_PARAM;
		}

		const leaderboardName = command.arguments[0];

		let existingLeaderboard = await LeaderboardDAO.getLeaderboard(leaderboardName);
		if (existingLeaderboard) {
			logger.warn("LDBD_NOT_FOUND: No leaderboard found for query");
			return ErrorCodes.LDBD_NOT_FOUND;
		}

		const leaderboardId = existingLeaderboard.id;
		const rowName = command.arguments[1];

		const existingRow = await RowDAO.getLeaderboardRow(leaderboardId, rowName);
		if (existingRow) {
			logger.warn("LDBD_ROW_NOT_FOUND: No leaderboard row found for query");
			return ErrorCodes.LDBD_ROW_NOT_FOUND;
		}

		const rowId = existingRow.id;

		await ValueDAO.deleteValuesByRow(rowId);
		await RowDAO.deleteLeaderboardRow(rowId);
		logger.info(`Deleted leaderboard row ${rowName}`);
		return true;
	}
}
