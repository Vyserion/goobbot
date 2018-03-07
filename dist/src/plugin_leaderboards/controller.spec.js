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
require("mocha");
const chai_1 = require("chai");
const ts_mockito_1 = require("ts-mockito");
const controller_1 = require("./controller");
const errorCodes_1 = require("./errorCodes");
const command_1 = require("../core/command");
describe('LeaderboardController ::', () => {
    describe('getLeaderboards()', () => {
        // No testable functionality.
    });
    describe('insertLeaderboard()', () => {
        it('should check for less than one argument', () => __awaiter(this, void 0, void 0, function* () {
            const controller = new controller_1.LeaderboardController();
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([]);
            const result = yield controller.insertLeaderboard(command);
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_BAD_PARAM);
        }));
    });
});
//# sourceMappingURL=controller.spec.js.map