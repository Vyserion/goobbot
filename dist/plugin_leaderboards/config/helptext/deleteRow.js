"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Commands_1 = require("../Commands");
exports.deleteRow = `This command will delete a row from a leaderboard, and any data it may contain.
    
    Model:
    ${process.env.PREFIX}leaderboards ${Commands_1.Commands.DELETE_ROW} [leaderboard name] [row name]
    
    Example:
    ${process.env.PREFIX}leaderboards ${Commands_1.Commands.DELETE_ROW} "My Leaderboard" "A Row"`;
//# sourceMappingURL=deleteRow.js.map