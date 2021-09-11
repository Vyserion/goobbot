export enum Plugins {
	leaderboards = "leaderboards",
	lists = "lists",
	ff = "ff",
	admin = "admin",
}

// This can go away once all plugins are slash commanded
export const activeSlashCommandPlugins: string[] = ["lfg", "role-assigner"];
