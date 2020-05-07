import { Actions } from "./actions";
import { ColumnTypes } from "./columnTypes";

export const showCommandMessage = `User Commands:
- Get Leaderboards: leaderboards
- Get Leaderboard: ${Actions.getLeaderboard}
- Update Value: ${Actions.upsertValue}

Admin Commands:
- Add Leaderboard: ${Actions.createLeaderboard}
- Update Leaderboard: ${Actions.updateLeaderboard}
- Delete Leaderboard: ${Actions.deleteLeaderboard}
- Add Column: ${Actions.createColumn}
- Update Column: ${Actions.updateColumn}
- Delete Column: ${Actions.deleteColumn}
- Add Row: ${Actions.createRow}
- Update Row: ${Actions.updateRow}
- Delete Row: ${Actions.deleteRow}

For more information, use the command: ${process.env.BOTPREFIX}leaderboards help [command]
`;

export const createLeaderboardMessage = `This command will create an empty leaderboard.
The leaderboard name must be unique.

Command:
${process.env.BOTPREFIX}leaderboards ${Actions.createLeaderboard} [leaderboard name]

Example:
${process.env.BOTPREFIX}leaderboards ${Actions.createLeaderboard} "My Leaderboard"`;

export const getLeaderboardMessage = `This command will show a leaderboard.

Command:
${process.env.BOTPREFIX}leaderboards ${Actions.getLeaderboard} [leaderboard name]

Example:
${process.env.BOTPREFIX}leaderboards ${Actions.getLeaderboard} "My Leaderboard"`;

export const getLeaderboardsMessage = `This command will list all leaderboards.

Command:
${process.env.BOTPREFIX}leaderboards

Example:
${process.env.BOTPREFIX}leaderboards`;

export const updateLeaderboardMessage = `This command will update a leaderboard.
The leaderboard name must be unique.

Command:
${process.env.BOTPREFIX}leaderboards ${Actions.updateLeaderboard} [leaderboard name] [new leaderboard name]

Example:
${process.env.BOTPREFIX}leaderboards ${Actions.updateLeaderboard} "My Leaderboard" "My Updated Leaderboard"`;

export const deleteLeaderboardMessage = `This command will delete a leaderboard and any data it may contain.
Any data removed is permanently lost.

Command:
${process.env.BOTPREFIX}leaderboards ${Actions.deleteLeaderboard} [leaderboard name]

Example:
${process.env.BOTPREFIX}leaderboards ${Actions.deleteLeaderboard} "My Leaderboard"`;

export const createColumnMessage = `This command will create a new column for the given leaderboard.
This column must be unique to the leadeboard.

Command:
${process.env.BOTPREFIX}leaderboards ${Actions.createColumn} [leaderboard name] [column name] {column type}

Example, with the default column type:
${process.env.BOTPREFIX}leaderboards ${Actions.createColumn} "My Leaderboard" "A Column"

Example, with a given type:
${process.env.BOTPREFIX}leaderboards ${Actions.createColumn} "My Leaderboard" "A Column" ${ColumnTypes.DATA}

Allowed Column Types:
- ${ColumnTypes.DATA}`;

export const updateColumnMessage = `This command will update a column in various ways.
Both the name and type of column can be updated.

Command:
${process.env.BOTPREFIX}leaderboards ${Actions.updateColumn} [leaderboard name] [column name] [update type] [value]

Example, updating the name:
${process.env.BOTPREFIX}leaderboards ${Actions.updateColumn} "My Leaderboard" "A Column" name "New Column Name"

Example, updating the type:
${process.env.BOTPREFIX}leaderboard ${Actions.updateColumn} "My Leaderboard" "A Column" type ${ColumnTypes.DATA}

Allowes Column Types:
- ${ColumnTypes.DATA}
`;

export const deleteColumnMessage = `This command will delete a column from a leaderboard, and any data it may contain.
Any data removed is permanently lost.

Command:
${process.env.BOTPREFIX}leaderboards ${Actions.deleteColumn} [leaderboard name] [column name]

Example:
${process.env.BOTPREFIX}leaderboards ${Actions.deleteColumn} "My Leaderboard" "A Column"`;

export const createRowMessage = `This command will create a new row for the given leaderboard.
This row must be unique to the leaderboard.

Command:
${process.env.BOTPREFIX}leaderboards ${Actions.createRow} [leaderboard name] [row name]

Example:
${process.env.BOTPREFIX}leaderboards ${Actions.createRow} "My Leaderboard" "A Row"`;

export const updateRowMessage = `This command will update the name of a row.

Command:
${process.env.BOTPREFIX}leaderboards ${Actions.updateRow} [leaderboard name] [row name] [new row name]

Example:
${process.env.BOTPREFIX}leaderboards ${Actions.updateRow} "My Leaderboard" "A Row" "An Updated Row"
`;

export const deleteRowMessage = `This command will delete a row from a leaderboard, and any data it may contain.
Any data removed is permanently lost.

Command:
${process.env.BOTPREFIX}leaderboards ${Actions.deleteRow} [leaderboard name] [row name]

Example:
${process.env.BOTPREFIX}leaderboards ${Actions.deleteRow} "My Leaderboard" "A Row"`;

export const upsertValueMessage = `This command will add or update a value in a leaderboard.

Command:
${process.env.BOTPREFIX}leaderboards ${Actions.upsertValue} [leaderboard name] [column name] [row name] [value]

Example:
${process.env.BOTPREFIX}leaderboards ${Actions.upsertValue} "My Leaderboard" "A Column" "A Row" 4
`;
