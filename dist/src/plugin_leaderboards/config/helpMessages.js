"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = require("./commands");
const showCommands = "User Commands: \n" +
    "- Get Leaderboards: !leaderboards\n" +
    "- Get Leaderboard: " +
    commands_1.commands.GET_LEADERBOARD +
    "\n" +
    "\n" +
    "Admin Commands\n" +
    "- Add Leaderboard: " +
    commands_1.commands.CREATE_LEADERBOARD +
    "\n" +
    "- Update Leaderboard: " +
    commands_1.commands.UPDATE_LEADERBOARD +
    "\n" +
    "- Delete Leaderboard: " +
    commands_1.commands.DELETE_LEADERBOARD +
    "\n" +
    "- Add Column: " +
    commands_1.commands.CREATE_COLUMN +
    "\n" +
    "- Update Column: " +
    commands_1.commands.UPDATE_COLUMN +
    "\n" +
    "- Delete Column: " +
    commands_1.commands.DELETE_COLUMN +
    "\n" +
    "- Add Row: " +
    commands_1.commands.CREATE_ROW +
    "\n" +
    "- Update Row: " +
    commands_1.commands.UPDATE_ROW +
    "\n" +
    "- Delete Row: " +
    commands_1.commands.DELETE_ROW +
    "\n" +
    "\n" +
    "For more information, use the command: '!leaderboards help [command]'";
const getLeaderboards = "This command will list all leaderboards for the guild.\n" +
    "\n" +
    "Model:\n" +
    process.env.PREFIX +
    "leaderboards" +
    "\n" +
    "Example:\n" +
    process.env.PREFIX +
    "leaderboards";
const getLeaderboard = "This command will print out a leaderboard. \n" +
    "\n" +
    "Model: \n" +
    process.env.PREFIX +
    "leaderboards show [leaderboard name]" +
    "\n\n" +
    "Example: \n" +
    process.env.PREFIX +
    'leaderboards show "My Leaderboard"';
const createLeaderboard = "This command will create an empty leaderboard with a given name. \n" +
    "When creating a new leaderboard, the leaderboard name must be unique.\n" +
    "\n" +
    "Model: \n" +
    process.env.PREFIX +
    "leaderboards new [leaderboard name]\n" +
    "\n" +
    "Example: \n" +
    process.env.PREFIX +
    'leaderboards new "My Leaderboard"';
const updateLeaderboard = "This command will update a leaderboard from it's old name to a new one.\n" +
    "When updating a leaderboard, the leaderboard name must be unique.\n" +
    "\n" +
    "Model: \n" +
    process.env.PREFIX +
    "leaderboards update [old name] [new name]\n" +
    "\n" +
    "Example: \n" +
    process.env.PREFIX +
    'leaderboards update "My Leaderboard" "My Updated Leaderboards';
const deleteLeaderboard = "This command will delete a leaderboard and any content it may contain.\n" +
    "\n" +
    "Model: \n" +
    process.env.PREFIX +
    "leaderboards delete [leaderboard name]" +
    "\n" +
    "Example: \n" +
    process.env.PREFIX +
    'leaderboards delete "My Leaderboard"';
const createColumn = "This command will create a new column for the given leaderboard.\n" +
    "The column name must be unique for the leaderboard.\n" +
    "\n" +
    "Model: \n" +
    process.env.PREFIX +
    "leaderboards newcol [leaderboard name] [column name] {column type}\n" +
    "\n" +
    "Example, with default type:\n" +
    process.env.PREFIX +
    'leaderboards newcol "My Leaderboard" "A Column"\n' +
    "\n" +
    "Example, with a given type:\n" +
    process.env.PREFIX +
    'leaderboards newcol "My Leaderboard" "A Column" data\n' +
    "\n" +
    "Allowed Column Types:\n" +
    "- Data";
const updateColumn = "This command will update a column in various ways.\n" +
    "Both the name and the type of column can be updated.\n" +
    "\n" +
    "Model:\n" +
    process.env.PREFIX +
    "leaderboards updatecol [leaderboard name] [column name] [update type] [value]\n" +
    "\n" +
    "Example, updating the name: \n" +
    process.env.PREFIX +
    'leaderboards updatecol "My Leaderboard" "A Column" name "New Column Name"\n' +
    "\n" +
    "Example, updating the type: \n" +
    process.env.PREFIX +
    'leaderboards updatecol "My Leaderboard" "A Column" type data\n' +
    "\n" +
    "Allowed Column Types:\n" +
    "- Data";
const deleteColumn = "This command will delete a column from a given leaderboard, and any data it may contain.\n" +
    "\n" +
    "Model: \n" +
    process.env.PREFIX +
    "leaderboards deletecol [leaderboard name] [column name]" +
    "\n" +
    "Example: \n" +
    process.env.PREFIX +
    'leaderboards deletecol "My Leaderboard" "A Column"';
const createRow = `This command will create a new row for the given leaderboard.

Model:
${process.env.PREFIX}leaderboards newrow [leaderboard name] [row name]

Example:
${process.env.PREFIX}leaderboards newrow "My Leaderboard" "A Row"
`;
const updateRow = `This command will update a row with the given name.

Model:
${process.env.PREFIX}leaderboards updaterow [leaderboard name] [row name] [new row name]

Example:
${process.env.PREFIX}leaderbaord updaterow "My Leaderboard" "A Row" "New Row"
`;
const deleteRow = `This command will delete a row from the given leaderboard, and any data it may contain.

Model:
${process.env.PREFIX}leaderboards deleterow [leaderboard name] [row name]

Example:
${process.env.PREFIX}leaderboards deleterow "My Leaderboard" "A Row"
`;
const helpMessages = {
    showCommands,
    getLeaderboards,
    getLeaderboard,
    createLeaderboard,
    updateLeaderboard,
    deleteLeaderboard,
    createColumn,
    updateColumn,
    deleteColumn,
    createRow,
    updateRow,
    deleteRow
};
exports.default = helpMessages;
//# sourceMappingURL=helpMessages.js.map