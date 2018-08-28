import { Commands } from "../Commands";

export const updateLeaderboard = `This command will update a leaderboard from it's old name to a new one.
    When updating a leaderboard, the leaderboard name must be unique.

    Model:
    ${process.env.PREFIX}leaderboards ${Commands.UPDATE_LEADERBOARD} [old name] [new name]

    Example:
    ${process.env.PREFIX}leaderboards ${Commands.UPDATE_LEADERBOARD} "My Leaderboard" "My Update Leaderboard"`;
