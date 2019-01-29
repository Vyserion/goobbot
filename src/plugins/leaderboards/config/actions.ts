export enum Actions {
	createLeaderboard = "new",
	updateLeaderboard = "update",
	deleteLeaderboard = "delete",

	createColumn = "newcol",
	updateColumn = "updatecol",
	deleteColumn = "deletecol",

	createRow = "newrow",
	updateRow = "updaterow",
	deleteRow = "deleterow",

	upsertValue = "update",

	getLeaderboard = "show",

	help = "help"
}

export interface IActionHandlerStrategy {
	handleAction(): Promise<string>;
}
