import { ColumnTypes } from "../config/ColumnTypes";

export interface Column {
	id?: number;
	name: string;
	type: ColumnTypes;
}
