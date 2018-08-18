import { Column } from "./Column";
import { Row } from "./Row";

export interface Leaderboard {
	id?: number;
	name: string;
	columns: Column[];
	rows: Row[];
}
