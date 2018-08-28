"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Commands_1 = require("../Commands");
exports.deleteColumn = `This command will delete a column from a leaderboard, and any data it may contain.
    
    Model:
    ${process.env.PREFIX}leaderboards ${Commands_1.Commands.DELETE_COLUMN} [leaderboard name] [column name]
    
    Example:
    ${process.env.PREFIX}leaderboards ${Commands_1.Commands.DELETE_COLUMN} "My leaderboard" "A Column"`;
//# sourceMappingURL=deleteColumn.js.map