export enum Actions {
    createList = "new",
    renameList = "rename",
    deleteList = "delete",

    addValue = "add"
}

export interface IActionHandlerStrategy {
    handleAction(): Promise<string>;
}