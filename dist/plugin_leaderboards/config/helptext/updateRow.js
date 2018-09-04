"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Commands_1 = require("../Commands");
exports.updateRow = `This command will update the name of a row.
    
    Model:
    ${process.env.PREFIX}leaderboards ${Commands_1.Commands.UPDATE_ROW} [leaderboard name] [row name] [new row name]
    
    Example:
    ${process.env.PREFIX}leaderboards ${Commands_1.Commands.UPDATE_ROW} "My Leaderboard" "A Row" "A New Row"`;
//# sourceMappingURL=updateRow.js.map