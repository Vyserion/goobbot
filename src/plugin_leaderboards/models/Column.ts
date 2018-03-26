import { ColumnTypes } from "../config/columnTypes";

export default class Column {

    name: string;
    type: ColumnTypes;
    
    constructor(name: string, type: ColumnTypes) {
        this.name = name;
        this.type = type;
    }
}