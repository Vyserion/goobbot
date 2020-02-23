import { Message } from "discord.js";
import { TCommand } from "../typings";

/**
 * Strips the prefix from a given string.
 * @param message The content to strip the prefix from.
 * @returns The stripped string.
 */
function stripPrefix(message: string): string {
	return message.substr(process.env.PREFIX.length);
}

/**
 * Parses arguments and returns an array of arguments, depending if they are escaped or not.
 * @param inputs An array of inputs.
 * @returns An array of arguments.
 */
function parseArguments(inputs: string[]): string[] {
	const parsedArguments: string[] = [];

	let buffer = "";

	inputs.forEach(input => {
		if (input.startsWith("'")) {
			const temp: string = input.substring(1, input.length);
			buffer = temp;
		} else if (input.endsWith("'")) {
			const temp: string = input.substring(0, input.length - 1);
			buffer += ` ${temp}`;
			parsedArguments.push(buffer);
			buffer = "";
		} else if (buffer.length > 0) {
			buffer += ` ${input}`;
		} else {
			parsedArguments.push(input);
		}
	});

	return parsedArguments;
}

/**
 * Creates a command object from a provided message.
 * @param message The discord message.
 * @returns A formatted command object.
 */
export function createCommand(message: Message): TCommand {
	const input = stripPrefix(message.content);
	const parts: string[] = input.split(" ");

	let args: string[] = [];
	if (parts.length >= 3) {
		const remainingParts: string[] = parts.splice(2, parts.length);
		args = parseArguments(remainingParts);
	}

	const command: TCommand = {
		plugin: parts[0],
		originalMessage: message,
		arguments: args,
		action: parts[1] || undefined
	};

	if (parts.length >= 3) {
		const remainingParts: string[] = parts.splice(2, parts.length);
		command.arguments = parseArguments(remainingParts);
	}

	return command;
}
