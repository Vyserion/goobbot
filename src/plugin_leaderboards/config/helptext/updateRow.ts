import { Commands } from "../Commands";

export const updateRow = `This command will update the name of a row.
    
    Model:
    ${process.env.PREFIX}leaderboards ${Commands.UPDATE_ROW} [leaderboard name] [row name] [new row name]
    
    Example:
    ${process.env.PREFIX}leaderboards ${Commands.UPDATE_ROW} "My Leaderboard" "A Row" "A New Row"`;
