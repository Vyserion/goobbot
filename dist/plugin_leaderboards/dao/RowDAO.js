"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataManager_1 = require("../../core/dataManager");
var RowDAO;
(function (RowDAO) {
    async function getLeaderboardRows(leaderboardId) {
        let query = `SELECT * FROM leaderboard_rows WHERE leaderboard_id = $1`;
        let params = [leaderboardId];
        return (await dataManager_1.DataManager.query(query, params));
    }
    RowDAO.getLeaderboardRows = getLeaderboardRows;
    async function getLeaderboardRow(leaderboardId, rowName) {
        let query = `SELECT * FROM leaderboard_rows WHERE leaderboard_id = $1 AND name = $2`;
        let params = [leaderboardId, rowName];
        const rowResult = await dataManager_1.DataManager.query(query, params);
        if (rowResult.length > 0) {
            return rowResult[0];
        }
        else {
            return null;
        }
    }
    RowDAO.getLeaderboardRow = getLeaderboardRow;
    async function insertLeaderboardRow(leaderboardId, rowName) {
        let query = `INSERT INTO leaderboard_rows VALUES (DEFAULT, $1, $2)`;
        let params = [leaderboardId, rowName];
        await dataManager_1.DataManager.query(query, params);
        return;
    }
    RowDAO.insertLeaderboardRow = insertLeaderboardRow;
    async function updateLeaderboardRow(leaderboardRowId, newRowName) {
        let query = `UPDATE leaderboard_rows SET name = ($2) WHERE ID = ($1)`;
        let params = [leaderboardRowId, newRowName];
        await dataManager_1.DataManager.query(query, params);
        return;
    }
    RowDAO.updateLeaderboardRow = updateLeaderboardRow;
    async function deleteLeaderboardRows(leaderboardId) {
        const query = `DELETE FROM leaderboard_rows WHERE leaderboard_id = ($1)`;
        const params = [leaderboardId];
        await dataManager_1.DataManager.query(query, params);
        return;
    }
    RowDAO.deleteLeaderboardRows = deleteLeaderboardRows;
    async function deleteLeaderboardRow(leaderboardRowId) {
        const query = `DELETE FROM leaderboard_rows WHERE id = ($1)`;
        const params = [leaderboardRowId];
        await dataManager_1.DataManager.query(query, params);
        return;
    }
    RowDAO.deleteLeaderboardRow = deleteLeaderboardRow;
})(RowDAO = exports.RowDAO || (exports.RowDAO = {}));
//# sourceMappingURL=RowDAO.js.map