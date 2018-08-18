import { LeaderboardDAO } from "../dao/LeaderboardDAO";
import { ColumnDAO } from "../dao/ColumnDAO";
import logger from "../../core/logger";
import { Command } from "../../core/command";
import { ErrorCodes } from "../config/errorCodes";
import { RowDAO } from "../dao/RowDAO";
import { Leaderboard, Column, Row }  from "../models";
import { ValueDAO } from "../dao/ValueDAO";

export namespace LeaderboardController {
	export async function getLeaderboards() {
		return await LeaderboardDAO.getLeaderboards();
	}

	export async function getLeaderboard(command: Command) {
		if (command.arguments.length != 1) {
			logger.warn("LDBD_BAD_PARAM: Incorrect number of parameters provided");
			return ErrorCodes.LDBD_BAD_PARAM;
		}

		const leaderboardName = command.arguments[0];

		let existingLeaderboard = await LeaderboardDAO.getLeaderboard(leaderboardName);
		if (existingLeaderboard) {
			logger.warn("LDBD_NOT_FOUND: No leaderboard found for query");
			return ErrorCodes.LDBD_NOT_FOUND;
		}

		let leaderboard = existingLeaderboard;
		let columns = await ColumnDAO.getLeaderboardColumns(leaderboard.id);
		let rows = await RowDAO.getLeaderboardRows(leaderboard.id);

		let leaderboardObj: Leaderboard = {
			id: leaderboard.id,
			name: leaderboard.name,
			rows: [],
			columns: []
		};

		for (let column of columns) {
			let col: Column = {
				name: column.name,
				type: column.type
			};
			leaderboardObj.columns.push(col);
		}

		for (let row of rows) {
			let r: Row = {
				name: row.name
			};
			leaderboardObj.rows.push(r);
		}

		return leaderboardObj;
	}

	export async function insertLeaderboard(command: Command) {
		if (command.arguments.length != 1) {
			logger.warn("LDBD_BAD_PARAM: Incorrect number of parameters provided");
			return ErrorCodes.LDBD_BAD_PARAM;
		}

		const name = command.arguments[0];

		let existingLeaderboard = await LeaderboardDAO.getLeaderboard(name);
		if (existingLeaderboard) {
			logger.warn("LDBD_DUP_NAME: A leaderboard with that name already exists");
			return ErrorCodes.LDBD_DUP_NAME;
		}

		await LeaderboardDAO.insertLeaderboard(name);
		logger.info("Created new leaderboard " + name);
		return true;
	}

	export async function updateLeaderboard(command: Command) {
		if (command.arguments.length != 2) {
			logger.warn("LDBD_BAD_PARAM: Incorrect number of parameters provided");
			return ErrorCodes.LDBD_BAD_PARAM;
		}

		const name = command.arguments[0];
		const newName = command.arguments[1];

		let existingLeaderboard = await LeaderboardDAO.getLeaderboard(name);
		if (existingLeaderboard) {
			logger.warn("LDBD_NOT_FOUND: No leaderboard found for query");
			return ErrorCodes.LDBD_NOT_FOUND;
		}

		const id = existingLeaderboard.id;
		await LeaderboardDAO.updateLeaderboard(id, newName);
		logger.info("Updated leaderboard " + name + " to " + newName);
		return true;
	}

	export async function deleteLeaderboard(command: Command) {
		if (command.arguments.length != 1) {
			logger.warn("LDBD_BAD_PARAM: Incorrect number of parameters provided");
			return ErrorCodes.LDBD_BAD_PARAM;
		}

		const name = command.arguments[0];

		let existingLeaderboard = await LeaderboardDAO.getLeaderboard(name);
		if (existingLeaderboard) {
			logger.warn("LDBD_NOT_FOUND: No leaderboard found for query");
			return ErrorCodes.LDBD_NOT_FOUND;
		}

		const id = existingLeaderboard.id;

		await ValueDAO.deleteValueByLeaderboard(id);
		await RowDAO.deleteLeaderboardRows(id);
		await ColumnDAO.deleteLeaderboardColumns(id);
		await LeaderboardDAO.deleteLeaderboard(id);

		logger.info("Deleted leaderboard " + name);
		return true;
	}
}
