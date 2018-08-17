"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorCodes_1 = require("../config/errorCodes");
const format_1 = require("../util/format");
const LeaderboardController_1 = require("../controllers/LeaderboardController");
const getLeaderboard = async (command, message) => {
    let result = await LeaderboardController_1.LeaderboardController.getLeaderboard(command);
    let response;
    switch (result) {
        case errorCodes_1.ErrorCodes.LDBD_BAD_PARAM: {
            response = "No names were provided to get the leaderboard";
            break;
        }
        case errorCodes_1.ErrorCodes.LDBD_NOT_FOUND: {
            response = "A leaderboard with the name " + command.arguments[0] + " was not found";
            break;
        }
        default: {
            response = format_1.prettyPrintLeaderboard(result);
            break;
        }
    }
    message.channel.send(response);
};
exports.default = getLeaderboard;
//# sourceMappingURL=getLeaderboard.js.map