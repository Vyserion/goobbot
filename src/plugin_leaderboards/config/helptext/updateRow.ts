export const updateRow = 
    `This command will update the name of a row.
    
    Model:
    ${process.env.PREFIX}leaderboards updaterow [leaderboard name] [row name] [new row name]
    
    Example:
    ${process.env.PREFIX}leaderboards updaterow "My Leaderboard" "A Row" "A New Row"`;