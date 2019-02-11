export enum Actions {
    createList = "new",
    renameList = "rename",
    deleteList = "delete"
}

export interface IActionHandlerStrategy {
    handleAction(): Promise<string>;
}