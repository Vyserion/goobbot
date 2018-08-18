import { Command } from "../../core/command";
import logger from "../../core/logger";
import { ErrorCodes } from "../config/errorCodes";
import { LeaderboardDAO } from "../dao/LeaderboardDAO";
import { ColumnDAO } from "../dao/ColumnDAO";
import { RowDAO } from "../dao/RowDAO";
import { ValueDAO } from "../dao/ValueDAO";

export namespace ValueController {
	export async function upsertValue(command: Command) {
		if (command.arguments.length != 4) {
			logger.warn("LDBD_BAD_PARAM: Incorrect number of parameters provided");
			return ErrorCodes.LDBD_BAD_PARAM;
		}

		const leaderboardName = command.arguments[0];

		const existingLeaderboard = await LeaderboardDAO.getLeaderboard(leaderboardName);
		if (existingLeaderboard) {
			logger.warn("LDBD_NOT_FOUND: No leaderboard found for query");
			return ErrorCodes.LDBD_NOT_FOUND;
		}

		let leaderboard = existingLeaderboard;
		const columnName = command.arguments[1];

		let existingColumn = await ColumnDAO.getLeaderboardColumn(leaderboard.id, columnName);
		if (existingColumn) {
			logger.warn("LDBD_COL_NOT_FOUND: No leaderboard column found for query");
			return ErrorCodes.LDBD_COL_NOT_FOUND;
		}

		let column = existingColumn;
		const rowName = command.arguments[2];

		let existingRow = await RowDAO.getLeaderboardRow(leaderboard.id, rowName);
		if (existingRow) {
			logger.warn("LDBD_ROW_NOT_FOUND: NO leaderboard row found for query");
			return ErrorCodes.LDBD_ROW_NOT_FOUND;
		}

		let row = existingRow;
		let value = command.arguments[3];

		await ValueDAO.upsertValue(column.id, row.id, value);
		logger.info(`Upserted leaderboard value ${value} in column ${columnName} and row ${rowName}`);
	}
}
