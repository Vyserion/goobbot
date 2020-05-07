import { FishingActionHandler } from "../config/actions";
import { getAllLocations } from "../config/routeInfo";
import { embedPrintLocation } from "../util";
import logger from "../../../../core/util/logger";
import { TCommand } from "../../../../core/typings";

export class ShowAllRoutesHandler implements FishingActionHandler {
	private command: TCommand;

	constructor(command: TCommand) {
		this.command = command;
	}

	async handleAction(): Promise<void> {
		const allLocations = getAllLocations();
		allLocations.forEach(locationName => {
			try {
				const details = embedPrintLocation(locationName);
				this.command.originalMessage.channel.send(details);
			} catch (error) {
				logger.error("Could not parse fishing location", locationName);
			}
		});
	}
}
