"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LeaderboardController_1 = require("../controllers/LeaderboardController");
const getLeaderboards = async (message) => {
    let results = await LeaderboardController_1.LeaderboardController.getLeaderboards();
    let response = "";
    if (results.length === 0) {
        response = "There are currently no leaderboards";
    }
    else {
        for (let leaderboardIdx in results) {
            let leaderboard = results[leaderboardIdx];
            response += leaderboard.name;
            response += "\n";
        }
    }
    message.channel.send(response);
};
exports.default = getLeaderboards;
//# sourceMappingURL=getLeaderboards.js.map