"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataManager_1 = require("../../core/dataManager");
var ColumnDAO;
(function (ColumnDAO) {
    async function getLeaderboardColumns(leaderboardId) {
        let query = `SELECT * FROM leaderboard_columns WHERE leaderboard_id = $1`;
        let params = [leaderboardId];
        return await dataManager_1.DataManager.query(query, params);
    }
    ColumnDAO.getLeaderboardColumns = getLeaderboardColumns;
    async function getLeaderboardColumn(leaderboardId, columnName) {
        let query = `SELECT * FROM leaderboard_columns WHERE leaderboard_id = $1 AND name = $2`;
        let params = [leaderboardId, columnName];
        const columnResult = await dataManager_1.DataManager.query(query, params);
        if (columnResult.length > 0) {
            return columnResult[0];
        }
        else {
            return null;
        }
    }
    ColumnDAO.getLeaderboardColumn = getLeaderboardColumn;
    async function insertLeaderboardColumn(leaderboardId, name, type) {
        let query = `INSERT INTO leaderboard_columns VALUES (DEFAULT, $1, $2, $3)`;
        let params = [leaderboardId, name, type];
        await dataManager_1.DataManager.query(query, params);
        return;
    }
    ColumnDAO.insertLeaderboardColumn = insertLeaderboardColumn;
    async function updateLeaderboardColumnName(leaderboardId, id, name) {
        let query = `UPDATE leaderboard_columns SET name = ($3) WHERE leaderboard_id = ($1) AND id = ($2)`;
        let params = [leaderboardId, id, name];
        await dataManager_1.DataManager.query(query, params);
        return;
    }
    ColumnDAO.updateLeaderboardColumnName = updateLeaderboardColumnName;
    async function updateLeaderboardColumnType(leaderboardId, id, type) {
        let query = `UPDATE leaderboard_columns SET type = ($3) WHERE leaderboard_id = ($1) AND id = ($2)`;
        let params = [leaderboardId, id, type];
        await dataManager_1.DataManager.query(query, params);
        return;
    }
    ColumnDAO.updateLeaderboardColumnType = updateLeaderboardColumnType;
    async function deleteLeaderboardColumns(leaderboardId) {
        let query = `DELETE FROM leaderboard_columns WHERE leaderboard_id = ($1)`;
        let params = [leaderboardId];
        await dataManager_1.DataManager.query(query, params);
        return;
    }
    ColumnDAO.deleteLeaderboardColumns = deleteLeaderboardColumns;
    async function deleteLeaderboardColumn(leaderboardId, id) {
        let query = `DELETE FROM leaderboard_columns WHERE leaderboard_id = ($1) AND id = ($2)`;
        let params = [leaderboardId, id];
        await dataManager_1.DataManager.query(query, params);
        return;
    }
    ColumnDAO.deleteLeaderboardColumn = deleteLeaderboardColumn;
})(ColumnDAO = exports.ColumnDAO || (exports.ColumnDAO = {}));
//# sourceMappingURL=ColumnDAO.js.map