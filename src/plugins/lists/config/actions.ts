export enum Actions {
    createList = "new"
}

export interface IActionHandlerStrategy {
    handleAction(): Promise<string>;
}