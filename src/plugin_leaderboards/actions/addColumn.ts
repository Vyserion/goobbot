import { ErrorCodes } from "../config/errorCodes";
import { Command } from "../../core/command";
import { Message } from "discord.js";
import { LeaderboardController } from "../controller";

const addColumn = async (command: Command, message: Message) => {
    let result = await LeaderboardController.insertLeaderboardColumn(command);

    let response;
    switch (result) {
        case ErrorCodes.LDBD_BAD_PARAM: {
            if (command.arguments.length < 2) {
                response = 'No leaderboard or column name was provided';
            } else {
                response = 'Too many arguments were provided';
            }
            break;
        }
        case ErrorCodes.LDBD_NOT_FOUND: {
            response = 'A leaderboard with the name ' + command.arguments[0] + ' was not found';
            break;
        }
        case ErrorCodes.LDBD_DUP_NAME: {
            response = 'A column with the name ' + command.arguments[1] + ' for leaderboard ' + command.arguments[0] + ' already exists';
            break;
        }
        default: {
            response = 'Successfully created leaderboard column ' + command.arguments[1];
            break;
        }

    }

    message.channel.send(response);
};

export default addColumn;