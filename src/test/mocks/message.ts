import { Message } from "discord.js";

/**
 * Creates a mocked Message.
 * 
 * @returns The Message
 */
export function createMockedMessage(): Message {
    let mockedMessage = {} as Message;

    Object.keys(mockedMessage).forEach(key => {
        mockedMessage[key] = undefined;
    });

    return mockedMessage;
}