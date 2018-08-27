export const updateColumn = 
    `This command will update a column in various ways.
    Both the name and type of column can be updated.
    
    Model:
    ${process.env.PREFIX}leaderboards updatecol [leaderboard name] [column name] [update type] [value]
    
    Example, updating the name:
    ${process.env.PREFIX}leaderboards updatecol "My Leaderboard" "A Column" name "New Column Name"
    
    Example, updating the type:
    ${process.env.PREFIX}leaderboards updatecol "My Leaderboard" "A Column" type data
    
    Allowed Column Types:
    - data`;