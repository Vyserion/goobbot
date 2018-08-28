import { Commands } from "../Commands";

export const deleteLeaderboard = 
    `This command will delete a leaderboard and any content it may contain.
    
    Model:
    ${process.env.PREFIX}leaderboards ${Commands.DELETE_LEADERBOARD} [leaderboard name]
    
    Example:
    ${process.env.PREFIX}leaderboards ${Commands.DELETE_LEADERBOARD} "My Leaderboard`