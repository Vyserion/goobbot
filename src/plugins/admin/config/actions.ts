export enum Actions {
	muteAll = "muteall",
	unmuteAll = "unmuteall"
}

export interface ActionHandlerStrategy {
	handleAction(): Promise<boolean>;
}
