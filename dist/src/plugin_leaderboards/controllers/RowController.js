"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LeaderboardDAO_1 = require("../dao/LeaderboardDAO");
const RowDAO_1 = require("../dao/RowDAO");
const logger_1 = require("../../core/logger");
const errorCodes_1 = require("../config/errorCodes");
var RowController;
(function (RowController) {
    async function insertLeaderboardRow(command) {
        if (command.arguments.length != 2) {
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
        const rowName = command.arguments[1];
        let existingRows = await RowDAO_1.RowDAO.getLeaderboardRow(id, rowName);
        if (existingRows.length > 0) {
            logger_1.default.warn('LDBD_DUP_NAME: A leaderboard row with that name already exists for this leaderboard');
            return errorCodes_1.ErrorCodes.LDBD_DUP_NAME;
        }
        await RowDAO_1.RowDAO.insertLeaderboardRow(id, rowName);
        logger_1.default.info('Created new leaderboard row ' + id + ':' + rowName);
        return true;
    }
    RowController.insertLeaderboardRow = insertLeaderboardRow;
})(RowController = exports.RowController || (exports.RowController = {}));
//# sourceMappingURL=RowController.js.map