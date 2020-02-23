import { ColumnTypes } from "../config";

export type TLeaderboard = {
	id?: number;
	name: string;
	columns: TColumn[];
	rows: TRow[];
	values: TValue[];
};

export type TColumn = {
	id?: number;
	name: string;
	type: ColumnTypes;
};

export type TRow = {
	id?: number;
	name: string;
};

export type TValue = {
	leaderboard_id?: number;
	rowid: number;
	columnid: number;
	value: unknown;
};
