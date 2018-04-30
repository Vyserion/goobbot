import { LeaderboardDAO } from "../dao";
import Leaderboard from "../models/Leaderboard";
import logger from '../../core/logger';
import { Command } from "../../core/command";
import { ErrorCodes } from "../config/errorCodes";
import Column from "../models/Column";

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

        await LeaderboardDAO.deleteLeaderboardColumns(id);
        await LeaderboardDAO.deleteLeaderboard(id);
        logger.info('Deleted leaderboard ' + name);
        return true;
    }

}