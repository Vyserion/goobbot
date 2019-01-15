import { ColumnTypes } from "../config/columnTypes";

export type TColumn = {
	id?: number;
	name: string;
	type: ColumnTypes;
}
