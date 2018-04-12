"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorCodes_1 = require("../config/errorCodes");
const controller_1 = require("../controller");
const deleteLeaderboard = async (command, message) => {
    let result = await controller_1.LeaderboardController.deleteLeaderboard(command);
    let response;
    switch (result) {
        case errorCodes_1.ErrorCodes.LDBD_BAD_PARAM: {
            response = 'No names were provided for the leaderboard';
            break;
        }
        case errorCodes_1.ErrorCodes.LDBD_NOT_FOUND: {
            response = 'A leaderboard with the name ' + command.arguments[0] + ' was not found';
            break;
        }
        default: {
            response = 'Successfully deleted leaderboard ' + command.arguments[0];
            break;
        }
    }
    message.channel.send(response);
};
exports.default = deleteLeaderboard;
//# sourceMappingURL=deleteLeaderboard.js.map