import { Commands } from "../Commands";

export const deleteColumn = 
    `This command will delete a column from a leaderboard, and any data it may contain.
    
    Model:
    ${process.env.PREFIX}leaderboards ${Commands.DELETE_COLUMN} [leaderboard name] [column name]
    
    Example:
    ${process.env.PREFIX}leaderboards ${Commands.DELETE_COLUMN} "My leaderboard" "A Column"`;