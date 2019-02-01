import { Message } from "discord.js";

export type TCommand = {
	plugin: string;
	action?: string;
	arguments: string[];
	originalMessage: Message;
};
