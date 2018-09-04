"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Commands_1 = require("../Commands");
exports.createLeaderboard = `This command will create an empty leaderboard with a given name.
    When creating a new leaderboard, the leaderboard name must be unique.

    Model:
    ${process.env.PREFIX}leaderboards ${Commands_1.Commands.CREATE_LEADERBOARD} [leaderboard name]

    Example:
    ${process.env.PREFIX}leaderboards ${Commands_1.Commands.CREATE_LEADERBOARD} "My Leaderboard"`;
//# sourceMappingURL=createLeaderboard.js.map