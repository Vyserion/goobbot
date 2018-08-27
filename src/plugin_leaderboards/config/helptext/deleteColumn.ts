export const deleteColumn = 
    `This command will delete a column from a leaderboard, and any data it may contain.
    
    Model:
    ${process.env.PREFIX}leaderboards deletecol [leaderboard name] [column name]
    
    Example:
    ${process.env.PREFIX}leaderboards deletecol "My leaderboard" "A Column"`;