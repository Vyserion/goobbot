import { Message } from "discord.js";

/**
 * Creates a mocked Message.
 * @param {string} content The optional content of the message.
 * @returns {Message} The mocked out Message.
 */
export function createMockedMessage(content?: string): Message {
	const mockedMessage = {} as Message;

	Object.keys(mockedMessage).forEach((key) => {
		mockedMessage[key] = undefined;
	});

	if (content) {
		mockedMessage.content = content;
	}

	return mockedMessage;
}
