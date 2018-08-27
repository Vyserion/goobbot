export const updateLeaderboard = 
    `This command will update a leaderboard from it's old name to a new one.
    When updating a leaderboard, the leaderboard name must be unique.

    Model:
    ${process.env.PREFIX}leaderboards update [old name] [new name]

    Example:
    ${process.env.PREFIX}leaderboards update "My Leaderboard" "My Update Leaderboard"`;