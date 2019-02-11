export enum Actions {
    createList = "new",
    renameList = "rename",
    deleteList = "delete",

    addValue = "add",
    removeValue = "remove"
}

export interface IActionHandlerStrategy {
    handleAction(): Promise<string>;
}