import { PluginHandlerStrategy, TCommand } from "../../core/typings";
import { ActionHandlerStrategy, Actions } from "./config/actions";
import { ToggleMuteHandler } from "./actions/toggleMute";
import { ShowCode } from "./actions/showCode";

/**
 * The Admin Plugin Handler, handles interactions with admin commands within the bot.
 */
export class AdminHandler implements PluginHandlerStrategy {
	private readonly command: TCommand;

	constructor(command: TCommand) {
		this.command = command;
	}

	/**
	 * Handles the main function of the Admin Plugin handler.
	 * Will parse the action and complete it, then return any text.
	 */
	async handleMessage(): Promise<void> {
		const isAdmin = this.userIsAdmin();
		if (!isAdmin) {
			this.postMessage("Admin commands are restricted to administrators only.");
			return;
		}

		const action: string = this.command.action ? this.command.action : "";
		const actionHandler: ActionHandlerStrategy = this.getActionHandlerStrategy(action);
		await actionHandler.handleAction();
	}

	/**
	 * Gets the correct action strategy.
	 * @param action The action.
	 * @returns The ActionHandlerStrategy to run.
	 */
	getActionHandlerStrategy(action: string): ActionHandlerStrategy {
		switch (action.toLowerCase()) {
			case Actions.muteAll:
			case Actions.unmuteAll:
				return new ToggleMuteHandler(this.command);

			case "code":
				return new ShowCode(this.command);

			default:
				throw new Error("unknown plugin");
		}
	}

	/**
	 * Check if the user associated with the message is an admin.
	 * Will check this based on the presence of the ADMINISTRATOR permission.
	 * @returns true if the user is an admin, false otherwise
	 */
	userIsAdmin(): boolean {
		const { member } = this.command.originalMessage;
		return member.permissions.has("ADMINISTRATOR");
	}

	/**
	 * Send a message to the discord channel.
	 * @param text The text to send.
	 */
	postMessage(text: string): void {
		this.command.originalMessage.channel.send(text);
	}
}
