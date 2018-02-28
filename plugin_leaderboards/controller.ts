import { Command } from "../core/command";
import { 
    getLeaderboards as getLeaderboardsData,
    getLeaderboard,
    insertLeaderboard as insertLeaderboardData,
    updateLeaderboard as updateLeaderboardData
} from "./dao";
import logger from '../core/logger';
import { ErrorCodes } from "./errorCodes";

export const getLeaderboards = async () => {
    let leaderboards = await getLeaderboardsData();
    return leaderboards;
}

export const insertLeaderboard = async (command: Command) => {
    if (command.arguments.length != 1) {
        logger.warn('LDBD_BAD_PARAM: Incorrect number of parameters provided');
        return ErrorCodes.LDBD_BAD_PARAM;
    }

    const name = command.arguments[0];

    let existingLeaderboards = await getLeaderboard(name);
    if (existingLeaderboards.length > 0) {
        logger.warn('LDBD_DUP_NAME: A leaderboard with that name already exists');
        return ErrorCodes.LDBD_DUP_NAME;
    }

    await insertLeaderboardData(name);
    logger.info('Created new leaderboard ' + name);
    return true;
};

export const updateLeaderboard = async (command: Command) => {
    if (command.arguments.length != 2) {
        logger.warn('LDBD_BAD_PARAM: Incorrect number of parameters provided');
        return ErrorCodes.LDBD_BAD_PARAM;
    }

    const name = command.arguments[0];
    const newName = command.arguments[1];

    let existingLeaderboards = await getLeaderboard(name);
    if (existingLeaderboards.length == 0) {
        logger.warn('LDBD_NOT_FOUND: No leaderboard found for query');
        return ErrorCodes.LDBD_NOT_FOUND;
    }

    const id = existingLeaderboards[0].id;
    await updateLeaderboardData(id, newName);
    logger.info('Updated leaderboard ' + name + ' to ' + newName);
    return true;
}