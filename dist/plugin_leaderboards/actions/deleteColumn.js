"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ReturnCodes_1 = require("../config/ReturnCodes");
const ColumnController_1 = require("../controllers/ColumnController");
const deleteColumn = async (command, message) => {
    let result = await ColumnController_1.ColumnController.deleteLeaderboardColumn(command);
    let response;
    switch (result) {
        case ReturnCodes_1.ReturnCodes.INCORRECT_PARAM_LENGTH: {
            if (command.arguments.length < 2) {
                response =
                    "Not enough parameters provided = please check you have a leaderboard name and a column name.";
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
        default: {
            response = "Successfully deleted the leaderboard column " + command.arguments[1];
            break;
        }
    }
    message.channel.send(response);
};
exports.default = deleteColumn;
//# sourceMappingURL=deleteColumn.js.map