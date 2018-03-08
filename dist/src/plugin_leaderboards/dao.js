"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataManager_1 = require("../core/dataManager");
const logger_1 = require("../core/logger");
class LeaderboardDAO {
    constructor() {
        this.getLeaderboards = () => {
            let query = ` SELECT * FROM leaderboards`;
            logger_1.default.debug('Running query:');
            logger_1.default.debug(query);
            try {
                let results = dataManager_1.DataManager.query(query);
                return results;
            }
            catch (e) {
                logger_1.default.error('Unexpected error when inserting leaderboard');
                logger_1.default.error(e);
                return;
            }
        };
        this.getLeaderboard = (name) => {
            let query = ` SELECT * FROM leaderboards WHERE name = ($1)`;
            let params = [name];
            logger_1.default.debug('Running query');
            logger_1.default.debug(query);
            try {
                let results = dataManager_1.DataManager.query(query, params);
                return results;
            }
            catch (e) {
                logger_1.default.error('Unexpected error when getting leaderboard');
                logger_1.default.error(e);
                return;
            }
        };
        this.insertLeaderboard = (name) => {
            let query = ` INSERT INTO leaderboards VALUES (DEFAULT, $1)`;
            let params = [name];
            // TODO: WE NEED TO DO SOMETHING WITH NAMES WITH SPACES HERE - hash the name?
            logger_1.default.debug('Running query:');
            logger_1.default.debug(query);
            try {
                let results = dataManager_1.DataManager.query(query, params);
                return results;
            }
            catch (e) {
                logger_1.default.error('Unexpected error when inserting leaderboard');
                logger_1.default.error(e);
                return;
            }
        };
        this.updateLeaderboard = (id, name) => {
            let query = ` UPDATE leaderboards SET name = ($1) WHERE id = ($2)`;
            let params = [name, id];
            logger_1.default.debug('Running query');
            logger_1.default.debug(query);
            try {
                let results = dataManager_1.DataManager.query(query, params);
                return results;
            }
            catch (e) {
                logger_1.default.error('Unexpected error when updating leaderboard');
                logger_1.default.error(e);
                return;
            }
        };
        this.deleteLeaderboard = (id) => {
            let query = ` DELETE FROM leaderboards WHERE id = ($1)`;
            let params = [id];
            logger_1.default.debug('Running query');
            logger_1.default.debug(query);
            try {
                let results = dataManager_1.DataManager.query(query, params);
                return results;
            }
            catch (e) {
                logger_1.default.error('Unexpected error when deleting leaderboard');
                logger_1.default.error(e);
                return;
            }
        };
    }
}
exports.LeaderboardDAO = LeaderboardDAO;
//# sourceMappingURL=dao.js.map