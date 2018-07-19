"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RowController_1 = require("../controllers/RowController");
const errorCodes_1 = require("../config/errorCodes");
const deleteRow = async (command, message) => {
    let result = await RowController_1.RowController.deleteLeaderboardRow(command);
    let response;
    switch (result) {
        case errorCodes_1.ErrorCodes.LDBD_BAD_PARAM: {
            if (command.arguments.length < 2) {
                response = 'Not enough parameters provided = please check you have a leaderboard name and a row name';
            }
            else {
                response = 'Too many arguments were provided';
            }
            break;
        }
        case errorCodes_1.ErrorCodes.LDBD_NOT_FOUND: {
            response = `A leaderbaord with the name ${command.arguments[0]} could now be found`;
            break;
        }
        case errorCodes_1.ErrorCodes.LDBD_ROW_NOT_FOUND: {
            response = `A row with the name ${command.arguments[1]} could not be found`;
            break;
        }
        default: {
            response = `Successfully deleted the leaderboard row ${command.arguments[1]}`;
            break;
        }
    }
    message.channel.send(response);
};
exports.default = deleteRow;
//# sourceMappingURL=deleteRow.js.map