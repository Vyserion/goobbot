# Leaderboards Plugin

This plugin is designed to handle the storage and management of leaderboards within Vybot.

---------------------------------------------------------------------------------------

## Leaderboard Management

In order to store data inside leaderboards, commands are required to be able to create, update, and delete the leaderboards.


### Creating a New Leaderboard

> As a guild administrator, I want to be able to create new leaderboards.

This command will create an empty leaderboard with a given name. When creating a new leaderbaord, the leaderboard name must be unique. 

#### Discord Command

**Model**:  
```[prefix]leaderboards new [name]```  

**Example**:  
```!leaderboards new "My Leaderboard"```


### Updating a Leaderboards' Name

> As a guild administrator, I want to be able to change a leaderboards' name.

This command will update a leaderboard from it's old name to a new one. When updating a leaderboard, the leaderboard name must be unique.

#### Discord Command

**Model**:  
```[prefix]leaderboards update [old name] [new name]```

**Example**:  
```!leaderboards update "My Leaderboard" "My Updated Leaderboard"```


### Deleting a Leaderboard

> As a guild administrator, I want to be able to delete a leaderboard.

This command will delete a leaderboard and any content it may contain.

#### Discord Command

**Model**:  
```[prefix]leaderboards delete [name]```

**Example**:  
```!leaderboards delete "My Leaderboard"```

---------------------------------------------------------------------------------------

## Leaderboard Column Management

Once a leaderboard has been created, commands are required to be able to create, update, and delete columns within the leaderboard.


### Creating a New Column

> As a guild administrator, I want to be able to add a new column.

This command will create a new column for the given leaderboard. The column name must be unique for the leaderboard.

#### Discord Command

**Model**:  
```[prefix]leaderboards newcol [leaderboard name] [column name] {column type}```

**Example, with default type**:  
```!leaderboards newcol "My Leaderboard" "A Column"```

**Example, with a given type**:  
```!leaderboards newcol "My Leaderboard" "A Column" data```