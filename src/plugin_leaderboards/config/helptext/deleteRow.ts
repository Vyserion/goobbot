import { Commands } from "../Commands";

export const deleteRow = 
    `This command will delete a row from a leaderboard, and any data it may contain.
    
    Model:
    ${process.env.PREFIX}leaderboards ${Commands.DELETE_ROW} [leaderboard name] [row name]
    
    Example:
    ${process.env.PREFIX}leaderboards ${Commands.DELETE_ROW} "My Leaderboard" "A Row"`;