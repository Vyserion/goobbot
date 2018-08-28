"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataManager_1 = require("../../core/dataManager");
var LeaderboardDAO;
(function (LeaderboardDAO) {
    async function getLeaderboards() {
        const query = `SELECT * FROM leaderboards`;
        return (await dataManager_1.DataManager.query(query));
    }
    LeaderboardDAO.getLeaderboards = getLeaderboards;
    async function getLeaderboard(name) {
        let query = `SELECT * FROM leaderboards WHERE name = $1`;
        let params = [name];
        const rowResult = (await dataManager_1.DataManager.query(query, params));
        if (rowResult.length > 0) {
            return rowResult[0];
        }
        else {
            return null;
        }
    }
    LeaderboardDAO.getLeaderboard = getLeaderboard;
    async function insertLeaderboard(name) {
        let query = `INSERT INTO leaderboards VALUES (DEFAULT, $1)`;
        let params = [name];
        await dataManager_1.DataManager.query(query, params);
        return;
    }
    LeaderboardDAO.insertLeaderboard = insertLeaderboard;
    async function updateLeaderboard(id, name) {
        let query = `UPDATE leaderboards SET name = ($1) WHERE id = ($2)`;
        let params = [name, id];
        await dataManager_1.DataManager.query(query, params);
        return;
    }
    LeaderboardDAO.updateLeaderboard = updateLeaderboard;
    async function deleteLeaderboard(id) {
        let query = `DELETE FROM leaderboards WHERE id = ($1)`;
        let params = [id];
        await dataManager_1.DataManager.query(query, params);
        return;
    }
    LeaderboardDAO.deleteLeaderboard = deleteLeaderboard;
})(LeaderboardDAO = exports.LeaderboardDAO || (exports.LeaderboardDAO = {}));
//# sourceMappingURL=LeaderboardDAO.js.map