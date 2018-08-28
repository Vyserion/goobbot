"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataManager_1 = require("../../core/dataManager");
var ValueDAO;
(function (ValueDAO) {
    async function getValues(leaderboardId) {
        const query = `SELECT l.id AS leaderboard_id, lr.id AS rowId, lc.id AS columnId, lv.value
		FROM leaderboard_values lv
		JOIN leaderboard_rows lr ON lr.id = lv.leaderboard_row_id
		JOIN leaderboard_columns lc ON lc.id = lv.leaderboard_col_id
		JOIN leaderboards l ON l.id = lr.leaderboard_id AND l.id = lc.leaderboard_id
		WHERE l.id = $1;`;
        const params = [leaderboardId];
        await dataManager_1.DataManager.query(query, params);
        return;
    }
    ValueDAO.getValues = getValues;
    async function upsertValue(leaderboardColumnId, leaderboardRowId, value) {
        const query = `INSERT INTO leaderboard_values VALUES (DEFAULT, $1, $2, $3) ON CONFLICT (leaderboard_col_id, leaderboard_row_id) DO UPDATE SET value = $3`;
        const params = [leaderboardColumnId, leaderboardRowId, value];
        await dataManager_1.DataManager.query(query, params);
        return;
    }
    ValueDAO.upsertValue = upsertValue;
    async function deleteValuesByRow(leaderboardRowId) {
        const query = `DELETE FROM leaderboard_values WHERE leaderboard_row_id = (?)`;
        const params = [leaderboardRowId];
        await dataManager_1.DataManager.query(query, params);
        return;
    }
    ValueDAO.deleteValuesByRow = deleteValuesByRow;
    async function deleteValuesByColumn(leaderboardColumnId) {
        const query = `DELETE FROM leaderboard_values WHERE leaderboard_col_id = (?)`;
        const params = [leaderboardColumnId];
        await dataManager_1.DataManager.query(query, params);
        return;
    }
    ValueDAO.deleteValuesByColumn = deleteValuesByColumn;
    async function deleteValueByLeaderboard(leaderboardId) {
        const query = `DELETE FROM leaderboard_values
        WHERE leaderboard_col_id IN (SELECT id FROM leaderboard_columns WHERE leaderboard_id = ?)
        AND leaderboard_row_id IN (SELECT id FROM leaderboard_rows WHERE leaderboard_id = ?)`;
        const params = [leaderboardId, leaderboardId];
        await dataManager_1.DataManager.query(query, params);
        return;
    }
    ValueDAO.deleteValueByLeaderboard = deleteValueByLeaderboard;
})(ValueDAO = exports.ValueDAO || (exports.ValueDAO = {}));
//# sourceMappingURL=ValueDAO.js.map