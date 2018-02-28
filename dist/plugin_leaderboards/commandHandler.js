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
const controller_1 = require("./controller");
const errorCodes_1 = require("./errorCodes");
exports.handleLeaderboardCommand = (command, message) => __awaiter(this, void 0, void 0, function* () {
    switch (command.action) {
        case 'add': {
            handleAddCommand(command, message);
            break;
        }
        default: {
            handleGetCommand(command, message);
            break;
        }
    }
});
function handleGetCommand(command, message) {
    return __awaiter(this, void 0, void 0, function* () {
        let results = yield controller_1.getLeaderboards();
        let response = '';
        if (results.length === 0) {
            response = 'There are currently no leaderboards';
        }
        else {
            for (let leaderboardIdx in results) {
                let leaderboard = results[leaderboardIdx];
                response += leaderboard.name;
                response += '\n';
            }
        }
        message.channel.send(response);
    });
}
function handleAddCommand(command, message) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield controller_1.insertLeaderboard(command);
        let response;
        switch (result) {
            case errorCodes_1.ErrorCodes.LDBD_BAD_PARAM: {
                response = 'No name was provided for the leaderboard';
                break;
            }
            case errorCodes_1.ErrorCodes.LDBD_DUP_NAME: {
                response = 'A leaderboard with the name ' + command.arguments[0] + ' already exists';
                break;
            }
            default: {
                response = 'Successfully created leaderboard ' + command.arguments[0];
                break;
            }
        }
        message.channel.send(response);
    });
}
//# sourceMappingURL=commandHandler.js.map