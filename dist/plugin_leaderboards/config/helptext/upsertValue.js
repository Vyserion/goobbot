"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Commands_1 = require("../Commands");
exports.upsertValue = `This command will update a value in a leaderboard.
    
    Model:
    ${process.env.PREFIX}leaderboards ${Commands_1.Commands.UPSERT_VALUE} [leaderboard name] [column name] [row name] [value]
    
    Example:
    ${process.env.PREFIX}leaderboards ${Commands_1.Commands.UPSERT_VALUE} "My Leaderboard" "A Column" "A Row" 3`;
//# sourceMappingURL=upsertValue.js.map