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
const dao_1 = require("./dao");
const errorCodes_1 = require("./config/errorCodes");
const logger_1 = require("../core/logger");
class LeaderboardController {
    constructor() {
        this.getLeaderboards = () => __awaiter(this, void 0, void 0, function* () {
            return yield this.dao.getLeaderboards();
        });
        this.insertLeaderboard = (command) => __awaiter(this, void 0, void 0, function* () {
            if (command.arguments.length != 1) {
                logger_1.default.warn('LDBD_BAD_PARAM: Incorrect number of parameters provided');
                return errorCodes_1.ErrorCodes.LDBD_BAD_PARAM;
            }
            const name = command.arguments[0];
            let existingLeaderboards = yield this.dao.getLeaderboard(name);
            if (existingLeaderboards.length > 0) {
                logger_1.default.warn('LDBD_DUP_NAME: A leaderboard with that name already exists');
                return errorCodes_1.ErrorCodes.LDBD_DUP_NAME;
            }
            yield this.dao.insertLeaderboard(name);
            logger_1.default.info('Created new leaderboard ' + name);
            return true;
        });
        this.insertLeaderboardColumn = (command) => __awaiter(this, void 0, void 0, function* () {
            if (command.arguments.length < 2 || command.arguments.length > 3) {
                logger_1.default.warn('LDBD_BAD_PARAM: Incorrect number of parameters provided');
                return errorCodes_1.ErrorCodes.LDBD_BAD_PARAM;
            }
            const leaderboardName = command.arguments[0];
            let existingLeaderboards = yield this.dao.getLeaderboard(leaderboardName);
            if (existingLeaderboards.length == 0) {
                logger_1.default.warn('LDBD_NOT_FOUND: No leaderboard found for query');
                return errorCodes_1.ErrorCodes.LDBD_NOT_FOUND;
            }
            const id = existingLeaderboards[0].id;
            const columnName = command.arguments[1];
            let existingColumns = yield this.dao.getLeaderboardColumn(id, columnName);
            if (existingColumns.length > 0) {
                logger_1.default.warn('LDBD_DUP_NAME: A leaderboard column with that name already exists for this leaderboard');
                return errorCodes_1.ErrorCodes.LDBD_DUP_NAME;
            }
            let columnType = 'DATA';
            if (command.arguments.length == 3) {
                columnType = command.arguments[2];
                // TODO - We need to some column type matching here.
            }
            yield this.dao.insertLeaderboardColumn(id, columnName, columnType);
            logger_1.default.info('Created new leaderboard column ' + id + ':' + columnName + ':' + columnType);
            return true;
        });
        this.updateLeaderboard = (command) => __awaiter(this, void 0, void 0, function* () {
            if (command.arguments.length != 2) {
                logger_1.default.warn('LDBD_BAD_PARAM: Incorrect number of parameters provided');
                return errorCodes_1.ErrorCodes.LDBD_BAD_PARAM;
            }
            const name = command.arguments[0];
            const newName = command.arguments[1];
            let existingLeaderboards = yield this.dao.getLeaderboard(name);
            if (existingLeaderboards.length == 0) {
                logger_1.default.warn('LDBD_NOT_FOUND: No leaderboard found for query');
                return errorCodes_1.ErrorCodes.LDBD_NOT_FOUND;
            }
            const id = existingLeaderboards[0].id;
            yield this.dao.updateLeaderboard(id, newName);
            logger_1.default.info('Updated leaderboard ' + name + ' to ' + newName);
            return true;
        });
        this.deleteLeaderboard = (command) => __awaiter(this, void 0, void 0, function* () {
            if (command.arguments.length != 1) {
                logger_1.default.warn('LDBD_BAD_PARAM: Incorrect number of parameters provided');
                return errorCodes_1.ErrorCodes.LDBD_BAD_PARAM;
            }
            const name = command.arguments[0];
            let existingLeaderboards = yield this.dao.getLeaderboard(name);
            if (existingLeaderboards.length == 0) {
                logger_1.default.warn('LDBD_NOT_FOUND: No leaderboard found for query');
                return errorCodes_1.ErrorCodes.LDBD_NOT_FOUND;
            }
            const id = existingLeaderboards[0].id;
            yield this.dao.deleteLeaderboard(id);
            logger_1.default.info('Deleted leaderboard ' + name);
            return true;
        });
        this.dao = new dao_1.LeaderboardDAO();
    }
}
exports.LeaderboardController = LeaderboardController;
//# sourceMappingURL=controller.js.map