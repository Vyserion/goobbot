import { Commands } from "../Commands";

export const createRow = `This command will create a new row for a leaderboard.
    
    Model:
    ${process.env.PREFIX}leaderboards ${Commands.CREATE_ROW} [leaderboard name] [row name]
    
    Example:
    ${process.env.PREFIX}leaderboards ${Commands.CREATE_ROW} "My Leaderboard" "A Row"`;
