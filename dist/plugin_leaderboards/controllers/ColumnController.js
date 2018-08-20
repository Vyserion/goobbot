"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dao_1 = require("../dao");
const logger_1 = require("../../core/logger");
const ReturnCodes_1 = require("../config/ReturnCodes");
const UpdateActions_1 = require("../config/UpdateActions");
const ColumnTypes_1 = require("../config/ColumnTypes");
const validators_1 = require("../util/validators");
var ColumnController;
(function (ColumnController) {
    async function insertLeaderboardColumn(command) {
        if (validators_1.commandHasCorrectArgumentsLength(command, 2, 3)) {
            logger_1.default.warn(`${ReturnCodes_1.ReturnCodes.INCORRECT_PARAM_LENGTH} - Incorrect number of parameters provided`);
            return ReturnCodes_1.ReturnCodes.INCORRECT_PARAM_LENGTH;
        }
        const leaderboardName = command.arguments[0];
        const leaderboardId = await validators_1.getLeaderboardId(leaderboardName);
        if (leaderboardId === -1) {
            logger_1.default.warn(`${ReturnCodes_1.ReturnCodes.LEADERBOARD_NOT_FOUND} - No leaderboard found for the given name`);
            return ReturnCodes_1.ReturnCodes.LEADERBOARD_NOT_FOUND;
        }
        const columnName = command.arguments[1];
        const columnId = await validators_1.getColumnId(leaderboardId, columnName);
        if (columnId > -1) {
            logger_1.default.warn(`${ReturnCodes_1.ReturnCodes.LEADERBOARD_DUPLICATE_NAME} - A leaderboard column with that name already exists`);
            return ReturnCodes_1.ReturnCodes.LEADERBOARD_DUPLICATE_NAME;
        }
        let columnType = ColumnTypes_1.ColumnTypes.DATA;
        if (command.arguments.length == 3) {
            const columnTypeStr = command.arguments[2].toUpperCase();
            const validColumnType = ColumnTypes_1.ColumnTypes[columnTypeStr];
            if (!validColumnType) {
                logger_1.default.warn(`${ReturnCodes_1.ReturnCodes.BAD_PARAMETER_TYPE} - The given column type is not valid`);
                return ReturnCodes_1.ReturnCodes.BAD_PARAMETER_TYPE;
            }
            columnType = columnTypeStr;
        }
        await dao_1.ColumnDAO.insertLeaderboardColumn(leaderboardId, columnName, columnType);
        logger_1.default.info(`Created new leaderboard column ${leaderboardName}:${columnName}:${columnType}`);
        return ReturnCodes_1.ReturnCodes.SUCCESS;
    }
    ColumnController.insertLeaderboardColumn = insertLeaderboardColumn;
    async function updateLeaderboardColumn(command) {
        if (validators_1.commandHasCorrectArgumentsLength(command, 4)) {
            logger_1.default.warn(`${ReturnCodes_1.ReturnCodes.INCORRECT_PARAM_LENGTH} - Incorrect number of parameters provided`);
            return ReturnCodes_1.ReturnCodes.INCORRECT_PARAM_LENGTH;
        }
        const leaderboardName = command.arguments[0];
        const leaderboardId = await validators_1.getLeaderboardId(leaderboardName);
        if (leaderboardId === -1) {
            logger_1.default.warn(`${ReturnCodes_1.ReturnCodes.LEADERBOARD_NOT_FOUND} - No leaderboard found for the given name`);
            return ReturnCodes_1.ReturnCodes.LEADERBOARD_NOT_FOUND;
        }
        const columnName = command.arguments[1];
        const columnId = await validators_1.getColumnId(leaderboardId, columnName);
        if (columnId === -1) {
            logger_1.default.warn(`${ReturnCodes_1.ReturnCodes.LEADERBOARD_DUPLICATE_NAME} - A leaderboard column with that name does not exist`);
            return ReturnCodes_1.ReturnCodes.COLUMN_NOT_FOUND;
        }
        const action = command.arguments[2].toUpperCase();
        const validAction = UpdateActions_1.UpdateActions[action];
        if (!validAction) {
            logger_1.default.warn(`${ReturnCodes_1.ReturnCodes.INVALID_PARAMETER} - The given update action is not valid`);
            return ReturnCodes_1.ReturnCodes.INVALID_PARAMETER;
        }
        if (validAction === UpdateActions_1.UpdateActions.TYPE) {
            const columnTypeStr = command.arguments[3].toUpperCase();
            const validColumnType = ColumnTypes_1.ColumnTypes[columnTypeStr];
            if (!validColumnType) {
                logger_1.default.warn(`${ReturnCodes_1.ReturnCodes.BAD_PARAMETER_TYPE} - The given column type is not valid`);
                return ReturnCodes_1.ReturnCodes.BAD_PARAMETER_TYPE;
            }
            await dao_1.ColumnDAO.updateLeaderboardColumnType(leaderboardId, columnId, columnTypeStr);
            logger_1.default.info(`Updated leaderboard column ${columnId} to ${columnTypeStr}`);
        }
        else if (validAction === UpdateActions_1.UpdateActions.NAME) {
            const value = command.arguments[3];
            await dao_1.ColumnDAO.updateLeaderboardColumnName(leaderboardId, columnId, value);
            logger_1.default.info(`Update leaderboard column ${columnId}'s type to ${value}`);
        }
        return ReturnCodes_1.ReturnCodes.SUCCESS;
    }
    ColumnController.updateLeaderboardColumn = updateLeaderboardColumn;
    async function deleteLeaderboardColumn(command) {
        if (validators_1.commandHasCorrectArgumentsLength(command, 2)) {
            logger_1.default.warn(`${ReturnCodes_1.ReturnCodes.INCORRECT_PARAM_LENGTH} - Incorrect number of parameters provided`);
            return ReturnCodes_1.ReturnCodes.INCORRECT_PARAM_LENGTH;
        }
        const leaderboardName = command.arguments[0];
        const leaderboardId = await validators_1.getLeaderboardId(leaderboardName);
        if (leaderboardId === -1) {
            logger_1.default.warn(`${ReturnCodes_1.ReturnCodes.LEADERBOARD_NOT_FOUND} - No leaderboard found for the given name`);
            return ReturnCodes_1.ReturnCodes.LEADERBOARD_NOT_FOUND;
        }
        const columnName = command.arguments[1];
        const columnId = await validators_1.getColumnId(leaderboardId, columnName);
        if (columnId === -1) {
            logger_1.default.warn(`${ReturnCodes_1.ReturnCodes.LEADERBOARD_DUPLICATE_NAME} - A leaderboard column with that name does not exist`);
            return ReturnCodes_1.ReturnCodes.COLUMN_NOT_FOUND;
        }
        await dao_1.ValueDAO.deleteValuesByColumn(columnId);
        await dao_1.ColumnDAO.deleteLeaderboardColumn(leaderboardId, columnId);
        logger_1.default.info(`Deleted leaderboard column ${columnName}`);
        return ReturnCodes_1.ReturnCodes.SUCCESS;
    }
    ColumnController.deleteLeaderboardColumn = deleteLeaderboardColumn;
})(ColumnController = exports.ColumnController || (exports.ColumnController = {}));
//# sourceMappingURL=ColumnController.js.map