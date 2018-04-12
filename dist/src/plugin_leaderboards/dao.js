"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataManager_1 = require("../core/dataManager");
const logger_1 = require("../core/logger");
var LeaderboardDAO;
(function (LeaderboardDAO) {
    async function getLeaderboards() {
        let query = ` SELECT * FROM leaderboards`;
        try {
            let results = await dataManager_1.DataManager.query(query);
            return results;
        }
        catch (e) {
            logger_1.default.error('Unexpected error when inserting leaderboard');
            logger_1.default.error(e);
            return;
        }
    }
    LeaderboardDAO.getLeaderboards = getLeaderboards;
    async function getLeaderboard(name) {
        let query = ` SELECT * FROM leaderboards WHERE name = $1`;
        let params = [name];
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
    LeaderboardDAO.getLeaderboard = getLeaderboard;
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
    LeaderboardDAO.getLeaderboardColumns = getLeaderboardColumns;
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
    LeaderboardDAO.getLeaderboardColumn = getLeaderboardColumn;
    async function insertLeaderboard(name) {
        let query = ` INSERT INTO leaderboards VALUES (DEFAULT, $1)`;
        let params = [name];
        try {
            let results = await dataManager_1.DataManager.query(query, params);
            return results;
        }
        catch (e) {
            logger_1.default.error('Unexpected error when inserting leaderboard');
            logger_1.default.error(e);
            return;
        }
    }
    LeaderboardDAO.insertLeaderboard = insertLeaderboard;
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
    LeaderboardDAO.insertLeaderboardColumn = insertLeaderboardColumn;
    async function updateLeaderboard(id, name) {
        let query = ` UPDATE leaderboards SET name = ($1) WHERE id = ($2)`;
        let params = [name, id];
        try {
            let results = await dataManager_1.DataManager.query(query, params);
            return results;
        }
        catch (e) {
            logger_1.default.error('Unexpected error when updating leaderboard');
            logger_1.default.error(e);
            return;
        }
    }
    LeaderboardDAO.updateLeaderboard = updateLeaderboard;
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
    LeaderboardDAO.updateLeaderboardColumnName = updateLeaderboardColumnName;
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
    LeaderboardDAO.updateLeaderboardColumnType = updateLeaderboardColumnType;
    async function deleteLeaderboard(id) {
        let query = ` DELETE FROM leaderboards WHERE id = ($1)`;
        let params = [id];
        try {
            let results = await dataManager_1.DataManager.query(query, params);
            return results;
        }
        catch (e) {
            logger_1.default.error('Unexpected error when deleting leaderboard');
            logger_1.default.error(e);
            return;
        }
    }
    LeaderboardDAO.deleteLeaderboard = deleteLeaderboard;
})(LeaderboardDAO = exports.LeaderboardDAO || (exports.LeaderboardDAO = {}));
//# sourceMappingURL=dao.js.map