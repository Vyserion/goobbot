import { FishingActionHandler } from "../config/actions";
import { TCommand } from "../../../../core/typings";
import { getLocationKeyFromInput, isALocation } from "../config/routeInfo";
import logger from "../../../../core/util/logger";
import { embedPrintLocation } from "../util";

export class SpotHandler implements FishingActionHandler {
	private command: TCommand;

	constructor(command: TCommand) {
		this.command = command;
	}

	async handleAction(): Promise<void> {
		if (this.command.arguments.length < 2) {
			this.postMessage("An ocean fishing spot is required");
			return;
		}

		const locationArgs = this.command.arguments;
		locationArgs.shift();

		const isValid = isALocation(locationArgs[0]);
		if (!isValid) {
			this.postMessage(`${locationArgs[0]} is not a valid fishing location`);
			return;
		}

		try {
			const locationKey = getLocationKeyFromInput(locationArgs[0]);
			const details = embedPrintLocation(locationKey);
			this.command.originalMessage.channel.send(details);
		} catch (error) {
			logger.error("Could not parse fishing location", locationArgs[0]);
		}
	}

	/**
	 * Send a message to the discord channel.
	 * @param text The text to send.
	 */
	postMessage(text: string): void {
		this.command.originalMessage.channel.send(text);
	}
}
