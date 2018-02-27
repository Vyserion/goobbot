"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dao_1 = require("./dao");
exports.insertLeaderboard = (command) => __awaiter(this, void 0, void 0, function* () {
    // TODO: Validate leaderboard name
    if (command.arguments.length != 1) {
        return 'Number of arguments incorrect.';
    }
    let name = command.arguments[0];
    console.log('inserting');
    let result = yield dao_1.insertLeaderboard(name);
    console.log('done inserting');
    return 'Successfully created leaderboard.';
});
//# sourceMappingURL=controller.js.map