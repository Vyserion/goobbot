import { 
    LeaderboardDAO
} from "./dao";
import { ErrorCodes } from "./config/errorCodes";
import { Command } from "../core/command";
import logger from '../core/logger';

export class LeaderboardController {

    dao: LeaderboardDAO;

    constructor() {
        this.dao = new LeaderboardDAO();
    }

    getLeaderboards = async (): Promise<any[]> => {
        return await this.dao.getLeaderboards();
    }

    insertLeaderboard = async (command: Command) => {
        if (command.arguments.length != 1) {
            logger.warn('LDBD_BAD_PARAM: Incorrect number of parameters provided');
            return ErrorCodes.LDBD_BAD_PARAM;
        }
    
        const name = command.arguments[0];
    
        let existingLeaderboards = await this.dao.getLeaderboard(name);
        if (existingLeaderboards.length > 0) {
            logger.warn('LDBD_DUP_NAME: A leaderboard with that name already exists');
            return ErrorCodes.LDBD_DUP_NAME;
        }
    
        await this.dao.insertLeaderboard(name);
        logger.info('Created new leaderboard ' + name);
        return true;
    }

    insertLeaderboardColumn = async (command: Command) => {
        if (command.arguments.length < 2 || command.arguments.length > 3) {
            logger.warn('LDBD_BAD_PARAM: Incorrect number of parameters provided');
            return ErrorCodes.LDBD_BAD_PARAM;
        }

        const leaderboardName = command.arguments[0];

        let existingLeaderboards = await this.dao.getLeaderboard(leaderboardName);
        if (existingLeaderboards.length == 0) {
            logger.warn('LDBD_NOT_FOUND: No leaderboard found for query');
            return ErrorCodes.LDBD_NOT_FOUND;
        }
    
        const id = existingLeaderboards[0].id;
        const columnName = command.arguments[1];

        let existingColumns = await this.dao.getLeaderboardColumn(id, columnName);
        if (existingColumns.length > 0) {
            logger.warn('LDBD_DUP_NAME: A leaderboard column with that name already exists for this leaderboard');
            return ErrorCodes.LDBD_DUP_NAME;
        }

        let columnType = 'DATA';
        if (command.arguments.length == 3) {
            columnType = command.arguments[2];
            // TODO - We need to some column type matching here.
        }

        await this.dao.insertLeaderboardColumn(id, columnName, columnType);
        logger.info('Created new leaderboard column ' + id + ':' + columnName + ':' + columnType);
        return true;
    }

    updateLeaderboard = async (command: Command) => {
        if (command.arguments.length != 2) {
            logger.warn('LDBD_BAD_PARAM: Incorrect number of parameters provided');
            return ErrorCodes.LDBD_BAD_PARAM;
        }
    
        const name = command.arguments[0];
        const newName = command.arguments[1];
    
        let existingLeaderboards = await this.dao.getLeaderboard(name);
        if (existingLeaderboards.length == 0) {
            logger.warn('LDBD_NOT_FOUND: No leaderboard found for query');
            return ErrorCodes.LDBD_NOT_FOUND;
        }
    
        const id = existingLeaderboards[0].id;
        await this.dao.updateLeaderboard(id, newName);
        logger.info('Updated leaderboard ' + name + ' to ' + newName);
        return true;
    }

    deleteLeaderboard = async (command: Command) => {
        if (command.arguments.length != 1) {
            logger.warn('LDBD_BAD_PARAM: Incorrect number of parameters provided');
            return ErrorCodes.LDBD_BAD_PARAM;
        }
    
        const name = command.arguments[0];
    
        let existingLeaderboards = await this.dao.getLeaderboard(name);
        if (existingLeaderboards.length == 0) {
            logger.warn('LDBD_NOT_FOUND: No leaderboard found for query');
            return ErrorCodes.LDBD_NOT_FOUND;
        }
    
        const id = existingLeaderboards[0].id;
        await this.dao.deleteLeaderboard(id);
        logger.info('Deleted leaderboard ' + name);
        return true;
    }
}