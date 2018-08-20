"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ReturnCodes_1 = require("../config/ReturnCodes");
const RowController_1 = require("../controllers/RowController");
const updateLeaderboardRow = async (command, message) => {
    let result = await RowController_1.RowController.updateLeaderboardRow(command);
    let response;
    switch (result) {
        case ReturnCodes_1.ReturnCodes.INCORRECT_PARAM_LENGTH: {
            if (command.arguments.length < 3) {
                response =
                    "Not enough parameters provided - please check you have a Leaderboard Name, Column Name, and the new Column Name";
            }
            else {
                response = "Too many parameters were provided";
            }
            break;
        }
        case ReturnCodes_1.ReturnCodes.LEADERBOARD_NOT_FOUND: {
            response = `A leaderboard with the name ${command.arguments[0]} was not found`;
            break;
        }
        case ReturnCodes_1.ReturnCodes.ROW_NOT_FOUND: {
            response = `A leaderboard with the name ${command.arguments[1]} was not found`;
            break;
        }
        default: {
            response = `Successfully updates the leaderboard row ${command.arguments[1]}`;
            break;
        }
    }
    message.channel.send(response);
};
exports.default = updateLeaderboardRow;
//# sourceMappingURL=updateRow.js.map