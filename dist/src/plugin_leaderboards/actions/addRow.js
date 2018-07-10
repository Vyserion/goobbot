"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RowController_1 = require("../controllers/RowController");
const errorCodes_1 = require("../config/errorCodes");
const addRow = async (command, message) => {
    let result = await RowController_1.RowController.insertLeaderboardRow(command);
    let response;
    switch (result) {
        case errorCodes_1.ErrorCodes.LDBD_BAD_PARAM: {
            if (command.arguments.length < 2) {
                response = `No leaderboard or row name was provided`;
            }
            else {
                response = `Too many arguments were provided`;
            }
            break;
        }
        case errorCodes_1.ErrorCodes.LDBD_NOT_FOUND: {
            response = `A leaderboard with the name ${command.arguments[0]} was not found`;
            break;
        }
        case errorCodes_1.ErrorCodes.LDBD_DUP_NAME: {
            response = `A row with the name ${command.arguments[1]} for leaderboard ${command.arguments[0]} already exists`;
            break;
        }
        default: {
            response = `Successfully created leaderboard row ${command.arguments[1]}`;
            break;
        }
    }
    message.channel.send(response);
};
exports.default = addRow;
//# sourceMappingURL=addRow.js.map