import { TColumn } from "./column";
import { TRow } from "./row";
import { TValue } from "./value";

export type TLeaderboard = {
	id?: number;
	name: string;
	columns: TColumn[];
	rows: TRow[];
	values: TValue[];
}
