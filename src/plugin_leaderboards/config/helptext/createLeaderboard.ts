import { Commands } from "../Commands";

export const createLeaderboard = 
    `This command will create an empty leaderboard with a given name.
    When creating a new leaderboard, the leaderboard name must be unique.

    Model:
    ${process.env.PREFIX}leaderboards ${Commands.CREATE_LEADERBOARD} [leaderboard name]

    Example:
    ${process.env.PREFIX}leaderboards ${Commands.CREATE_LEADERBOARD} "My Leaderboard"`;