"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RowController_1 = require("../controllers/RowController");
const ReturnCodes_1 = require("../config/ReturnCodes");
async function deleteRow(command) {
    const result = await RowController_1.RowController.deleteLeaderboardRow(command);
    let response;
    switch (result) {
        case ReturnCodes_1.ReturnCodes.INCORRECT_PARAM_LENGTH: {
            if (command.arguments.length < 2) {
                response = `Not enough parameters provided = please check you have a leaderboard name and a row name`;
            }
            else {
                response = `Too many arguments were provided`;
            }
            break;
        }
        case ReturnCodes_1.ReturnCodes.LEADERBOARD_NOT_FOUND: {
            response = `A leaderbaord with the name ${command.arguments[0]} could now be found`;
            break;
        }
        case ReturnCodes_1.ReturnCodes.ROW_NOT_FOUND: {
            response = `A row with the name ${command.arguments[1]} could not be found`;
            break;
        }
        default: {
            response = `Successfully deleted the leaderboard row ${command.arguments[1]}`;
            break;
        }
    }
    return response;
}
exports.deleteRow = deleteRow;
//# sourceMappingURL=deleteRow.js.map