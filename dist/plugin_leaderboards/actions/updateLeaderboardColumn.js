"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ReturnCodes_1 = require("../config/ReturnCodes");
const ColumnController_1 = require("../controllers/ColumnController");
const updateLeaderboardColumn = async (command, message) => {
    let result = await ColumnController_1.ColumnController.updateLeaderboardColumn(command);
    let response;
    switch (result) {
        case ReturnCodes_1.ReturnCodes.INCORRECT_PARAM_LENGTH: {
            if (command.arguments.length < 4) {
                response =
                    "Not enough parameters provided - please check you have a Leaderboard Name, Column Name, Action, and value.";
            }
            else {
                response = "Too many arguments were provided";
            }
            break;
        }
        case ReturnCodes_1.ReturnCodes.LEADERBOARD_NOT_FOUND: {
            response = "A leaderboard with the name " + command.arguments[0] + " was not found";
            break;
        }
        case ReturnCodes_1.ReturnCodes.COLUMN_NOT_FOUND: {
            response = "A leaderboard with the column " + command.arguments[1] + " was not found";
            break;
        }
        case ReturnCodes_1.ReturnCodes.INVALID_PARAMETER: {
            response = "The action " + command.arguments[2] + " cannot be performed on this column";
            break;
        }
        case ReturnCodes_1.ReturnCodes.BAD_PARAMETER_TYPE: {
            response = "The column type " + command.arguments[3] + " is not allowed.";
            break;
        }
        default: {
            response = "Succesfully updated the leaderboard column " + command.arguments[2];
            break;
        }
    }
    message.channel.send(response);
};
exports.default = updateLeaderboardColumn;
//# sourceMappingURL=updateLeaderboardColumn.js.map