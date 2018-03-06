import { Message } from 'discord.js';

export class Command {
    
    plugin: string;
    action: string;
    arguments: string[];
    originalMessage: Message;

    constructor(message: Message) {
        let input = this.stripPrefix(message.content);
        this.assignParts(input);
        this.originalMessage = message;
    };

    assignParts = (message: string): void => {
        let parts: string[] = message.split(' ');
        
        this.plugin = parts[0];

        if (parts.length >= 2) {
            this.action = parts[1];
            this.arguments = [];
        }

        if (parts.length >= 3) {
            parts = parts.splice(2, parts.length);
            this.arguments = parts;
        }
    }

    stripPrefix = (message: string): string => {
        return message.substr(process.env.PREFIX.length);
    };
};
