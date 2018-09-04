"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Commands_1 = require("../Commands");
const ColumnTypes_1 = require("../ColumnTypes");
exports.createColumn = `This command will create a new column for the given leaderboard.
    This column name must be unique for the leaderboard.
    
    Model:
    ${process.env.PREFIX}leaderboards ${Commands_1.Commands.CREATE_COLUMN} [leaderboard name] [column name] {column type}
    
    Example, with default column type:
    ${process.env.PREFIX}leaderboards ${Commands_1.Commands.CREATE_COLUMN} "My Leaderboard" "A Column"
    
    Example, with a given type:
    ${process.env.PREFIX}leaderboards ${Commands_1.Commands.CREATE_COLUMN} "My Leaderboard" "A Column" ${ColumnTypes_1.ColumnTypes.DATA}
    
    Allowed Column Types:
    - ${ColumnTypes_1.ColumnTypes.DATA}`;
//# sourceMappingURL=createColumn.js.map