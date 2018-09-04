"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RowController_1 = require("../controllers/RowController");
const ReturnCodes_1 = require("../config/ReturnCodes");
async function addRow(command) {
    const result = await RowController_1.RowController.insertLeaderboardRow(command);
    let response;
    switch (result) {
        case ReturnCodes_1.ReturnCodes.INCORRECT_PARAM_LENGTH: {
            if (command.arguments.length < 2) {
                response = `No leaderboard or row name was provided`;
            }
            else {
                response = `Too many arguments were provided`;
            }
            break;
        }
        case ReturnCodes_1.ReturnCodes.LEADERBOARD_NOT_FOUND: {
            response = `A leaderboard with the name ${command.arguments[0]} was not found`;
            break;
        }
        case ReturnCodes_1.ReturnCodes.LEADERBOARD_DUPLICATE_NAME: {
            response = `A row with the name ${command.arguments[1]} for leaderboard ${command.arguments[0]} already exists`;
            break;
        }
        default: {
            response = `Successfully created leaderboard row ${command.arguments[1]}`;
            break;
        }
    }
    return response;
}
exports.addRow = addRow;
//# sourceMappingURL=addRow.js.map