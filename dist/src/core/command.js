"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Command {
    constructor(message) {
        this.assignParts = (message) => {
            let parts = message.split(' ');
            this.plugin = parts[0];
            if (parts.length >= 2) {
                this.action = parts[1];
            }
            if (parts.length >= 3) {
                const remainingParts = parts.splice(2, parts.length);
                this.arguments = this.parseArguments(remainingParts);
            }
        };
        this.stripPrefix = (message) => {
            return message.substr(process.env.PREFIX.length);
        };
        this.parseArguments = (inputs) => {
            let parsedArguments = [];
            let buffer = '';
            for (let input of inputs) {
                if (input.startsWith("'")) {
                    let temp = input.substring(1, input.length);
                    buffer = temp;
                }
                else if (input.endsWith("'")) {
                    let temp = input.substring(0, input.length - 1);
                    buffer += ' ' + temp;
                    parsedArguments.push(buffer);
                    buffer = '';
                }
                else if (buffer.length > 0) {
                    buffer += ' ' + input;
                }
                else {
                    parsedArguments.push(input);
                }
            }
            return parsedArguments;
        };
        let input = this.stripPrefix(message.content);
        this.assignParts(input);
        this.originalMessage = message;
    }
    ;
}
exports.Command = Command;
;
//# sourceMappingURL=command.js.map