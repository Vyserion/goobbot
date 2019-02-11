import { TList } from "../typings/lists";

export function prettyPrintList(list: TList): string {
    let output = `${list.name} \n\n`;

    if (list.values.length === 0) {
        output += "This list has no content.";
    } else {
        list.values.forEach(v => {
            output += `${v.value}\n`;
        });
    }

    return output;
}