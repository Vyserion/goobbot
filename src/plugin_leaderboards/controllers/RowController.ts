import { LeaderboardDAO } from '../dao/LeaderboardDAO';
import { RowDAO } from '../dao/RowDAO';
import logger from '../../core/logger';
import { Command } from '../../core/command';
import { ErrorCodes } from '../config/errorCodes';
import { ColumnDAO } from '../dao/ColumnDAO';

export namespace RowController {

    export async function insertLeaderboardRow(command: Command) {
        if (command.arguments.length != 2) {
            logger.warn('LDBD_BAD_PARAM: Incorrect number of parameters provided');
            return ErrorCodes.LDBD_BAD_PARAM;
        }

        const leaderboardName = command.arguments[0];

        let existingLeaderboards = await LeaderboardDAO.getLeaderboard(leaderboardName);
        if (existingLeaderboards.length === 0) {
            logger.warn('LDBD_NOT_FOUND: No leaderboard found for query');
            return ErrorCodes.LDBD_NOT_FOUND;
        }

        const id = existingLeaderboards[0].id;
        const rowName = command.arguments[1];

        let existingRows = await RowDAO.getLeaderboardRow(id, rowName);
        if (existingRows.length > 0) {
            logger.warn('LDBD_DUP_NAME: A leaderboard row with that name already exists for this leaderboard');
            return ErrorCodes.LDBD_DUP_NAME;
        }

        await RowDAO.insertLeaderboardRow(id, rowName);
        logger.info('Created new leaderboard row ' + id + ':' + rowName);
        return true;
    }

    export async function updateLeaderboardRow(command: Command) {
        if (command.arguments.length != 3) {
            logger.warn('LDBD_BAD_PARAM: Incorrect number of parameters provided');
            return ErrorCodes.LDBD_BAD_PARAM;
        }

        const leaderboardName = command.arguments[0];

        let existingLeaderboards = await LeaderboardDAO.getLeaderboard(leaderboardName);
        if (existingLeaderboards.length === 0) {
            logger.warn('LDBD_NOT_FOUND: No leaderboard found for query');
            return ErrorCodes.LDBD_NOT_FOUND;
        }

        const id = existingLeaderboards[0].id;
        const rowName = command.arguments[1];

        let existingRows = await RowDAO.getLeaderboardRow(id, rowName);
        if (existingRows.length > 0) {
            logger.warn('LDBD_ROW_NOT_FOUND: A leaderboard row with that name could not be found');
            return ErrorCodes.LDBD_ROW_NOT_FOUND;
        }

        const rowId = existingRows[0].id;
        const newRowName = command.arguments[2];

        await RowDAO.updateLeaderboardRow(rowId, newRowName);
        logger.info(`Updated leaderboard row ${existingRows[0].name} to ${newRowName}`);
        return true;
    }

}