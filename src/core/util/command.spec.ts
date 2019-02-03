import "mocha";
import { expect } from "chai";
import { Message } from "discord.js";
import { mock, instance, when } from "ts-mockito";
import { createCommand } from "./command";
import { TCommand } from "../typings";

describe("core/typings", () => {
	// @ts-ignore - Reads as unused variable.
	let env;

	beforeEach(() => {
		env = process.env;
		process.env = {
			PREFIX: "!"
		};
	});

	describe("createCommand()", () => {
		// Assumption: assignParts is called indirectly from the constructor.
		// There's no need to explicitly call it at this time.

		it("should map the plugin correctly.", () => {
			const message: Message = mock(Message);
			const expectedPlugin: string = "pluginName";
			const pluginMessage: string = process.env.PREFIX + expectedPlugin;

			when(message.content).thenReturn(pluginMessage);

			const command: TCommand = createCommand(instance(message));

			expect(command.plugin).to.equal(expectedPlugin);
		});

		it("should not map an action when one is not provided.", () => {
			const message: Message = mock(Message);
			const messageText: string = process.env.PREFIX + "pluginName";
			when(message.content).thenReturn(messageText);

			const command: TCommand = createCommand(instance(message));

			expect(command.action).to.be.undefined;
		});

		it("should map an action when one is provided.", () => {
			const message: Message = mock(Message);
			const expectedAction: string = "action";
			const messageText: string = process.env.PREFIX + "pluginName " + expectedAction;
			when(message.content).thenReturn(messageText);

			const command: TCommand = createCommand(instance(message));

			expect(command.action).to.equal(expectedAction);
		});

		it("should map no arguments when none are provided.", () => {
			const message: Message = mock(Message);
			const messageText: string = process.env.PREFIX + "pluginName action";
			when(message.content).thenReturn(messageText);

			const command: TCommand = createCommand(instance(message));

			expect(command.arguments.length).to.equal(0);
		});

		it("should map a single argument when one is provided.", () => {
			const message: Message = mock(Message);
			const expectedArgument: string = "argumentOne";
			const messageText: string = process.env.PREFIX + "pluginName action " + expectedArgument;
			when(message.content).thenReturn(messageText);

			const command: TCommand = createCommand(instance(message));

			expect(command.arguments.length).to.equal(1);
			const returnedArgument: string = command.arguments[0];
			expect(returnedArgument).to.equal(expectedArgument);
		});

		it("should map a single argument when a multi-word argument is provided", () => {
			const message: Message = mock(Message);
			const expectedArgument: string = "three word argument";
			const arrangedArgument: string = "'" + expectedArgument + "'";
			const messageText: string = process.env.PREFIX + "pluginName action " + arrangedArgument;
			when(message.content).thenReturn(messageText);

			const command: TCommand = createCommand(instance(message));

			expect(command.arguments.length).to.equal(1);
			const returnedArgument: string = command.arguments[0];
			expect(returnedArgument).to.equal(expectedArgument);
		});

		it("should map multiple arguments when multiple are provided.", () => {
			const message: Message = mock(Message);
			const expectedFirstArgument: string = "argumentOne";
			const expectedSecondArgument: string = "argumentTwo";
			const messageText: string =
				process.env.PREFIX + "pluginName action " + expectedFirstArgument + " " + expectedSecondArgument;
			when(message.content).thenReturn(messageText);

			const command: TCommand = createCommand(instance(message));

			expect(command.arguments.length).to.equal(2);
			const returnedArgumentOne: string = command.arguments[0];
			expect(returnedArgumentOne).to.equal(expectedFirstArgument);
			const returnedArgumentTwo: string = command.arguments[1];
			expect(returnedArgumentTwo).to.equal(expectedSecondArgument);
		});

		it("should map multiple arguments when multiple are provided, as a mix of single and multi-word arguments", () => {
			const message: Message = mock(Message);
			const expectedFirstArgument: string = "argumentOne";
			const expectedSecondArgument: string = "argument Two Multiword";
			const arrangedSecondArgument: string = "'" + expectedSecondArgument + "'";
			const expectedThirdArgument: string = "argumentThree";
			const messageText: string =
				process.env.PREFIX +
				"pluginName action " +
				expectedFirstArgument +
				" " +
				arrangedSecondArgument +
				" " +
				expectedThirdArgument;
			when(message.content).thenReturn(messageText);

			const command: TCommand = createCommand(instance(message));

			expect(command.arguments.length).to.equal(3);
			const returnedArgumentOne: string = command.arguments[0];
			expect(returnedArgumentOne).to.equal(expectedFirstArgument);
			const returnedArgumentTwo: string = command.arguments[1];
			expect(returnedArgumentTwo).to.equal(expectedSecondArgument);
			const returnedArgumentThree: string = command.arguments[2];
			expect(returnedArgumentThree).to.equal(expectedThirdArgument);
		});
	});
});
