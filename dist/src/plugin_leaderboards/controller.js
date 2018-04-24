"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dao_1 = require("./dao");
const errorCodes_1 = require("./config/errorCodes");
const updateActions_1 = require("./config/updateActions");
const logger_1 = require("../core/logger");
const Leaderboard_1 = require("./models/Leaderboard");
const Column_1 = require("./models/Column");
const columnTypes_1 = require("./config/columnTypes");
var LeaderboardController;
(function (LeaderboardController) {
    async function getLeaderboards() {
        return await dao_1.LeaderboardDAO.getLeaderboards();
    }
    LeaderboardController.getLeaderboards = getLeaderboards;
    async function getLeaderboard(command) {
        if (command.arguments.length != 1) {
            logger_1.default.warn('LDBD_BAD_PARAM: Incorrect number of parameters provided');
            return errorCodes_1.ErrorCodes.LDBD_BAD_PARAM;
        }
        const leaderboardName = command.arguments[0];
        let existingLeaderboards = await dao_1.LeaderboardDAO.getLeaderboard(leaderboardName);
        if (existingLeaderboards.length == 0) {
            logger_1.default.warn('LDBD_NOT_FOUND: No leaderboard found for query');
            return errorCodes_1.ErrorCodes.LDBD_NOT_FOUND;
        }
        let leaderboard = existingLeaderboards[0];
        let columns = await dao_1.LeaderboardDAO.getLeaderboardColumns(leaderboard.id);
        let leaderboardObj = new Leaderboard_1.default();
        leaderboardObj.name = leaderboard.name;
        for (let column of columns) {
            let col = new Column_1.default(column.name, column.type);
            leaderboardObj.columns.push(col);
        }
        return leaderboardObj;
    }
    LeaderboardController.getLeaderboard = getLeaderboard;
    async function insertLeaderboard(command) {
        if (command.arguments.length != 1) {
            logger_1.default.warn('LDBD_BAD_PARAM: Incorrect number of parameters provided');
            return errorCodes_1.ErrorCodes.LDBD_BAD_PARAM;
        }
        const name = command.arguments[0];
        let existingLeaderboards = await dao_1.LeaderboardDAO.getLeaderboard(name);
        if (existingLeaderboards.length > 0) {
            logger_1.default.warn('LDBD_DUP_NAME: A leaderboard with that name already exists');
            return errorCodes_1.ErrorCodes.LDBD_DUP_NAME;
        }
        await dao_1.LeaderboardDAO.insertLeaderboard(name);
        logger_1.default.info('Created new leaderboard ' + name);
        return true;
    }
    LeaderboardController.insertLeaderboard = insertLeaderboard;
    async function insertLeaderboardColumn(command) {
        if (command.arguments.length < 2 || command.arguments.length > 3) {
            logger_1.default.warn('LDBD_BAD_PARAM: Incorrect number of parameters provided');
            return errorCodes_1.ErrorCodes.LDBD_BAD_PARAM;
        }
        const leaderboardName = command.arguments[0];
        let existingLeaderboards = await dao_1.LeaderboardDAO.getLeaderboard(leaderboardName);
        if (existingLeaderboards.length == 0) {
            logger_1.default.warn('LDBD_NOT_FOUND: No leaderboard found for query');
            return errorCodes_1.ErrorCodes.LDBD_NOT_FOUND;
        }
        const id = existingLeaderboards[0].id;
        const columnName = command.arguments[1];
        let existingColumns = await dao_1.LeaderboardDAO.getLeaderboardColumn(id, columnName);
        if (existingColumns.length > 0) {
            logger_1.default.warn('LDBD_DUP_NAME: A leaderboard column with that name already exists for this leaderboard');
            return errorCodes_1.ErrorCodes.LDBD_DUP_NAME;
        }
        let columnType = columnTypes_1.ColumnTypes.DATA;
        if (command.arguments.length == 3) {
            const columnTypeStr = command.arguments[2].toUpperCase();
            const validColumnTypeStr = columnTypeStr;
            const validColumnType = columnTypes_1.ColumnTypes[validColumnTypeStr];
            if (!validColumnType) {
                return errorCodes_1.ErrorCodes.LDBD_BAD_TYPE;
            }
            columnType = validColumnTypeStr;
        }
        await dao_1.LeaderboardDAO.insertLeaderboardColumn(id, columnName, columnType);
        logger_1.default.info('Created new leaderboard column ' + id + ':' + columnName + ':' + columnType);
        return true;
    }
    LeaderboardController.insertLeaderboardColumn = insertLeaderboardColumn;
    async function updateLeaderboard(command) {
        if (command.arguments.length != 2) {
            logger_1.default.warn('LDBD_BAD_PARAM: Incorrect number of parameters provided');
            return errorCodes_1.ErrorCodes.LDBD_BAD_PARAM;
        }
        const name = command.arguments[0];
        const newName = command.arguments[1];
        let existingLeaderboards = await dao_1.LeaderboardDAO.getLeaderboard(name);
        if (existingLeaderboards.length == 0) {
            logger_1.default.warn('LDBD_NOT_FOUND: No leaderboard found for query');
            return errorCodes_1.ErrorCodes.LDBD_NOT_FOUND;
        }
        const id = existingLeaderboards[0].id;
        await dao_1.LeaderboardDAO.updateLeaderboard(id, newName);
        logger_1.default.info('Updated leaderboard ' + name + ' to ' + newName);
        return true;
    }
    LeaderboardController.updateLeaderboard = updateLeaderboard;
    async function updateLeaderboardColumn(command) {
        if (command.arguments.length != 4) {
            logger_1.default.warn('LDBD_BAD_PARAM: Incorrect number of parameters provided');
            return errorCodes_1.ErrorCodes.LDBD_BAD_PARAM;
        }
        const name = command.arguments[0];
        const existingLeaderboards = await dao_1.LeaderboardDAO.getLeaderboard(name);
        if (existingLeaderboards.length == 0) {
            logger_1.default.warn('LDBD_NOT_FOUND: No leaderboard found for query');
            return errorCodes_1.ErrorCodes.LDBD_NOT_FOUND;
        }
        const leaderboardId = existingLeaderboards[0].id;
        const columnName = command.arguments[1];
        const value = command.arguments[3];
        const existingColumns = await dao_1.LeaderboardDAO.getLeaderboardColumn(leaderboardId, columnName);
        if (existingColumns.length == 0) {
            logger_1.default.warn('LDBD_COL_NOT_FOUND: No leaderboard column found for query');
            return errorCodes_1.ErrorCodes.LDBD_COL_NOT_FOUND;
        }
        const columnId = existingColumns[0].id;
        let action = command.arguments[2];
        action = action.toUpperCase();
        const validatedAction = updateActions_1.UpdateActions[action];
        if (!validatedAction) {
            return errorCodes_1.ErrorCodes.LDBD_INVALID_PARAM;
        }
        if (validatedAction === updateActions_1.UpdateActions.TYPE) {
            // TODO: we need to some checking on the type value here - same as create.
            await dao_1.LeaderboardDAO.updateLeaderboardColumnType(leaderboardId, columnId, value);
            logger_1.default.info('Updated leaderboard column ' + existingColumns[0].name + ' to ' + value);
        }
        else if (validatedAction === updateActions_1.UpdateActions.NAME) {
            await dao_1.LeaderboardDAO.updateLeaderboardColumnName(leaderboardId, columnId, value);
            logger_1.default.info('Update leaderboard column ' + existingColumns[0].name + `'s type to ` + value);
        }
        return true;
    }
    LeaderboardController.updateLeaderboardColumn = updateLeaderboardColumn;
    async function deleteLeaderboard(command) {
        if (command.arguments.length != 1) {
            logger_1.default.warn('LDBD_BAD_PARAM: Incorrect number of parameters provided');
            return errorCodes_1.ErrorCodes.LDBD_BAD_PARAM;
        }
        const name = command.arguments[0];
        let existingLeaderboards = await dao_1.LeaderboardDAO.getLeaderboard(name);
        if (existingLeaderboards.length == 0) {
            logger_1.default.warn('LDBD_NOT_FOUND: No leaderboard found for query');
            return errorCodes_1.ErrorCodes.LDBD_NOT_FOUND;
        }
        const id = existingLeaderboards[0].id;
        await dao_1.LeaderboardDAO.deleteLeaderboardColumns(id);
        await dao_1.LeaderboardDAO.deleteLeaderboard(id);
        logger_1.default.info('Deleted leaderboard ' + name);
        return true;
    }
    LeaderboardController.deleteLeaderboard = deleteLeaderboard;
    async function deleteLeaderboardColumn(command) {
        if (command.arguments.length != 2) {
            logger_1.default.warn('LDBD_BAD_PARAM: Incorrect number of parameters provided');
            return errorCodes_1.ErrorCodes.LDBD_BAD_PARAM;
        }
        const leaderboardName = command.arguments[0];
        let existingLeaderboards = await dao_1.LeaderboardDAO.getLeaderboard(leaderboardName);
        if (existingLeaderboards.length === 0) {
            logger_1.default.warn('LDBD_NOT_FOUND: No leaderboard found for query');
            return errorCodes_1.ErrorCodes.LDBD_NOT_FOUND;
        }
        const leaderboardId = existingLeaderboards[0].id;
        const columnName = command.arguments[1];
        const existingColumns = await dao_1.LeaderboardDAO.getLeaderboardColumn(leaderboardId, columnName);
        if (existingColumns.length == 0) {
            logger_1.default.warn('LDBD_COL_NOT_FOUND: No leaderboard column found for query');
            return errorCodes_1.ErrorCodes.LDBD_COL_NOT_FOUND;
        }
        const columnId = existingColumns[0].id;
        await dao_1.LeaderboardDAO.deleteLeaderboardColumn(leaderboardId, columnId);
        logger_1.default.info('Deleted leaderboard column ' + columnName);
        return true;
    }
    LeaderboardController.deleteLeaderboardColumn = deleteLeaderboardColumn;
})(LeaderboardController = exports.LeaderboardController || (exports.LeaderboardController = {}));
//# sourceMappingURL=controller.js.map