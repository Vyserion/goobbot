export const upsertValue = 
    `This command will update a value in a leaderboard.
    
    Model:
    ${process.env.PREFIX}leaderboards update [leaderboard name] [column name] [row name] [value]
    
    Example:
    ${process.env.PREFIX}leaderboards update "My Leaderboard" "A Column" "A Row" 3`;