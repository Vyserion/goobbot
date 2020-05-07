export enum FishingActions {
	showAll = "showall",
	route = "route"
}

export interface FishingActionHandler {
	handleAction(): Promise<void>;
}
