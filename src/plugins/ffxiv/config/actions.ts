export enum Actions {
	fishing = "fishing"
}

export interface ActionHandlerStrategy {
	handleAction(): Promise<void>;
}
