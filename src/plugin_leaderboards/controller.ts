import { LeaderboardDAO } from "./dao";
import { ErrorCodes } from "./config/errorCodes";
import { UpdateActions } from "./config/updateActions";
import { Command } from "../core/command";
import logger from '../core/logger';
import Leaderboard from "./models/Leaderboard";
import Column from "./models/Column";

export namespace LeaderboardController {

    export async function getLeaderboards() {
        return await LeaderboardDAO.getLeaderboards();
    }

    export async function getLeaderboard(command: Command) {
        if (command.arguments.length != 1) {
            logger.warn('LDBD_BAD_PARAM: Incorrect number of parameters provided');
            return ErrorCodes.LDBD_BAD_PARAM;
        }

        const leaderboardName = command.arguments[0];

        let existingLeaderboards = await LeaderboardDAO.getLeaderboard(leaderboardName);
        if (existingLeaderboards.length == 0) {
            logger.warn('LDBD_NOT_FOUND: No leaderboard found for query');
            return ErrorCodes.LDBD_NOT_FOUND;
        }

        let leaderboard = existingLeaderboards[0];
        let columns = await LeaderboardDAO.getLeaderboardColumns(leaderboard.id);

        let leaderboardObj = new Leaderboard();
        leaderboardObj.name = leaderboard.name;

        for (let column of columns) {
            let col = new Column(column.name, column.type);
            leaderboardObj.columns.push(col);
        }

        return leaderboardObj;
    }

    export async function insertLeaderboard(command: Command) {
        if (command.arguments.length != 1) {
            logger.warn('LDBD_BAD_PARAM: Incorrect number of parameters provided');
            return ErrorCodes.LDBD_BAD_PARAM;
        }
    
        const name = command.arguments[0];
    
        let existingLeaderboards = await LeaderboardDAO.getLeaderboard(name);
        if (existingLeaderboards.length > 0) {
            logger.warn('LDBD_DUP_NAME: A leaderboard with that name already exists');
            return ErrorCodes.LDBD_DUP_NAME;
        }
    
        await LeaderboardDAO.insertLeaderboard(name);
        logger.info('Created new leaderboard ' + name);
        return true;
    }

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

        let existingColumns = await LeaderboardDAO.getLeaderboardColumn(id, columnName);
        if (existingColumns.length > 0) {
            logger.warn('LDBD_DUP_NAME: A leaderboard column with that name already exists for this leaderboard');
            return ErrorCodes.LDBD_DUP_NAME;
        }

        let columnType = 'DATA';
        if (command.arguments.length == 3) {
            columnType = command.arguments[2];
            // TODO - We need to some column type matching here.
        }

        await LeaderboardDAO.insertLeaderboardColumn(id, columnName, columnType);
        logger.info('Created new leaderboard column ' + id + ':' + columnName + ':' + columnType);
        return true;
    }

    export async function updateLeaderboard(command: Command) {
        if (command.arguments.length != 2) {
            logger.warn('LDBD_BAD_PARAM: Incorrect number of parameters provided');
            return ErrorCodes.LDBD_BAD_PARAM;
        }
    
        const name = command.arguments[0];
        const newName = command.arguments[1];
    
        let existingLeaderboards = await LeaderboardDAO.getLeaderboard(name);
        if (existingLeaderboards.length == 0) {
            logger.warn('LDBD_NOT_FOUND: No leaderboard found for query');
            return ErrorCodes.LDBD_NOT_FOUND;
        }
    
        const id = existingLeaderboards[0].id;
        await LeaderboardDAO.updateLeaderboard(id, newName);
        logger.info('Updated leaderboard ' + name + ' to ' + newName);
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
        
        const existingColumns = await LeaderboardDAO.getLeaderboardColumn(leaderboardId, columnName);
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
            // TODO: we need to some checking on the type value here - same as create.
            await LeaderboardDAO.updateLeaderboardColumnType(leaderboardId, columnId, value)
            logger.info('Updated leaderboard column ' + existingColumns[0].name + ' to ' + value);
        } else if (validatedAction === UpdateActions.NAME) {
            await LeaderboardDAO.updateLeaderboardColumnName(leaderboardId, columnId, value);
            logger.info('Update leaderboard column ' + existingColumns[0].name + `'s type to ` + value);
        }

        return true;
    }

    export async function deleteLeaderboard(command: Command) {
        if (command.arguments.length != 1) {
            logger.warn('LDBD_BAD_PARAM: Incorrect number of parameters provided');
            return ErrorCodes.LDBD_BAD_PARAM;
        }
    
        const name = command.arguments[0];
    
        let existingLeaderboards = await LeaderboardDAO.getLeaderboard(name);
        if (existingLeaderboards.length == 0) {
            logger.warn('LDBD_NOT_FOUND: No leaderboard found for query');
            return ErrorCodes.LDBD_NOT_FOUND;
        }
    
        const id = existingLeaderboards[0].id;
        await LeaderboardDAO.deleteLeaderboard(id);
        logger.info('Deleted leaderboard ' + name);
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
        
        const existingColumns = await LeaderboardDAO.getLeaderboardColumn(leaderboardId, columnName);
        if (existingColumns.length == 0) {
            logger.warn('LDBD_COL_NOT_FOUND: No leaderboard column found for query');
            return ErrorCodes.LDBD_COL_NOT_FOUND;
        }

        const columnId = existingColumns[0].id;

        await LeaderboardDAO.deleteLeaderboardColumn(leaderboardId, columnId);
        logger.info('Deleted leaderboard column ' + columnName);
        return true;
    }
}
