"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prettyPrintLeaderboard = (leaderboard) => {
    // Build a columns array for length calc
    const columns = [];
    const rowColumn = [""];
    for (const row of leaderboard.rows) {
        rowColumn.push(row.name);
    }
    columns.push(rowColumn);
    for (const col of leaderboard.columns) {
        const column = [];
        column.push(col.name);
        for (const row of leaderboard.rows) {
            for (const val of leaderboard.values) {
                if (val["rowid"] === row.id && val["columnid"] === col.id) {
                    column.push(val.value);
                }
            }
        }
        columns.push(column);
    }
    // Get column lengths
    const columnLengths = new Array(columns.length).fill(0);
    for (const colIdx in columns) {
        for (const val of columns[colIdx]) {
            if (val.length > columnLengths[colIdx]) {
                columnLengths[colIdx] = val.length;
            }
        }
    }
    // Build output string
    let output = "```";
    output += `${leaderboard.name} \n\n`;
    for (let rowIdx = 0; rowIdx < leaderboard.rows.length + 1; rowIdx++) {
        for (const colIdx in columns) {
            const col = columns[colIdx];
            let val = col[rowIdx];
            let valStr = `| ${val}`;
            if (val.length < columnLengths[colIdx]) {
                for (let i = 0; i < columnLengths[colIdx] - val.length; i++) {
                    valStr += " ";
                }
            }
            valStr += " ";
            output += valStr;
        }
        output += "|\n";
    }
    output += "```";
    return output;
};
//# sourceMappingURL=format.js.map