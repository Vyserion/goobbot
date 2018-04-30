"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataManager_1 = require("../../core/dataManager");
const logger_1 = require("../../core/logger");
var ColumnDAO;
(function (ColumnDAO) {
    async function getLeaderboardColumns(leaderboardId) {
        let query = ` SELECT * FROM leaderboard_columns WHERE leaderboard_id = $1`;
        let params = [leaderboardId];
        try {
            let results = await dataManager_1.DataManager.query(query, params);
            return results;
        }
        catch (e) {
            logger_1.default.error('Unexpected error when getting leaderboard');
            logger_1.default.error(e);
            return;
        }
    }
    ColumnDAO.getLeaderboardColumns = getLeaderboardColumns;
    async function getLeaderboardColumn(leaderboardId, columnName) {
        let query = ` SELECT * FROM leaderboard_columns WHERE leaderboard_id = $1 AND name = $2`;
        let params = [leaderboardId, columnName];
        try {
            let results = await dataManager_1.DataManager.query(query, params);
            return results;
        }
        catch (e) {
            logger_1.default.error('Unexpected error when getting leaderboard');
            logger_1.default.error(e);
            return;
        }
    }
    ColumnDAO.getLeaderboardColumn = getLeaderboardColumn;
    async function insertLeaderboardColumn(leaderboardId, name, type) {
        let query = ' INSERT INTO leaderboard_columns VALUES (DEFAULT, $1, $2, $3)';
        let params = [leaderboardId, name, type];
        try {
            let results = await dataManager_1.DataManager.query(query, params);
            return results;
        }
        catch (e) {
            logger_1.default.error('Unexpected error when inserting leaderboard column');
            logger_1.default.error(e);
            return;
        }
    }
    ColumnDAO.insertLeaderboardColumn = insertLeaderboardColumn;
    async function updateLeaderboardColumnName(leaderboardId, id, name) {
        let query = ` UPDATE leaderboard_columns SET name = ($3) WHERE leaderboard_id = ($1) AND id = ($2)`;
        let params = [leaderboardId, id, name];
        try {
            let results = await dataManager_1.DataManager.query(query, params);
            return results;
        }
        catch (e) {
            logger_1.default.error('Unexpected error when updating leaderboard column');
            logger_1.default.error(e);
            return;
        }
    }
    ColumnDAO.updateLeaderboardColumnName = updateLeaderboardColumnName;
    async function updateLeaderboardColumnType(leaderboardId, id, type) {
        let query = ` UPDATE leaderboard_columns SET type = ($3) WHERE leaderboard_id = ($1) AND id = ($2)`;
        let params = [leaderboardId, id, type];
        try {
            let results = await dataManager_1.DataManager.query(query, params);
            return results;
        }
        catch (e) {
            logger_1.default.error('Unexpected error when updating leaderboard column');
            logger_1.default.error(e);
            return;
        }
    }
    ColumnDAO.updateLeaderboardColumnType = updateLeaderboardColumnType;
    async function deleteLeaderboardColumns(leaderboardId) {
        let query = ` DELETE FROM leaderboard_columns WHERE leaderboard_id = ($1)`;
        let params = [leaderboardId];
        try {
            let results = await dataManager_1.DataManager.query(query, params);
            return results;
        }
        catch (e) {
            logger_1.default.error('Unexpected error when deleting leaderboard columns');
            logger_1.default.error(e);
            return;
        }
    }
    ColumnDAO.deleteLeaderboardColumns = deleteLeaderboardColumns;
    async function deleteLeaderboardColumn(leaderboardId, id) {
        let query = ` DELETE FROM leaderboard_columns WHERE leaderboard_id = ($1) AND id = ($2)`;
        let params = [leaderboardId, id];
        try {
            let results = await dataManager_1.DataManager.query(query, params);
            return results;
        }
        catch (e) {
            logger_1.default.error('Unexpected error when deleting leaderboard column');
            logger_1.default.error(e);
            return;
        }
    }
    ColumnDAO.deleteLeaderboardColumn = deleteLeaderboardColumn;
})(ColumnDAO = exports.ColumnDAO || (exports.ColumnDAO = {}));
//# sourceMappingURL=ColumnDAO.js.map