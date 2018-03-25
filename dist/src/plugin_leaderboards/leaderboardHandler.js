"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
const errorCodes_1 = require("./config/errorCodes");
class LeaderboardHandler {
    constructor() {
        this.name = 'leaderboards';
        this.handleCommand = (command, message) => {
            const action = command.action ? command.action : '';
            switch (action) {
                case 'add': {
                    this.handleAddCommand(command, message);
                    break;
                }
                case 'addcol': {
                    this.handleAddColumnCommand(command, message);
                    break;
                }
                case 'show': {
                    this.handleShowLeaderboard(command, message);
                    break;
                }
                case 'update': {
                    this.handleUpdateCommand(command, message);
                    break;
                }
                case 'delete': {
                    this.handleDeleteCommand(command, message);
                    break;
                }
                default: {
                    this.handleGetCommand(command, message);
                    break;
                }
            }
        };
        this.handleGetCommand = (command, message) => __awaiter(this, void 0, void 0, function* () {
            let results = yield this.controller.getLeaderboards();
            let response = '';
            if (results.length === 0) {
                response = 'There are currently no leaderboards';
            }
            else {
                for (let leaderboardIdx in results) {
                    let leaderboard = results[leaderboardIdx];
                    response += leaderboard.name;
                    response += '\n';
                }
            }
            message.channel.send(response);
        });
        this.handleAddCommand = (command, message) => __awaiter(this, void 0, void 0, function* () {
            let result = yield this.controller.insertLeaderboard(command);
            let response;
            switch (result) {
                case errorCodes_1.ErrorCodes.LDBD_BAD_PARAM: {
                    response = 'No name was provided for the leaderboard';
                    break;
                }
                case errorCodes_1.ErrorCodes.LDBD_DUP_NAME: {
                    response = 'A leaderboard with the name ' + command.arguments[0] + ' already exists';
                    break;
                }
                default: {
                    response = 'Successfully created leaderboard ' + command.arguments[0];
                    break;
                }
            }
            message.channel.send(response);
        });
        this.handleAddColumnCommand = (command, message) => __awaiter(this, void 0, void 0, function* () {
            let result = yield this.controller.insertLeaderboardColumn(command);
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
                default: {
                    response = 'Successfully created leaderboard column ' + command.arguments[1];
                    break;
                }
            }
            message.channel.send(response);
        });
        this.handleShowLeaderboard = (command, message) => __awaiter(this, void 0, void 0, function* () {
            let result = yield this.controller.getLeaderboard(command);
        });
        this.handleUpdateCommand = (command, message) => __awaiter(this, void 0, void 0, function* () {
            let result = yield this.controller.updateLeaderboard(command);
            let response;
            switch (result) {
                case errorCodes_1.ErrorCodes.LDBD_BAD_PARAM: {
                    response = 'No names were provided for the leaderboard';
                    break;
                }
                case errorCodes_1.ErrorCodes.LDBD_NOT_FOUND: {
                    response = 'A leaderboard with the name ' + command.arguments[0] + ' was not found';
                    break;
                }
                default: {
                    response = 'Successfully updated leaderboard ' + command.arguments[0];
                    break;
                }
            }
            message.channel.send(response);
        });
        this.handleDeleteCommand = (command, message) => __awaiter(this, void 0, void 0, function* () {
            let result = yield this.controller.deleteLeaderboard(command);
            let response;
            switch (result) {
                case errorCodes_1.ErrorCodes.LDBD_BAD_PARAM: {
                    response = 'No names were provided for the leaderboard';
                    break;
                }
                case errorCodes_1.ErrorCodes.LDBD_NOT_FOUND: {
                    response = 'A leaderboard with the name ' + command.arguments[0] + ' was not found';
                    break;
                }
                default: {
                    response = 'Successfully deleted leaderboard ' + command.arguments[0];
                    break;
                }
            }
            message.channel.send(response);
        });
        this.controller = new controller_1.LeaderboardController();
    }
}
exports.LeaderboardHandler = LeaderboardHandler;
//# sourceMappingURL=leaderboardHandler.js.map