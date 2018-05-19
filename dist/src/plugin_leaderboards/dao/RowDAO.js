"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataManager_1 = require("../../core/dataManager");
const logger_1 = require("../../core/logger");
var RowDAO;
(function (RowDAO) {
    async function insertLeaderboardRow(leaderboardId, rowName) {
        let query = ` INSERT INTO leaderboard_rows VALUES (DEFAULT, $1, $2)`;
        let params = [leaderboardId, rowName];
        try {
            let results = await dataManager_1.DataManager.query(query, params);
            return results;
        }
        catch (e) {
            logger_1.default.error('Unexpected error when inserting leaderboard row');
            logger_1.default.error(e);
            return;
        }
    }
    RowDAO.insertLeaderboardRow = insertLeaderboardRow;
})(RowDAO = exports.RowDAO || (exports.RowDAO = {}));
//# sourceMappingURL=RowDAO.js.map