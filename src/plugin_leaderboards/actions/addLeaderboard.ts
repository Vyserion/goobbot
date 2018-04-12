import { ErrorCodes } from "../config/errorCodes";
import { Command } from "../../core/command";
import { Message } from "discord.js";
import { LeaderboardController } from "../controller";

const addLeaderboard = async (command: Command, message: Message) => {
    let result = await LeaderboardController.insertLeaderboard(command);

    let response;
    switch (result) {
        case ErrorCodes.LDBD_BAD_PARAM: {
            response = 'No name was provided for the leaderboard';
            break;
        }
        case ErrorCodes.LDBD_DUP_NAME: {
            response = 'A leaderboard with the name ' + command.arguments[0] + ' already exists';
            break;
        }
        default: {
            response = 'Successfully created leaderboard ' + command.arguments[0];
            break;
        }
    }

    message.channel.send(response);
};

export default addLeaderboard;