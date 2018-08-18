import { ColumnTypes } from "../config/columnTypes";

export interface Column {
	id?: number;
	name: string;
	type: ColumnTypes;
}
