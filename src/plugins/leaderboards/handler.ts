import { PluginHandlerStrategy, TCommand } from "../../core/typings";
import { Actions, ActionHandlerStrategy } from "./config";
import {
	CreateLeaderboardHandler,
	UpdateLeaderboardHandler,
	DeleteLeaderboardHandler,
	GetLeaderboardHandler,
	CreateColumnHandler,
	UpdateColumnHandler,
	DeleteColumnHandler,
	CreateRowHandler,
	UpdateRowHandler,
	DeleteRowHandler,
	UpdateValueHandler,
	HelpHandler,
	GetLeaderboardsHandler,
} from "./actions";

export class LeaderboardHandler implements PluginHandlerStrategy {
	private readonly command: TCommand;

	constructor(command: TCommand) {
		this.command = command;
	}

	async handleMessage(): Promise<void> {
		const action: string = this.command.action ? this.command.action.toLowerCase() : "";
		const actionHandler: ActionHandlerStrategy = this.getActionHandlerStrategy(action);
		const text = await actionHandler.handleAction();
		this.postMessage(text);
	}

	getActionHandlerStrategy(action: string): ActionHandlerStrategy {
		switch (action) {
			case Actions.getLeaderboard:
				return new GetLeaderboardHandler(this.command);

			case Actions.createLeaderboard:
				return new CreateLeaderboardHandler(this.command);

			case Actions.updateLeaderboard:
				return new UpdateLeaderboardHandler(this.command);

			case Actions.deleteLeaderboard:
				return new DeleteLeaderboardHandler(this.command);

			case Actions.createColumn:
				return new CreateColumnHandler(this.command);

			case Actions.updateColumn:
				return new UpdateColumnHandler(this.command);

			case Actions.deleteColumn:
				return new DeleteColumnHandler(this.command);

			case Actions.createRow:
				return new CreateRowHandler(this.command);

			case Actions.updateRow:
				return new UpdateRowHandler(this.command);

			case Actions.deleteRow:
				return new DeleteRowHandler(this.command);

			case Actions.upsertValue:
				return new UpdateValueHandler(this.command);

			case Actions.help:
				return new HelpHandler(this.command);

			default:
				return new GetLeaderboardsHandler(this.command);
		}
	}

	postMessage(text: string): void {
		this.command.originalMessage.channel.send(text);
	}
}
