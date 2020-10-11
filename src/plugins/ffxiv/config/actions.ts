export enum Actions {
	fishing = "fishing",
	help = "help"
}

export interface ActionHandlerStrategy {
	handleAction(): Promise<void>;
}
