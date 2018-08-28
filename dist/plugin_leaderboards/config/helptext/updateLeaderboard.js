"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Commands_1 = require("../Commands");
exports.updateLeaderboard = `This command will update a leaderboard from it's old name to a new one.
    When updating a leaderboard, the leaderboard name must be unique.

    Model:
    ${process.env.PREFIX}leaderboards ${Commands_1.Commands.UPDATE_LEADERBOARD} [old name] [new name]

    Example:
    ${process.env.PREFIX}leaderboards ${Commands_1.Commands.UPDATE_LEADERBOARD} "My Leaderboard" "My Update Leaderboard"`;
//# sourceMappingURL=updateLeaderboard.js.map