import { Message } from "discord.js";
import { createCommand } from "./command";

const PLUGIN_NAME = "pluginName";
const ACTION = "action";

describe("core/util/command", () => {
	// @ts-ignore - Reads as unused variable.
	let env;

	beforeEach(() => {
		env = process.env;
		process.env = {
			PREFIX: "!"
		};
	});

	describe("createCommand()", () => {

		it("should map the plugin correctly", () => {
			const messageContent = createMockMessageContent(false, false);
			const message = createMockMessage(messageContent);
			const command = createCommand(message);
			
			expect(command.plugin).toEqual(PLUGIN_NAME);
		});

		it("should map the plugin correctly with a longer prefix", () => {
			process.env.PREFIX = "Vybot, ";

			const messageContent = createMockMessageContent(false, false);
			const message = createMockMessage(messageContent);
			const command = createCommand(message);
			
			expect(command.plugin).toEqual(PLUGIN_NAME);
		});

		it("should not map an action when one is not provided", () => {
			const messageContent = createMockMessageContent(false, false);
			const message = createMockMessage(messageContent);
			const command = createCommand(message);

			expect(command.plugin).toEqual(PLUGIN_NAME);
			expect(command.action).toBeUndefined();
		});

		it("should map an action when one is provided", () => {
			const messageContent = createMockMessageContent(true, false);
			const message = createMockMessage(messageContent);
			const command = createCommand(message);

			expect(command.plugin).toEqual(PLUGIN_NAME);
			expect(command.action).toEqual(ACTION);
		});

		it("should map no arguments when none are provided", () => {
			const messageContent = createMockMessageContent(true, true);

			const message = createMockMessage(messageContent);
			const command = createCommand(message);

			expect(command.plugin).toEqual(PLUGIN_NAME);
			expect(command.action).toEqual(ACTION);
			expect(command.arguments).toHaveLength(0);
		});

		it("should map a single argument when one is provided", () => {
			const expectedArgument = "argumentOne";
			const messageContent = createMockMessageContent(true, true, [expectedArgument]);

			const message = createMockMessage(messageContent);
			const command = createCommand(message);

			expect(command.plugin).toEqual(PLUGIN_NAME);
			expect(command.action).toEqual(ACTION);
			expect(command.arguments).toHaveLength(1);
			const argument = command.arguments[0];
			expect(argument).toEqual(expectedArgument);
		});

		it("should map a single argument when a multi-word argument is provided", () => {
			const expectedArgument = "multiple word argument";
			const escapedArgument = `'${expectedArgument}'`;
			const messageContent = createMockMessageContent(true, true, [escapedArgument]);

			const message = createMockMessage(messageContent);
			const command = createCommand(message);

			expect(command.plugin).toEqual(PLUGIN_NAME);
			expect(command.action).toEqual(ACTION);
			expect(command.arguments).toHaveLength(1);
			const argument = command.arguments[0];
			expect(argument).toEqual(expectedArgument);
		});

		it("should map multiple arguments when multiple are provided", () => {
			const expectedFirstArgument = "argumentOne";
			const expectedSecondArgument = "argumentTwo";
			const messageContent = createMockMessageContent(true, true, [expectedFirstArgument, expectedSecondArgument]);

			const message = createMockMessage(messageContent);
			const command = createCommand(message);

			expect(command.plugin).toEqual(PLUGIN_NAME);
			expect(command.action).toEqual(ACTION);
			expect(command.arguments).toHaveLength(2);
			const firstArgument = command.arguments[0];
			expect(firstArgument).toEqual(expectedFirstArgument);
			const secondArgument = command.arguments[1];
			expect(secondArgument).toEqual(expectedSecondArgument);
		});

		it("should map multiple arguments when multiple are provided, as a mix of single and multi-word arguments", () => {
			const expectedFirstArgument = "argumentOne";
			const expectedSecondArgument = "multi word argument two";
			const escapedSecondArgument = `'${expectedSecondArgument}'`;
			const expectedThirdArgument = "argumentThree";
			const messageContent = createMockMessageContent(true, true, [expectedFirstArgument, escapedSecondArgument, expectedThirdArgument]);

			const message = createMockMessage(messageContent);
			const command = createCommand(message);

			expect(command.plugin).toEqual(PLUGIN_NAME);
			expect(command.action).toEqual(ACTION);
			expect(command.arguments).toHaveLength(3);
			const firstArgument = command.arguments[0];
			expect(firstArgument).toEqual(expectedFirstArgument);
			const secondArgument = command.arguments[1];
			expect(secondArgument).toEqual(expectedSecondArgument);
			const thirdArgument = command.arguments[2];
			expect(thirdArgument).toEqual(expectedThirdArgument);
		});
	});
});

/**
 * Creates a string with the given message content.
 * @param addAction Whether to add the action or not
 * @param addArguments Whether to add arguments or not
 * @param argumentsToAdd An array of arguments to add
 * 
 * @returns The content string
 */
function createMockMessageContent(addAction: boolean, addArguments: boolean, argumentsToAdd?: string[]): string {
	let content = `${process.env.PREFIX}${PLUGIN_NAME}`;

	if (addAction) {
		content += ` ${ACTION}`;
	}

	if (addArguments) {
		if (argumentsToAdd !== undefined && argumentsToAdd.length > 0) {
			argumentsToAdd.forEach(argument => content += ` ${argument}`);
		}
	}

	return content;
}

/**
 * Creates a mock message to be used for testing.
 * @param messageContent The content to add to the Message.content field
 * 
 * @returns The mocked message
 */
function createMockMessage(messageContent: string): Message {
	const message: Message = new Message(null, null, null);
	message.content = messageContent;
	return message;
}