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
        if (parts.length > 1) {
            this.action = parts[1];
        }
        if (parts.length > 2) {
            parts = parts.splice(0, 2);
            this.arguments = parts;
        }
        this.originalMessage = message;
    }
    ;
}
exports.Command = Command;
;
//# sourceMappingURL=command.js.map