"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Commands_1 = require("../Commands");
exports.createRow = `This command will create a new row for a leaderboard.
    
    Model:
    ${process.env.PREFIX}leaderboards ${Commands_1.Commands.CREATE_ROW} [leaderboard name] [row name]
    
    Example:
    ${process.env.PREFIX}leaderboards ${Commands_1.Commands.CREATE_ROW} "My Leaderboard" "A Row"`;
//# sourceMappingURL=createRow.js.map