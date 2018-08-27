export const deleteRow = 
    `This command will delete a row from a leaderboard, and any data it may contain.
    
    Model:
    ${process.env.PREFIX}leaderboards deleterow [leaderboard name] [row name]
    
    Example:
    ${process.env.PREFIX}leaderboards deleterow "My Leaderboard" "A Row"`;