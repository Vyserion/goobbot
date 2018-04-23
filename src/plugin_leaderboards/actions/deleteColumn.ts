import { ErrorCodes } from "../config/errorCodes";
import { Command } from "../../core/command";
import { Message } from "discord.js";
import { LeaderboardController } from "../controller";

const deleteColumn = async (command: Command, message: Message) => {
    let result = await LeaderboardController.deleteLeaderboardColumn(command);

    let response;
    switch (result) {
        case ErrorCodes.LDBD_BAD_PARAM: {
            if (command.arguments.length < 2) {
                response = 'Not enough parameters provided = please check you have a leaderboard name and a column name.';
            } else {
                response = 'Too many arguments were provided';
            }
            break;
        }
        case ErrorCodes.LDBD_NOT_FOUND: {
            response = 'A leaderboard with the name ' + command.arguments[0] + ' was not found';
            break;
        }
        case ErrorCodes.LDBD_COL_NOT_FOUND: {
            response = 'A leaderboard with the column ' + command.arguments[1] + ' was not found';
            break;
        }
        default: {
            response = 'Successfully deleted the leaderboard column ' + command.arguments[1];
            break;
        }
    }

    message.channel.send(response);
}

export default deleteColumn;