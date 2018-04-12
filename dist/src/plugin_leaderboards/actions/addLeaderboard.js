"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorCodes_1 = require("../config/errorCodes");
const controller_1 = require("../controller");
const addLeaderboard = async (command, message) => {
    let result = await controller_1.LeaderboardController.insertLeaderboard(command);
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
};
exports.default = addLeaderboard;
//# sourceMappingURL=addLeaderboard.js.map