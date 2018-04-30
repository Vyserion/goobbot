"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dao_1 = require("../dao");
const Leaderboard_1 = require("../models/Leaderboard");
const logger_1 = require("../../core/logger");
const errorCodes_1 = require("../config/errorCodes");
const Column_1 = require("../models/Column");
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
})(LeaderboardController = exports.LeaderboardController || (exports.LeaderboardController = {}));
//# sourceMappingURL=LeaderboardController.js.map