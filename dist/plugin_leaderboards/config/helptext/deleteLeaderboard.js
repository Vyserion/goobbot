"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Commands_1 = require("../Commands");
exports.deleteLeaderboard = `This command will delete a leaderboard and any content it may contain.
    
    Model:
    ${process.env.PREFIX}leaderboards ${Commands_1.Commands.DELETE_LEADERBOARD} [leaderboard name]
    
    Example:
    ${process.env.PREFIX}leaderboards ${Commands_1.Commands.DELETE_LEADERBOARD} "My Leaderboard`;
//# sourceMappingURL=deleteLeaderboard.js.map