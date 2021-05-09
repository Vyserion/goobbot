import { FishingActionHandler } from "../config/actions";
import { TCommand } from "../../../../core/typings";
import { getLocationKeyFromInput, isALocation } from "../config/routeInfo";
import { embedPrintLocation } from "../util";
import logger from "../../../../core/util/logger";

export class RouteHandler implements FishingActionHandler {
	private command: TCommand;

	constructor(command: TCommand) {
		this.command = command;
	}

	async handleAction(): Promise<void> {
		if (this.command.arguments.length < 4) {
			this.postMessage("3 ocean fishing locations expected");
			return;
		}

		const locations = this.command.arguments;
		locations.shift();

		let isValid = true;
		const invalidLocations: string[] = [];
		locations.forEach((location) => {
			const validLocation = isALocation(location);
			if (!validLocation) {
				isValid = false;
				invalidLocations.push(location);
			}
		});

		if (!isValid) {
			if (invalidLocations.length === 1) {
				this.postMessage(`${invalidLocations[0]} is not a valid fishing location`);
			} else {
				this.postMessage(`${invalidLocations.join(", ")} are not valid fishing locations`);
			}
			return;
		}

		locations.forEach((locationName) => {
			try {
				const locationKey = getLocationKeyFromInput(locationName);
				const details = embedPrintLocation(locationKey);
				this.command.originalMessage.channel.send(details);
			} catch (error) {
				logger.error("Could not parse fishing location", locationName);
			}
		});
	}

	/**
	 * Send a message to the discord channel.
	 * @param text The text to send.
	 */
	postMessage(text: string): void {
		this.command.originalMessage.channel.send(text);
	}
}
