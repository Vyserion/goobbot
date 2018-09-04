import { Column } from "./Column";
import { Row } from "./Row";
import { Value } from "./Value";

export interface Leaderboard {
	id?: number;
	name: string;
	columns: Column[];
	rows: Row[];
	values: Value[];
}
