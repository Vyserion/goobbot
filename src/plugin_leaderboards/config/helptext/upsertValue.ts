import { Commands } from "../Commands";

export const upsertValue = 
    `This command will update a value in a leaderboard.
    
    Model:
    ${process.env.PREFIX}leaderboards ${Commands.UPSERT_VALUE} [leaderboard name] [column name] [row name] [value]
    
    Example:
    ${process.env.PREFIX}leaderboards ${Commands.UPSERT_VALUE} "My Leaderboard" "A Column" "A Row" 3`;