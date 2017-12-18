# Leaderboards

This plugin is designed to handle the storage and management of leaderboards within VyBot.




## Leaderboard Management

In order to store data inside leaderboards, the plugin requires that there is a way for administrators to be able to create, update, and delete the specifics of a leaderboard.


### Creating a new Leaderboard
> As a guild administrator, I want to be able to create new leaderboards.

#### API Endpoint
**URL**: /leaderboards  
**Method**: PUT  

For all leaderboards across your guild, the leaderboard name must be unique.

**Example body, without columns**:  
```json
{
    name: "Leaderboard Name"
}
```  

**Example body, with columns**:  
```json
{
    name: "Leaderboard Name",
    columns: [
        {
            name: "Column One"
        },
        {
            name: "Column Two"
        },
        {
            name: "Column Three",
            type: "TOTAL"
        }
    ]
}
```  

**Succesful Result**: 200 OK
```json
{
    id: 1
    name: "Leaderboard Name",
    columns: [
        ...
    ]
}
```  

**Failed Result - Missing Value**: 400 Bad Request
```json
{
    error: "Required parameter 'name' was not found"
}
```  

**Failed Result - Duplicate Name**: 400 Bad Request
```json
{
    error: "Leaderboard 'Leaderboard Name' already exists"
}
```  

#### Discord Command
**Model**: [prefix]leaderboards new [name]  
**Example**: !leaderboards new "Leaderboard Name"


### Updating a Leaderboard
> As a guild administrator, I want to be able to update a leaderboards' name or columns.

#### API Endpoint
**URL**: /leaderboards/{id}  
**Method**: POST  

This request will only update the parts of the leaderboard which are provided in the request. The API will handle the replacement of any missing values. Note that this operation is destructive, so replacing the columns will replace all data in the leaderboard.

**Example body, only name**:  
_/leaderboards/1_
```json
{
    name: "New Leaderboard Name"
}
```

**Example body, only columns**:  
_/leaderboards/1_
```json
{
    columns: [
        {
            name: "Column One"
        },
        {
            name: "New Column Two",
            type: "TOTAL"
        }
    ]
}
```

**Successful Result**: 200 OK
```json
{
    id: 1
    name: "New Leaderboard Name",
    columns: [
        ...
    ]
}
```  

**Failed Result**: 400 Bad Request
```json
{
    error: "Leaderboard 'Leaderboard Name' already exists"
}
```  

#### Discord Commands  
##### Updating the Leaderboards' Name
**Model**: [prefix]leaderboards updatename [name]  
**Example**: !leaderboards updatename New Leaderboard Name  

##### Updating the Leaderboards' Columns
**Model**: [prefix]leaderboards updatecols [colsList]  
**Example**: !leaderboards updatecols col1,col2,col3[TOTAL]  


### Adding a new Column
> As a guild administrator, I want to be able to add a new column, without losing data.  
-- TODO


### Wiping a Leaderboard
> As a guild administrator, I want to be able to wipe a leaderboard without deleting it's structure.  
-- TODO


### Deleting a Leaderboard
> As a guild administrator, I want to be able to delete a leaderboard.  
-- TODO


### Deleting a Leaderboard Column
> As a guild administrator, I want to be able to delete a leaderboard's column.  
-- TODO



## Leaderboard Data Management
### Adding data to a Leaderboard
> As a guild moderator, I want to be able to insert new rows into a leaderboard.  
-- TODO

### Updating data in a Leaderboard
> As a guild moderator, I want to be able to update rows in a leaderboard.  
-- TODO

### Incrementing data in a Leaderboard
> As a guild moderator, I want to be able to increment numeric data in a leaderboard.  
-- TODO

### Delete data from a leaderboard
> As a guild moderator, I want to be able to delete data from a leaderboard.  
-- TODO