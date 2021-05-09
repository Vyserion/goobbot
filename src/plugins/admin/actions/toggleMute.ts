import { ActionHandlerStrategy, Actions } from "../config/actions";
import { TCommand } from "../../../core/typings";

/**
 * Handle the toggling of all user's mute state in a channel.
 */
export class ToggleMuteHandler implements ActionHandlerStrategy {
	private readonly command: TCommand;

	constructor(command: TCommand) {
		this.command = command;
	}

	/**
	 * Toggle the mute status of all users in the channel.
	 * Will mute or unmute based on the action in the original message.
	 * @returns true if successful, false otherwise.
	 */
	async handleAction(): Promise<boolean> {
		const { member } = this.command.originalMessage;
		const { channel } = member.voice;

		const state = this.command.action === Actions.muteAll;

		channel.members.forEach((activeUser) => {
			const { voice } = activeUser;
			voice.setMute(state);
		});

		return true;
	}
}
