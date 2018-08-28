"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dao_1 = require("../dao");
const logger_1 = require("../../core/logger");
const ReturnCodes_1 = require("../config/ReturnCodes");
const validators_1 = require("../util/validators");
var LeaderboardController;
(function (LeaderboardController) {
    async function getLeaderboards() {
        return await dao_1.LeaderboardDAO.getLeaderboards();
    }
    LeaderboardController.getLeaderboards = getLeaderboards;
    async function getLeaderboard(command) {
        if (validators_1.commandHasCorrectArgumentsLength(command, 1)) {
            logger_1.default.warn(`${ReturnCodes_1.ReturnCodes.INCORRECT_PARAM_LENGTH} - Incorrect number of parameters provided`);
            return ReturnCodes_1.ReturnCodes.INCORRECT_PARAM_LENGTH;
        }
        const leaderboardName = command.arguments[0];
        const leaderboard = await dao_1.LeaderboardDAO.getLeaderboard(leaderboardName);
        if (!leaderboard) {
            logger_1.default.warn(`${ReturnCodes_1.ReturnCodes.LEADERBOARD_NOT_FOUND} - No leaderboard found for the given name`);
            return ReturnCodes_1.ReturnCodes.LEADERBOARD_NOT_FOUND;
        }
        const columns = await dao_1.ColumnDAO.getLeaderboardColumns(leaderboard.id);
        const rows = await dao_1.RowDAO.getLeaderboardRows(leaderboard.id);
        const values = await dao_1.ValueDAO.getValues(leaderboard.id);
        const leaderboardObj = {
            id: leaderboard.id,
            name: leaderboard.name,
            rows: rows,
            columns: columns,
            values: values
        };
        return leaderboardObj;
    }
    LeaderboardController.getLeaderboard = getLeaderboard;
    async function insertLeaderboard(command) {
        if (validators_1.commandHasCorrectArgumentsLength(command, 1)) {
            logger_1.default.warn(`${ReturnCodes_1.ReturnCodes.INCORRECT_PARAM_LENGTH} - Incorrect number of parameters provided`);
            return ReturnCodes_1.ReturnCodes.INCORRECT_PARAM_LENGTH;
        }
        const leaderboardName = command.arguments[0];
        const leaderboardId = await validators_1.getLeaderboardId(leaderboardName);
        if (leaderboardId > -1) {
            logger_1.default.warn(`${ReturnCodes_1.ReturnCodes.LEADERBOARD_NOT_FOUND} - A leaderboard with that name already exists`);
            return ReturnCodes_1.ReturnCodes.LEADERBOARD_NOT_FOUND;
        }
        await dao_1.LeaderboardDAO.insertLeaderboard(name);
        logger_1.default.info(`Created new leaderboard ${name}`);
        return ReturnCodes_1.ReturnCodes.SUCCESS;
    }
    LeaderboardController.insertLeaderboard = insertLeaderboard;
    async function updateLeaderboard(command) {
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
        const newName = command.arguments[1];
        await dao_1.LeaderboardDAO.updateLeaderboard(leaderboardId, newName);
        logger_1.default.info(`Updated leaderboard ${name} to ${newName}`);
        return ReturnCodes_1.ReturnCodes.SUCCESS;
    }
    LeaderboardController.updateLeaderboard = updateLeaderboard;
    async function deleteLeaderboard(command) {
        if (validators_1.commandHasCorrectArgumentsLength(command, 1)) {
            logger_1.default.warn(`${ReturnCodes_1.ReturnCodes.INCORRECT_PARAM_LENGTH} - Incorrect number of parameters provided`);
            return ReturnCodes_1.ReturnCodes.INCORRECT_PARAM_LENGTH;
        }
        const leaderboardName = command.arguments[0];
        const leaderboardId = await validators_1.getLeaderboardId(leaderboardName);
        if (leaderboardId === -1) {
            logger_1.default.warn(`${ReturnCodes_1.ReturnCodes.LEADERBOARD_NOT_FOUND} - No leaderboard found for the given name`);
            return ReturnCodes_1.ReturnCodes.LEADERBOARD_NOT_FOUND;
        }
        await dao_1.ValueDAO.deleteValueByLeaderboard(leaderboardId);
        await dao_1.RowDAO.deleteLeaderboardRows(leaderboardId);
        await dao_1.ColumnDAO.deleteLeaderboardColumns(leaderboardId);
        await dao_1.LeaderboardDAO.deleteLeaderboard(leaderboardId);
        logger_1.default.info(`Deleted leaderboard ${name}`);
        return ReturnCodes_1.ReturnCodes.SUCCESS;
    }
    LeaderboardController.deleteLeaderboard = deleteLeaderboard;
})(LeaderboardController = exports.LeaderboardController || (exports.LeaderboardController = {}));
//# sourceMappingURL=LeaderboardController.js.map