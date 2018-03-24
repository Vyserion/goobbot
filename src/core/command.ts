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
        }

        if (parts.length >= 3) {
            const remainingParts: string[] = parts.splice(2, parts.length);
            this.arguments = this.parseArguments(remainingParts);
        }
    }

    stripPrefix = (message: string): string => {
        return message.substr(process.env.PREFIX.length);
    };

    parseArguments = (inputs: string[]): string[] => {
        let parsedArguments: string[] = [];

        let buffer: string = '';
        for (let input of inputs) {
            if (input.startsWith("'")) {
                let temp: string = input.substring(1, input.length);
                buffer = temp;
            } else if (input.endsWith("'")) {
                let temp: string = input.substring(0, input.length - 1);
                buffer += ' ' + temp;
                parsedArguments.push(buffer);
                buffer = '';
            } else if (buffer.length > 0) {
                buffer += ' ' + input;
            } else {
                parsedArguments.push(input);
            }
        }

        return parsedArguments;
    };
};
