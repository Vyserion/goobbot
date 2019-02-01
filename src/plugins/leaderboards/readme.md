# Leaderboards Plugin

This plugin is designed to handle the storage and management of leaderboards within VyBot.

----------

## User Commands

### Showing All Leaderboards

This command will list all leaderboards for the guild.

Command:  
```[prefix]leaderboards```

Example:  
```!leaderboards```

### Showing a Leaderboard

This command will print out a single leaderboard.

Command:  
```[prefix]leaderboards show [leaderboard name]```

Example:  
```!leaderboards show "My Leaderboard"```

### Update a Value

This command will update a single value in a leaderboard.

Command:  
```[prefix]leaderboards update [leaderboard name] [column name] [row name] [value]```

Example:  
```!leaderboards update "My Leaderboard" "Points" "Player One" "5"```

----------

## Admin Commands

### Create a Leaderboard

This command will create a new leaderboard.

Command:  
```[prefix]leaderboards new [leaderboard name]```

Example:  
```!leaderboards new "My Leaderboard"```

### Update a Leaderboard

This command will update the name of a leaderboard.

Command:  
```[prefix]leaderboards update [leaderboard name] [new leaderbaord name]```

Example:  
```!leaderboards update "My Leaderboard" "A Better Name"```

### Deleting a Leaderboard

This command will delete a leaderboard.

Command:  
```[prefix]leaderboards delete [leaderboard name]```

Example:  
```!leaderboards delete "My Leaderboard```

### Creating a Column

This command will create a column for a leaderboard.

Command:  
```[prefix]leaderboards newcol [leaderboard name] [column name]```

Example:  
```!leaderboards newcol "My Leaderboard" "Points"```

### Updating a Column

This command will update a column's type or name.

Command:  
```[prefix]leaderboards updatecol [leaderboard name] [column name] [update type] [value]```

Example, updating the name:  
```!leaderboards updatecol "My Leaderboard" "Points" "name" "Score"```

Example, updating the type:  
```!leaderboards updatecol "My Leaderboard" "Points" "type" "data"```

### Deleting a Column

This command will delete a column.

Command:  
```[prefix]leaderboards deletecol [leaderboard name] [column name]```

Example:  
```!leaderboards deletecol "My Leaderboard" "Points"```

### Creating a Row

This command will create a row.

Command:  
```[prefix]leaderboards newrow [leaderboard name] [row name]```

Example:  
```!leaderboards newrow "My Leaderboard" "Player One"```

### Updating a Row

This command will update the name of a row.

Command:  
```[prefix]leaderboards updaterow [leaderboard name] [row name] [new name]```

Example:  
```!leaderboards updaterow "My Leaderboard" "Player One" "Player Two"```

### Deleting a Row

This command will delete a row.

Command:  
```[prefix]leaderboards deleterow [leaderboard name] [row name]```

Example:  
```!leaderboards deleterow "My Leaderboard" "Player Two"```