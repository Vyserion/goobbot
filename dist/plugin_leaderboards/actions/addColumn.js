"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ReturnCodes_1 = require("../config/ReturnCodes");
const ColumnController_1 = require("../controllers/ColumnController");
const addColumn = async (command, message) => {
    let result = await ColumnController_1.ColumnController.insertLeaderboardColumn(command);
    let response;
    switch (result) {
        case ReturnCodes_1.ReturnCodes.INCORRECT_PARAM_LENGTH: {
            if (command.arguments.length < 2) {
                response = "No leaderboard or column name was provided";
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
        case ReturnCodes_1.ReturnCodes.LEADERBOARD_DUPLICATE_NAME: {
            response =
                "A column with the name " +
                    command.arguments[1] +
                    " for leaderboard " +
                    command.arguments[0] +
                    " already exists";
            break;
        }
        case ReturnCodes_1.ReturnCodes.BAD_PARAMETER_TYPE: {
            response = "The column type " + command.arguments[2] + " is not allowed.";
            break;
        }
        default: {
            response = "Successfully created leaderboard column " + command.arguments[1];
            break;
        }
    }
    message.channel.send(response);
};
exports.default = addColumn;
//# sourceMappingURL=addColumn.js.map