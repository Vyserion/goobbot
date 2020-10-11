import { ActionHandlerStrategy } from "../config/actions";
import { TCommand } from "../../../core/typings";
import { FishingActions, FishingActionHandler } from "./config/actions";
import { ShowAllRoutesHandler } from "./actions/showAll";
import { RouteHandler } from "./actions/route";
import { SpotHandler } from "./actions/spot";
import { HelpHandler } from "./actions/help";

export class FishingHandler implements ActionHandlerStrategy {
	private readonly command: TCommand;

	constructor(command: TCommand) {
		this.command = command;
	}

	async handleAction(): Promise<void> {
		if (this.command.arguments.length === 0) {
			this.postMessage("No fishing command was provided");
		}

		const fishingAction = this.command.arguments[0];
		let actionHandler: FishingActionHandler;
		switch (fishingAction) {
			case FishingActions.showAll:
				actionHandler = new ShowAllRoutesHandler(this.command);
				break;
			case FishingActions.route:
				actionHandler = new RouteHandler(this.command);
				break;
			case FishingActions.spot:
				actionHandler = new SpotHandler(this.command);
				break;
			case FishingActions.help:
				actionHandler = new HelpHandler(this.command);
				break;
			default:
				this.postMessage(`The fishing command ${fishingAction} wasn't found.`);
		}

		actionHandler.handleAction();
	}

	/**
	 * Send a message to the discord channel.
	 * @param text The text to send.
	 */
	postMessage(text: string): void {
		this.command.originalMessage.channel.send(text);
	}
}
