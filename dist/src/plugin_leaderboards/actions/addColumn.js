"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorCodes_1 = require("../config/errorCodes");
const controller_1 = require("../controller");
const addColumn = async (command, message) => {
    let result = await controller_1.LeaderboardController.insertLeaderboardColumn(command);
    let response;
    switch (result) {
        case errorCodes_1.ErrorCodes.LDBD_BAD_PARAM: {
            if (command.arguments.length < 2) {
                response = 'No leaderboard or column name was provided';
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
        case errorCodes_1.ErrorCodes.LDBD_DUP_NAME: {
            response = 'A column with the name ' + command.arguments[1] + ' for leaderboard ' + command.arguments[0] + ' already exists';
            break;
        }
        case errorCodes_1.ErrorCodes.LDBD_BAD_TYPE: {
            response = 'The column type ' + command.arguments[2] + ' is not allowed.';
            break;
        }
        default: {
            response = 'Successfully created leaderboard column ' + command.arguments[1];
            break;
        }
    }
    message.channel.send(response);
};
exports.default = addColumn;
//# sourceMappingURL=addColumn.js.map