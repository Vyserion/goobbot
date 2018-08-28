"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = require("../commands");
exports.showCommands = `User Commands:
    - Get Leaderboards: !leaderboards
    - Get Leaderboard: ${commands_1.Commands.GET_LEADERBOARD}
    - Update Value: ${commands_1.Commands.UPSERT_VALUE}
    
    Admin Commands:
    - Add Leaderboard: ${commands_1.Commands.CREATE_LEADERBOARD}
    - Update Leaderboard: ${commands_1.Commands.UPDATE_LEADERBOARD}
    - Delete Leaderboard: ${commands_1.Commands.DELETE_LEADERBOARD}
    - Add Column: ${commands_1.Commands.CREATE_COLUMN}
    - Update Column: ${commands_1.Commands.UPDATE_COLUMN}
    - Delete Column: ${commands_1.Commands.DELETE_COLUMN}
    - Add Row: ${commands_1.Commands.CREATE_ROW}
    - Update Row: ${commands_1.Commands.UPDATE_ROW}
    - Delete Row: ${commands_1.Commands.DELETE_ROW}

    For more information, use the command: !leaderboards help [command]`;
//# sourceMappingURL=showCommands.js.map