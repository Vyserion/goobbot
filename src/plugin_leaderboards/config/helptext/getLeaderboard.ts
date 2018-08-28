import { Commands } from "../Commands";

export const getLeaderboard = 
    `This command will show the contents of a leaderboard.

    Model:
    ${process.env.PREFIX}leaderboards ${Commands.GET_LEADERBOARD} [leaderboard name]

    Example:
    ${process.env.PREFIX}leaderboards ${Commands.GET_LEADERBOARD} "My Leaderboard"`;