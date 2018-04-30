"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LeaderboardDAO_1 = require("../dao/LeaderboardDAO");
const ColumnDAO_1 = require("../dao/ColumnDAO");
const logger_1 = require("../../core/logger");
const errorCodes_1 = require("../config/errorCodes");
const updateActions_1 = require("../config/updateActions");
const columnTypes_1 = require("../config/columnTypes");
var ColumnController;
(function (ColumnController) {
    async function insertLeaderboardColumn(command) {
        if (command.arguments.length < 2 || command.arguments.length > 3) {
            logger_1.default.warn('LDBD_BAD_PARAM: Incorrect number of parameters provided');
            return errorCodes_1.ErrorCodes.LDBD_BAD_PARAM;
        }
        const leaderboardName = command.arguments[0];
        let existingLeaderboards = await LeaderboardDAO_1.LeaderboardDAO.getLeaderboard(leaderboardName);
        if (existingLeaderboards.length == 0) {
            logger_1.default.warn('LDBD_NOT_FOUND: No leaderboard found for query');
            return errorCodes_1.ErrorCodes.LDBD_NOT_FOUND;
        }
        const id = existingLeaderboards[0].id;
        const columnName = command.arguments[1];
        let existingColumns = await ColumnDAO_1.ColumnDAO.getLeaderboardColumn(id, columnName);
        if (existingColumns.length > 0) {
            logger_1.default.warn('LDBD_DUP_NAME: A leaderboard column with that name already exists for this leaderboard');
            return errorCodes_1.ErrorCodes.LDBD_DUP_NAME;
        }
        let columnType = columnTypes_1.ColumnTypes.DATA;
        if (command.arguments.length == 3) {
            const columnTypeStr = command.arguments[2].toUpperCase();
            const validColumnType = columnTypes_1.ColumnTypes[columnTypeStr];
            if (!validColumnType) {
                return errorCodes_1.ErrorCodes.LDBD_BAD_TYPE;
            }
            columnType = columnTypeStr;
        }
        await ColumnDAO_1.ColumnDAO.insertLeaderboardColumn(id, columnName, columnType);
        logger_1.default.info('Created new leaderboard column ' + id + ':' + columnName + ':' + columnType);
        return true;
    }
    ColumnController.insertLeaderboardColumn = insertLeaderboardColumn;
    async function updateLeaderboardColumn(command) {
        if (command.arguments.length != 4) {
            logger_1.default.warn('LDBD_BAD_PARAM: Incorrect number of parameters provided');
            return errorCodes_1.ErrorCodes.LDBD_BAD_PARAM;
        }
        const name = command.arguments[0];
        const existingLeaderboards = await LeaderboardDAO_1.LeaderboardDAO.getLeaderboard(name);
        if (existingLeaderboards.length == 0) {
            logger_1.default.warn('LDBD_NOT_FOUND: No leaderboard found for query');
            return errorCodes_1.ErrorCodes.LDBD_NOT_FOUND;
        }
        const leaderboardId = existingLeaderboards[0].id;
        const columnName = command.arguments[1];
        const value = command.arguments[3];
        const existingColumns = await ColumnDAO_1.ColumnDAO.getLeaderboardColumn(leaderboardId, columnName);
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
            const columnTypeStr = command.arguments[3].toUpperCase();
            const validColumnType = columnTypes_1.ColumnTypes[columnTypeStr];
            if (!validColumnType) {
                return errorCodes_1.ErrorCodes.LDBD_BAD_TYPE;
            }
            await ColumnDAO_1.ColumnDAO.updateLeaderboardColumnType(leaderboardId, columnId, columnTypeStr);
            logger_1.default.info('Updated leaderboard column ' + existingColumns[0].name + ' to ' + columnTypeStr);
        }
        else if (validatedAction === updateActions_1.UpdateActions.NAME) {
            await ColumnDAO_1.ColumnDAO.updateLeaderboardColumnName(leaderboardId, columnId, value);
            logger_1.default.info('Update leaderboard column ' + existingColumns[0].name + `'s type to ` + value);
        }
        return true;
    }
    ColumnController.updateLeaderboardColumn = updateLeaderboardColumn;
    async function deleteLeaderboardColumn(command) {
        if (command.arguments.length != 2) {
            logger_1.default.warn('LDBD_BAD_PARAM: Incorrect number of parameters provided');
            return errorCodes_1.ErrorCodes.LDBD_BAD_PARAM;
        }
        const leaderboardName = command.arguments[0];
        let existingLeaderboards = await LeaderboardDAO_1.LeaderboardDAO.getLeaderboard(leaderboardName);
        if (existingLeaderboards.length === 0) {
            logger_1.default.warn('LDBD_NOT_FOUND: No leaderboard found for query');
            return errorCodes_1.ErrorCodes.LDBD_NOT_FOUND;
        }
        const leaderboardId = existingLeaderboards[0].id;
        const columnName = command.arguments[1];
        const existingColumns = await ColumnDAO_1.ColumnDAO.getLeaderboardColumn(leaderboardId, columnName);
        if (existingColumns.length == 0) {
            logger_1.default.warn('LDBD_COL_NOT_FOUND: No leaderboard column found for query');
            return errorCodes_1.ErrorCodes.LDBD_COL_NOT_FOUND;
        }
        const columnId = existingColumns[0].id;
        await ColumnDAO_1.ColumnDAO.deleteLeaderboardColumn(leaderboardId, columnId);
        logger_1.default.info('Deleted leaderboard column ' + columnName);
        return true;
    }
    ColumnController.deleteLeaderboardColumn = deleteLeaderboardColumn;
})(ColumnController = exports.ColumnController || (exports.ColumnController = {}));
//# sourceMappingURL=ColumnController.js.map