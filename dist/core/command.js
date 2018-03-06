"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Command {
    constructor(message) {
        this.assignParts = (message) => {
            let parts = message.split(' ');
            this.plugin = parts[0];
            if (parts.length >= 2) {
                this.action = parts[1];
                this.arguments = [];
            }
            if (parts.length >= 3) {
                parts = parts.splice(2, parts.length);
                this.arguments = parts;
            }
        };
        this.stripPrefix = (message) => {
            return message.substr(process.env.PREFIX.length);
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