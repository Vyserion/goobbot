import { TList } from "../typings/lists";

/**
 * Converts a list into a pretty printed string.
 * @param list The list to convert.
 * @returns The list in string form.
 */
export function prettyPrintList(list: TList): string {
	let output = `${list.name} \n\n`;

	if (list.values.length === 0) {
		output += "This list has no content.";
	} else {
		list.values.forEach((v) => {
			output += `${v.value}\n`;
		});
	}

	return output;
}
