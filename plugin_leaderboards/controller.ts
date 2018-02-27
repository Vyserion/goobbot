import { Command } from "../core/command";
import { insertLeaderboard as insertLeaderboardData } from "./dao";

export const insertLeaderboard = async (command: Command) => {
    // TODO: Validate leaderboard name

    if (command.arguments.length != 1) {
        return 'Number of arguments incorrect.';
    }
    let name = command.arguments[0];

    console.log('inserting');
    let result = await insertLeaderboardData(name);
    console.log('done inserting');
    return 'Successfully created leaderboard.';
};