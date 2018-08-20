"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../../core/logger");
const ReturnCodes_1 = require("../config/ReturnCodes");
const dao_1 = require("../dao");
const validators_1 = require("../util/validators");
var ValueController;
(function (ValueController) {
    async function upsertValue(command) {
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
        const rowName = command.arguments[2];
        const rowId = await validators_1.getRowId(leaderboardId, rowName);
        if (rowId > -1) {
            logger_1.default.warn(`${ReturnCodes_1.ReturnCodes.ROW_NOT_FOUND} - A leaderboard row with that name does not exist`);
            return ReturnCodes_1.ReturnCodes.ROW_NOT_FOUND;
        }
        let value = command.arguments[3];
        await dao_1.ValueDAO.upsertValue(columnId, rowId, value);
        logger_1.default.info(`Upserted leaderboard value ${value} in column ${columnName} and row ${rowName}`);
        return ReturnCodes_1.ReturnCodes.SUCCESS;
    }
    ValueController.upsertValue = upsertValue;
})(ValueController = exports.ValueController || (exports.ValueController = {}));
//# sourceMappingURL=ValueController.js.map