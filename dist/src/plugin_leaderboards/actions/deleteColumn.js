"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorCodes_1 = require("../config/errorCodes");
const controller_1 = require("../controller");
const deleteColumn = async (command, message) => {
    let result = await controller_1.LeaderboardController.deleteLeaderboardColumn(command);
    let response;
    switch (result) {
        case errorCodes_1.ErrorCodes.LDBD_BAD_PARAM: {
            if (command.arguments.length < 2) {
                response = 'Not enough parameters provided = please check you have a leaderboard name and a column name.';
            }
            else {
                response = 'Too many arguments were provided';
            }
            break;
        }
        case errorCodes_1.ErrorCodes.LDBD_NOT_FOUND: {
            response = 'A leaderboard with the name ' + command.arguments[0] + ' was not found';
            break;
        }
        case errorCodes_1.ErrorCodes.LDBD_COL_NOT_FOUND: {
            response = 'A leaderboard with the column ' + command.arguments[1] + ' was not found';
            break;
        }
        default: {
            response = 'Successfully deleted the leaderboard column ' + command.arguments[1];
            break;
        }
    }
    message.channel.send(response);
};
exports.default = deleteColumn;
//# sourceMappingURL=deleteColumn.js.map