"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Command {
    constructor(message) {
        this.stripPrefix = (message) => {
            return message.substr(process.env.PREFIX.length);
        };
        let input = this.stripPrefix(message.content);
        let parts = input.split(' ');
        this.plugin = parts[0];
        if (parts.length >= 2) {
            this.action = parts[1];
        }
        if (parts.length >= 3) {
            parts = parts.splice(2, parts.length);
            this.arguments = parts;
        }
        this.originalMessage = message;
    }
    ;
}
exports.Command = Command;
;
//# sourceMappingURL=command.js.map