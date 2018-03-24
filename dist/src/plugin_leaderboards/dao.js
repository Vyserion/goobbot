"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataManager_1 = require("../core/dataManager");
const logger_1 = require("../core/logger");
class LeaderboardDAO {
    constructor() {
        this.getLeaderboards = () => __awaiter(this, void 0, void 0, function* () {
            let query = ` SELECT * FROM leaderboards`;
            try {
                let results = yield dataManager_1.DataManager.query(query);
                return results;
            }
            catch (e) {
                logger_1.default.error('Unexpected error when inserting leaderboard');
                logger_1.default.error(e);
                return;
            }
        });
        this.getLeaderboard = (name) => __awaiter(this, void 0, void 0, function* () {
            let query = ` SELECT * FROM leaderboards WHERE name = ($1)`;
            let params = [name];
            try {
                let results = yield dataManager_1.DataManager.query(query, params);
                return results;
            }
            catch (e) {
                logger_1.default.error('Unexpected error when getting leaderboard');
                logger_1.default.error(e);
                return;
            }
        });
        this.insertLeaderboard = (name) => __awaiter(this, void 0, void 0, function* () {
            let query = ` INSERT INTO leaderboards VALUES (DEFAULT, $1)`;
            let params = [name];
            try {
                let results = yield dataManager_1.DataManager.query(query, params);
                return results;
            }
            catch (e) {
                logger_1.default.error('Unexpected error when inserting leaderboard');
                logger_1.default.error(e);
                return;
            }
        });
        this.insertLeaderboardColumn = (leaderboardId, name, type) => __awaiter(this, void 0, void 0, function* () {
            let query = ' INSERT INTO leaderboardColumns VALUES (DEFAULT, $1, $2, $3)';
            let params = [leaderboardId, name, type];
            try {
                let results = yield dataManager_1.DataManager.query(query, params);
                return results;
            }
            catch (e) {
                logger_1.default.error('Unexpected error when inserting leaderboard column');
                logger_1.default.error(e);
                return;
            }
        });
        this.updateLeaderboard = (id, name) => __awaiter(this, void 0, void 0, function* () {
            let query = ` UPDATE leaderboards SET name = ($1) WHERE id = ($2)`;
            let params = [name, id];
            try {
                let results = yield dataManager_1.DataManager.query(query, params);
                return results;
            }
            catch (e) {
                logger_1.default.error('Unexpected error when updating leaderboard');
                logger_1.default.error(e);
                return;
            }
        });
        this.deleteLeaderboard = (id) => __awaiter(this, void 0, void 0, function* () {
            let query = ` DELETE FROM leaderboards WHERE id = ($1)`;
            let params = [id];
            try {
                let results = yield dataManager_1.DataManager.query(query, params);
                return results;
            }
            catch (e) {
                logger_1.default.error('Unexpected error when deleting leaderboard');
                logger_1.default.error(e);
                return;
            }
        });
    }
}
exports.LeaderboardDAO = LeaderboardDAO;
//# sourceMappingURL=dao.js.map