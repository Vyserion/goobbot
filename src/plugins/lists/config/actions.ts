export enum Actions {
	createList = "new",
	renameList = "rename",
	deleteList = "delete",

	addValue = "add",
	removeValue = "remove",

	getList = "show"
}

export interface ActionHandlerStrategy {
	handleAction(): Promise<string>;
}
