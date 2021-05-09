export enum FishingActions {
	showAll = "showall",
	route = "route",
	spot = "spot",
	help = "help",
}

export interface FishingActionHandler {
	handleAction(): Promise<void>;
}
