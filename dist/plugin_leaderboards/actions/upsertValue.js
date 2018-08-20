"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ReturnCodes_1 = require("../config/ReturnCodes");
const ValueController_1 = require("../controllers/ValueController");
const upsertValue = async (command, message) => {
    let result = await ValueController_1.ValueController.upsertValue(command);
    let response;
    switch (result) {
        case ReturnCodes_1.ReturnCodes.INCORRECT_PARAM_LENGTH: {
            if (command.arguments.length < 4) {
                response =
                    "Not enough parameters provided - please check you have a Leaderboard Name, Column Name, Row Name, and the value.";
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
        case ReturnCodes_1.ReturnCodes.COLUMN_NOT_FOUND: {
            response = `A column with the name ${command.arguments[1]} was not found`;
            break;
        }
        case ReturnCodes_1.ReturnCodes.ROW_NOT_FOUND: {
            response = `A row with the name ${command.arguments[2]} was not found`;
            break;
        }
        default: {
            response = `Successfully updated the value in column ${command.arguments[1]} and row ${command.arguments[2]}`;
            break;
        }
    }
    message.channel.send(response);
};
exports.default = upsertValue;
//# sourceMappingURL=upsertValue.js.map