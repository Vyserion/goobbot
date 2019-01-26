import "mocha";
import { expect } from "chai";
import { TCommand } from "../../../core/typings";
import { commandHasCorrectArgumentLength } from "./validators";

describe("plugins/leaderboards/util/validators", () => {
    describe("commandHasCorrectArgumentLength", () => {
        it("should return true when the command has the minimum amount of arguments", () => {
            const command: TCommand = {
                plugin: "string",
                arguments: [
                    "one",
                    "two"
                ],
                originalMessage: null
            };
            const result = commandHasCorrectArgumentLength(command, 2);
            expect(result).to.be.true;
        });

        it("should return true when the command has more than the minimum amount of arguments", () => {
            const command: TCommand = {
                plugin: "string",
                arguments: [
                    "one",
                    "two",
                    "three"
                ],
                originalMessage: null
            };
            const result = commandHasCorrectArgumentLength(command, 2);
            expect(result).to.be.true;
        });

        it("should return false when the command has less than the minimum amount of arguments", () => {
            const command: TCommand = {
                plugin: "string",
                arguments: [
                    "one"
                ],
                originalMessage: null
            };
            const result = commandHasCorrectArgumentLength(command, 2);
            expect(result).to.be.false;
        });

        it("should return true when the command has an amount of arguments between the minimum and maximum", () => {
            const command: TCommand = {
                plugin: "string",
                arguments: [
                    "one",
                    "two"
                ],
                originalMessage: null
            };
            const result = commandHasCorrectArgumentLength(command, 1, 3);
            expect(result).to.be.true;
        });

        it("should return false when the command has an amount of arguments less than the minimum with a maximum", () => {
            const command: TCommand = {
                plugin: "string",
                arguments: [
                    "one"
                ],
                originalMessage: null
            };
            const result = commandHasCorrectArgumentLength(command, 2, 3);
            expect(result).to.be.false;
        });

        it("should return false when the command has an amount of arguments of the minimum with a maximum", () => {
            const command: TCommand = {
                plugin: "string",
                arguments: [
                    "one"
                ],
                originalMessage: null
            };
            const result = commandHasCorrectArgumentLength(command, 2, 3);
            expect(result).to.be.false;
        });

        it("should return false when the command has an amount of arguments more than the maximum", () => {
            const command: TCommand = {
                plugin: "string",
                arguments: [
                    "one",
                    "two",
                    "three",
                    "four"
                ],
                originalMessage: null
            };
            const result = commandHasCorrectArgumentLength(command, 1, 3);
            expect(result).to.be.false;
        });

        it("should return false when the command has an amount of arguments more than the maximum", () => {
            const command: TCommand = {
                plugin: "string",
                arguments: [
                    "one",
                    "two",
                    "three",
                    "four"
                ],
                originalMessage: null
            };
            const result = commandHasCorrectArgumentLength(command, 1, 3);
            expect(result).to.be.false;
        });

        it("should return true when the command has an amount of arguments of than the maximum", () => {
            const command: TCommand = {
                plugin: "string",
                arguments: [
                    "one",
                    "two",
                    "three"
                ],
                originalMessage: null
            };
            const result = commandHasCorrectArgumentLength(command, 1, 3);
            expect(result).to.be.true;
        });

    });
});