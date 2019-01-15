import { TCommand } from "../../../core/typings";

export function commandHasCorrectArgumentLength(command: TCommand, min: number, max?: number): boolean {
    if (max) {
        return min < command.arguments.length && command.arguments.length < max;
    } else {
        return command.arguments.length >= min;
    }
}