"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ReturnCodes_1 = require("../config/ReturnCodes");
const LeaderboardController_1 = require("../controllers/LeaderboardController");
async function addLeaderboard(command) {
    const result = await LeaderboardController_1.LeaderboardController.insertLeaderboard(command);
    let response;
    switch (result) {
        case ReturnCodes_1.ReturnCodes.INCORRECT_PARAM_LENGTH: {
            response = `No name was provided for the leaderboard`;
            break;
        }
        case ReturnCodes_1.ReturnCodes.LEADERBOARD_DUPLICATE_NAME: {
            response = `A leaderboard with the name ${command.arguments[0]} already exists`;
            break;
        }
        default: {
            response = `Successfully created leaderboard ${command.arguments[0]}`;
            break;
        }
    }
    return response;
}
exports.addLeaderboard = addLeaderboard;
//# sourceMappingURL=addLeaderboard.js.map