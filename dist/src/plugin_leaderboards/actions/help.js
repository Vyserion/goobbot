"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpMessages_1 = require("../config/helpMessages");
const showHelp = async (command, message) => {
    if (command.arguments.length === 0) {
        message.channel.send(helpMessages_1.default.showCommands);
        return;
    }
    else {
        let requestedCommand = command.arguments[0];
        message.channel.send(helpMessages_1.default.showCommands);
        return;
    }
};
exports.default = showHelp;
//# sourceMappingURL=help.js.map