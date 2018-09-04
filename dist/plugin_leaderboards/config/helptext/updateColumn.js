"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Commands_1 = require("../Commands");
const ColumnTypes_1 = require("../ColumnTypes");
exports.updateColumn = `This command will update a column in various ways.
    Both the name and type of column can be updated.
    
    Model:
    ${process.env.PREFIX}leaderboards ${Commands_1.Commands.UPDATE_COLUMN} [leaderboard name] [column name] [update type] [value]
    
    Example, updating the name:
    ${process.env.PREFIX}leaderboards ${Commands_1.Commands.UPDATE_COLUMN} "My Leaderboard" "A Column" name "New Column Name"
    
    Example, updating the type:
    ${process.env.PREFIX}leaderboards ${Commands_1.Commands.UPDATE_COLUMN} "My Leaderboard" "A Column" type ${ColumnTypes_1.ColumnTypes.DATA}
    
    Allowed Column Types:
    - ${ColumnTypes_1.ColumnTypes.DATA}`;
//# sourceMappingURL=updateColumn.js.map