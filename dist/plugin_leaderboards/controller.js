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
const logger_1 = require("../core/logger");
const errorCodes_1 = require("./errorCodes");
exports.getLeaderboards = () => __awaiter(this, void 0, void 0, function* () {
    let leaderboards = yield dao_1.getLeaderboards();
    return leaderboards;
});
exports.insertLeaderboard = (command) => __awaiter(this, void 0, void 0, function* () {
    if (command.arguments.length != 1) {
        logger_1.default.warn('LDBD_BAD_PARAM: Incorrect number of parameters provided');
        return errorCodes_1.ErrorCodes.LDBD_BAD_PARAM;
    }
    let name = command.arguments[0];
    let existingLeaderboards = yield dao_1.getLeaderboard(name);
    if (existingLeaderboards.length > 0) {
        logger_1.default.warn('LDBD_DUP_NAME: A leaderboard with that name already exists');
        return errorCodes_1.ErrorCodes.LDBD_DUP_NAME;
    }
    yield dao_1.insertLeaderboard(name);
    logger_1.default.info('Created new leaderboard ' + name);
    return true;
});
//# sourceMappingURL=controller.js.map