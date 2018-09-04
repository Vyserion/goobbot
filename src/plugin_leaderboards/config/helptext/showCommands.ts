import { Commands } from "../commands";

export const showCommands = `User Commands:
    - Get Leaderboards: !leaderboards
    - Get Leaderboard: ${Commands.GET_LEADERBOARD}
    - Update Value: ${Commands.UPSERT_VALUE}
    
    Admin Commands:
    - Add Leaderboard: ${Commands.CREATE_LEADERBOARD}
    - Update Leaderboard: ${Commands.UPDATE_LEADERBOARD}
    - Delete Leaderboard: ${Commands.DELETE_LEADERBOARD}
    - Add Column: ${Commands.CREATE_COLUMN}
    - Update Column: ${Commands.UPDATE_COLUMN}
    - Delete Column: ${Commands.DELETE_COLUMN}
    - Add Row: ${Commands.CREATE_ROW}
    - Update Row: ${Commands.UPDATE_ROW}
    - Delete Row: ${Commands.DELETE_ROW}

    For more information, use the command: !leaderboards help [command]`;
