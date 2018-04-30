"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorCodes_1 = require("../config/errorCodes");
const LeaderboardController_1 = require("../controllers/LeaderboardController");
const updateLeaderboard = async (command, message) => {
    let result = await LeaderboardController_1.LeaderboardController.updateLeaderboard(command);
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
            response = 'Successfully updated leaderboard ' + command.arguments[0];
            break;
        }
    }
    message.channel.send(response);
};
exports.default = updateLeaderboard;
//# sourceMappingURL=updateLeaderboard.js.map