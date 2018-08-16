import { LeaderboardDAO } from "../dao/LeaderboardDAO";
import { ColumnDAO } from "../dao/ColumnDAO";
import { ValueDAO } from "../dao/ValueDAO";
import logger from '../../core/logger';
import { Command } from "../../core/command";
import { ErrorCodes } from "../config/errorCodes";
import { UpdateActions } from "../config/updateActions";
import Column from "../models/Column";
import { ColumnTypes } from "../config/columnTypes";


export namespace ColumnController {

    export async function insertLeaderboardColumn(command: Command) {
        if (command.arguments.length < 2 || command.arguments.length > 3) {
            logger.warn('LDBD_BAD_PARAM: Incorrect number of parameters provided');
            return ErrorCodes.LDBD_BAD_PARAM;
        }

        const leaderboardName = command.arguments[0];

        let existingLeaderboards = await LeaderboardDAO.getLeaderboard(leaderboardName);
        if (existingLeaderboards.length == 0) {
            logger.warn('LDBD_NOT_FOUND: No leaderboard found for query');
            return ErrorCodes.LDBD_NOT_FOUND;
        }
    
        const id = existingLeaderboards[0].id;
        const columnName = command.arguments[1];

        let existingColumns = await ColumnDAO.getLeaderboardColumn(id, columnName);
        if (existingColumns.length > 0) {
            logger.warn('LDBD_DUP_NAME: A leaderboard column with that name already exists for this leaderboard');
            return ErrorCodes.LDBD_DUP_NAME;
        }

        let columnType: string = ColumnTypes.DATA;
        if (command.arguments.length == 3) {
            const columnTypeStr = command.arguments[2].toUpperCase();
            const validColumnType = ColumnTypes[columnTypeStr];
            
            if (!validColumnType) {
                return ErrorCodes.LDBD_BAD_TYPE;
            }
            columnType = columnTypeStr;
        }

        await ColumnDAO.insertLeaderboardColumn(id, columnName, columnType);
        logger.info('Created new leaderboard column ' + id + ':' + columnName + ':' + columnType);
        return true;
    }

    export async function updateLeaderboardColumn(command: Command) {
        if (command.arguments.length != 4) {
            logger.warn('LDBD_BAD_PARAM: Incorrect number of parameters provided');
            return ErrorCodes.LDBD_BAD_PARAM;
        }
        
        const name = command.arguments[0];

        const existingLeaderboards = await LeaderboardDAO.getLeaderboard(name);
        if (existingLeaderboards.length == 0) {
            logger.warn('LDBD_NOT_FOUND: No leaderboard found for query');
            return ErrorCodes.LDBD_NOT_FOUND;
        }

        const leaderboardId = existingLeaderboards[0].id;
        const columnName = command.arguments[1];
        const value = command.arguments[3];
        
        const existingColumns = await ColumnDAO.getLeaderboardColumn(leaderboardId, columnName);
        if (existingColumns.length == 0) {
            logger.warn('LDBD_COL_NOT_FOUND: No leaderboard column found for query');
            return ErrorCodes.LDBD_COL_NOT_FOUND;
        }

        const columnId = existingColumns[0].id;

        let action = command.arguments[2];
        action = action.toUpperCase();
        
        const validatedAction = UpdateActions[action];
        if (!validatedAction) {
            return ErrorCodes.LDBD_INVALID_PARAM;
        }

        if (validatedAction === UpdateActions.TYPE) {
            const columnTypeStr = command.arguments[3].toUpperCase();
            const validColumnType = ColumnTypes[columnTypeStr]

            if (!validColumnType) {
                return ErrorCodes.LDBD_BAD_TYPE;
            }

            await ColumnDAO.updateLeaderboardColumnType(leaderboardId, columnId, columnTypeStr)
            logger.info('Updated leaderboard column ' + existingColumns[0].name + ' to ' + columnTypeStr);
        } else if (validatedAction === UpdateActions.NAME) {
            await ColumnDAO.updateLeaderboardColumnName(leaderboardId, columnId, value);
            logger.info('Update leaderboard column ' + existingColumns[0].name + `'s type to ` + value);
        }

        return true;
    }

    export async function deleteLeaderboardColumn(command: Command) {
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

        const leaderboardId = existingLeaderboards[0].id;

        const columnName = command.arguments[1];
        
        const existingColumns = await ColumnDAO.getLeaderboardColumn(leaderboardId, columnName);
        if (existingColumns.length == 0) {
            logger.warn('LDBD_COL_NOT_FOUND: No leaderboard column found for query');
            return ErrorCodes.LDBD_COL_NOT_FOUND;
        }

        const columnId = existingColumns[0].id;

        await ValueDAO.deleteValuesByColumn(columnId);
        await ColumnDAO.deleteLeaderboardColumn(leaderboardId, columnId);
        logger.info('Deleted leaderboard column ' + columnName);
        return true;
    }
}