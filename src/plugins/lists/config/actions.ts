export enum Actions {
    createList = "new",
    renameList = "rename"
}

export interface IActionHandlerStrategy {
    handleAction(): Promise<string>;
}