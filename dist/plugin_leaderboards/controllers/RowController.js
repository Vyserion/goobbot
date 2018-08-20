"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dao_1 = require("../dao");
const logger_1 = require("../../core/logger");
const ReturnCodes_1 = require("../config/ReturnCodes");
const validators_1 = require("../util/validators");
var RowController;
(function (RowController) {
    async function insertLeaderboardRow(command) {
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
        const rowName = command.arguments[1];
        const rowId = await validators_1.getRowId(leaderboardId, rowName);
        if (rowId === -1) {
            logger_1.default.warn(`${ReturnCodes_1.ReturnCodes.LEADERBOARD_DUPLICATE_NAME} - A leaderboard row with that name already exists`);
            return ReturnCodes_1.ReturnCodes.LEADERBOARD_DUPLICATE_NAME;
        }
        await dao_1.RowDAO.insertLeaderboardRow(leaderboardId, rowName);
        logger_1.default.info(`Created new leaderboard row ${leaderboardId}:${rowName}`);
        return ReturnCodes_1.ReturnCodes.SUCCESS;
    }
    RowController.insertLeaderboardRow = insertLeaderboardRow;
    async function updateLeaderboardRow(command) {
        if (validators_1.commandHasCorrectArgumentsLength(command, 3)) {
            logger_1.default.warn(`${ReturnCodes_1.ReturnCodes.INCORRECT_PARAM_LENGTH} - Incorrect number of parameters provided`);
            return ReturnCodes_1.ReturnCodes.INCORRECT_PARAM_LENGTH;
        }
        const leaderboardName = command.arguments[0];
        const leaderboardId = await validators_1.getLeaderboardId(leaderboardName);
        if (leaderboardId === -1) {
            logger_1.default.warn(`${ReturnCodes_1.ReturnCodes.LEADERBOARD_NOT_FOUND} - No leaderboard found for the given name`);
            return ReturnCodes_1.ReturnCodes.LEADERBOARD_NOT_FOUND;
        }
        const rowName = command.arguments[1];
        const rowId = await validators_1.getRowId(leaderboardId, rowName);
        if (rowId > -1) {
            logger_1.default.warn(`${ReturnCodes_1.ReturnCodes.ROW_NOT_FOUND} - A leaderboard row with that name does not exist`);
            return ReturnCodes_1.ReturnCodes.ROW_NOT_FOUND;
        }
        const newRowName = command.arguments[2];
        await dao_1.RowDAO.updateLeaderboardRow(rowId, newRowName);
        logger_1.default.info(`Updated leaderboard row ${rowId} to ${newRowName}`);
        return ReturnCodes_1.ReturnCodes.SUCCESS;
    }
    RowController.updateLeaderboardRow = updateLeaderboardRow;
    async function deleteLeaderboardRow(command) {
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
        const rowName = command.arguments[1];
        const rowId = await validators_1.getRowId(leaderboardId, rowName);
        if (rowId > -1) {
            logger_1.default.warn(`${ReturnCodes_1.ReturnCodes.ROW_NOT_FOUND} - A leaderboard row with that name does not exist`);
            return ReturnCodes_1.ReturnCodes.ROW_NOT_FOUND;
        }
        await dao_1.ValueDAO.deleteValuesByRow(rowId);
        await dao_1.RowDAO.deleteLeaderboardRow(rowId);
        logger_1.default.info(`Deleted leaderboard row ${rowName}`);
        return ReturnCodes_1.ReturnCodes.SUCCESS;
    }
    RowController.deleteLeaderboardRow = deleteLeaderboardRow;
})(RowController = exports.RowController || (exports.RowController = {}));
//# sourceMappingURL=RowController.js.map