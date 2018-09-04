"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LeaderboardController_1 = require("../controllers/LeaderboardController");
async function getLeaderboards() {
    const results = await LeaderboardController_1.LeaderboardController.getLeaderboards();
    let response = ``;
    if (results.length === 0) {
        response = `There are currently no leaderboards`;
    }
    else {
        for (let leaderboardIdx in results) {
            let leaderboard = results[leaderboardIdx];
            response += leaderboard.name;
            response += "\n";
        }
    }
    return response;
}
exports.getLeaderboards = getLeaderboards;
//# sourceMappingURL=getLeaderboards.js.map