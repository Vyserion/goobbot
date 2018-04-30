import { ErrorCodes } from "../config/errorCodes";
import { Command } from "../../core/command";
import { Message } from "discord.js";
import { LeaderboardController } from "../controllers/LeaderboardController";

const getLeaderboards = async (message: Message) => {
    let results = await LeaderboardController.getLeaderboards();

    let response = '';

    if (results.length === 0) {
        response = 'There are currently no leaderboards';
    } else {
        for (let leaderboardIdx in results) {
            let leaderboard = results[leaderboardIdx];
            response += leaderboard.name;
            response += '\n';
        }
    }

    message.channel.send(response);
};

export default getLeaderboards;