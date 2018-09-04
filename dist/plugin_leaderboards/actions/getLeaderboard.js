"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ReturnCodes_1 = require("../config/ReturnCodes");
const format_1 = require("../util/format");
const LeaderboardController_1 = require("../controllers/LeaderboardController");
async function getLeaderboard(command) {
    const result = await LeaderboardController_1.LeaderboardController.getLeaderboard(command);
    let response;
    switch (result) {
        case ReturnCodes_1.ReturnCodes.INCORRECT_PARAM_LENGTH: {
            response = `No names were provided to get the leaderboard`;
            break;
        }
        case ReturnCodes_1.ReturnCodes.LEADERBOARD_NOT_FOUND: {
            response = `A leaderboard with the name ${command.arguments[0]} was not found`;
            break;
        }
        default: {
            response = format_1.prettyPrintLeaderboard(result);
            break;
        }
    }
    return response;
}
exports.getLeaderboard = getLeaderboard;
//# sourceMappingURL=getLeaderboard.js.map