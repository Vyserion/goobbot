import { commands } from "./commands";

const showCommands = "User Commands: \n"
    + "- Get Leaderboards: !leaderboards\n"
    + "- Get Leaderboard: " + commands.GET_LEADERBOARD + "\n"
    + "\n"
    + "Admin Commands\n"
    + "- Add Leaderboard: " + commands.CREATE_LEADERBOARD + "\n"
    + "- Update Leaderboard: " + commands.UPDATE_LEADERBOARD + "\n"
    + "- Delete Leaderboard: " + commands.DELETE_LEADERBOARD + "\n"
    + "- Add Column: " + commands.CREATE_COLUMN + "\n"
    + "- Update Column: " + commands.UPDATE_COLUMN + "\n"
    + "- Delete Column: " + commands.DELETE_COLUMN + "\n"
    + "\n"
    + "For more information, use the command: '!leaderboards help [command]'";

const helpMessages = {
    showCommands: showCommands
}

export default helpMessages;