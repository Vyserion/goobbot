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
const dao_1 = require("./dao");
const controller_1 = require("./controller");
const errorCodes_1 = require("./config/errorCodes");
const command_1 = require("../core/command");
describe('LeaderboardController ::', () => {
    describe('getLeaderboards()', () => {
        it('should return the list of leaderboards from the DAO.', () => __awaiter(this, void 0, void 0, function* () {
            const controller = new controller_1.LeaderboardController();
            const dao = ts_mockito_1.mock(dao_1.LeaderboardDAO);
            ts_mockito_1.when(dao.getLeaderboards()).thenResolve(['leaderboard']);
            controller.dao = ts_mockito_1.instance(dao);
            const result = yield controller.getLeaderboards();
            chai_1.expect(result.length).to.equal(1);
        }));
    });
    describe('insertLeaderboard()', () => {
        it('should check for less than one argument.', () => __awaiter(this, void 0, void 0, function* () {
            const controller = new controller_1.LeaderboardController();
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([]);
            const result = yield controller.insertLeaderboard(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_BAD_PARAM);
        }));
        it('should check for more than one argument.', () => __awaiter(this, void 0, void 0, function* () {
            const controller = new controller_1.LeaderboardController();
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn(['one', 'two']);
            const result = yield controller.insertLeaderboard(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_BAD_PARAM);
        }));
        it('should return an error when a leaderboard with the same name is detected.', () => __awaiter(this, void 0, void 0, function* () {
            const leaderboardName = 'leaderboardname';
            const controller = new controller_1.LeaderboardController();
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName]);
            const dao = ts_mockito_1.mock(dao_1.LeaderboardDAO);
            ts_mockito_1.when(dao.getLeaderboard(leaderboardName)).thenResolve([leaderboardName]);
            controller.dao = ts_mockito_1.instance(dao);
            const result = yield controller.insertLeaderboard(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_DUP_NAME);
        }));
        it('should return true when the leaderboard is inserted correctly.', () => __awaiter(this, void 0, void 0, function* () {
            const leaderboardName = 'leaderboardName';
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName]);
            const controller = new controller_1.LeaderboardController();
            const dao = ts_mockito_1.mock(dao_1.LeaderboardDAO);
            ts_mockito_1.when(dao.getLeaderboard(leaderboardName)).thenResolve([]);
            ts_mockito_1.when(dao.insertLeaderboard(leaderboardName)).thenResolve();
            controller.dao = ts_mockito_1.instance(dao);
            const result = yield controller.insertLeaderboard(ts_mockito_1.instance(command));
            chai_1.expect(result).to.be.true;
        }));
    });
    describe('insertLeaderboardColumn()', () => {
        it('should check for less than 2 arguments.', () => __awaiter(this, void 0, void 0, function* () {
            const controller = new controller_1.LeaderboardController();
            const zeroCommand = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(zeroCommand.arguments).thenReturn([]);
            const zeroResult = yield controller.insertLeaderboardColumn(ts_mockito_1.instance(zeroCommand));
            chai_1.expect(zeroResult).to.equal(errorCodes_1.ErrorCodes.LDBD_BAD_PARAM);
            const oneCommand = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(oneCommand.arguments).thenReturn(['1']);
            const oneResult = yield controller.insertLeaderboardColumn(ts_mockito_1.instance(oneCommand));
            chai_1.expect(oneResult).to.equal(errorCodes_1.ErrorCodes.LDBD_BAD_PARAM);
        }));
        it('should check for more than 3 arguments.', () => __awaiter(this, void 0, void 0, function* () {
            const controller = new controller_1.LeaderboardController();
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn(['1', '2', '3', '4']);
            const result = yield controller.insertLeaderboardColumn(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_BAD_PARAM);
        }));
        it('should return an error when no leaderboard is found with that id.', () => __awaiter(this, void 0, void 0, function* () {
            const leaderboardName = 'leaderboardName';
            const controller = new controller_1.LeaderboardController();
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName, '']);
            const dao = ts_mockito_1.mock(dao_1.LeaderboardDAO);
            ts_mockito_1.when(dao.getLeaderboard(leaderboardName)).thenResolve([]);
            controller.dao = ts_mockito_1.instance(dao);
            const result = yield controller.insertLeaderboardColumn(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_NOT_FOUND);
        }));
        it('should return an error when a column is found with the same name.', () => __awaiter(this, void 0, void 0, function* () {
            const leaderboardName = 'leaderboardName';
            const leaderboardId = 1;
            const columnName = 'columnName';
            const controller = new controller_1.LeaderboardController();
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName, columnName]);
            const dao = ts_mockito_1.mock(dao_1.LeaderboardDAO);
            ts_mockito_1.when(dao.getLeaderboard(leaderboardName)).thenResolve([
                { id: leaderboardId }
            ]);
            ts_mockito_1.when(dao.getLeaderboardColumn(leaderboardId, columnName)).thenResolve([columnName]);
            controller.dao = ts_mockito_1.instance(dao);
            const result = yield controller.insertLeaderboardColumn(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_DUP_NAME);
        }));
        it('should return true when the leaderboard column is inserted correctly.', () => __awaiter(this, void 0, void 0, function* () {
            const leaderboardName = 'leaderboardName';
            const leaderboardId = 1;
            const columnName = 'columnName';
            const controller = new controller_1.LeaderboardController();
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName, columnName]);
            const dao = ts_mockito_1.mock(dao_1.LeaderboardDAO);
            ts_mockito_1.when(dao.getLeaderboard(leaderboardName)).thenResolve([
                { id: leaderboardId }
            ]);
            ts_mockito_1.when(dao.getLeaderboardColumn(leaderboardId, columnName)).thenResolve([]);
            ts_mockito_1.when(dao.insertLeaderboardColumn(leaderboardId, columnName, 'DATA')).thenResolve();
            controller.dao = ts_mockito_1.instance(dao);
            const result = yield controller.insertLeaderboardColumn(ts_mockito_1.instance(command));
            chai_1.expect(result).to.be.true;
        }));
    });
    describe('updateLeaderboard()', () => {
        it('should check for less than 2 arguments', () => __awaiter(this, void 0, void 0, function* () {
            const controller = new controller_1.LeaderboardController();
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([]);
            const result = yield controller.updateLeaderboard(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_BAD_PARAM);
        }));
        it('should check for more than 2 arguments', () => __awaiter(this, void 0, void 0, function* () {
            const controller = new controller_1.LeaderboardController();
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn(['', '', '']);
            const result = yield controller.updateLeaderboard(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_BAD_PARAM);
        }));
        it('should return an error when no leaderboard is found with that name', () => __awaiter(this, void 0, void 0, function* () {
            const leaderboardName = 'leaderboardName';
            const controller = new controller_1.LeaderboardController();
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName, '']);
            const dao = ts_mockito_1.mock(dao_1.LeaderboardDAO);
            ts_mockito_1.when(dao.getLeaderboard(leaderboardName)).thenResolve([]);
            controller.dao = ts_mockito_1.instance(dao);
            const result = yield controller.updateLeaderboard(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_NOT_FOUND);
        }));
        it('should return true when the leaderboard column is updated', () => __awaiter(this, void 0, void 0, function* () {
            const leaderboardName = 'leaderboardName';
            const leaderboardId = 1;
            const controller = new controller_1.LeaderboardController();
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName, '']);
            const dao = ts_mockito_1.mock(dao_1.LeaderboardDAO);
            ts_mockito_1.when(dao.getLeaderboard(leaderboardName)).thenResolve([
                { id: leaderboardId }
            ]);
            ts_mockito_1.when(dao.updateLeaderboard(leaderboardId, '')).thenResolve();
            controller.dao = ts_mockito_1.instance(dao);
            const result = yield controller.updateLeaderboard(ts_mockito_1.instance(command));
            chai_1.expect(result).to.be.true;
        }));
    });
    describe('deleteLeaderboard()', () => {
        it('should check for less than 1 arguments', () => __awaiter(this, void 0, void 0, function* () {
            const controller = new controller_1.LeaderboardController();
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([]);
            const result = yield controller.deleteLeaderboard(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_BAD_PARAM);
        }));
        it('should check for more than 1 argument', () => __awaiter(this, void 0, void 0, function* () {
            const controller = new controller_1.LeaderboardController();
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn(['', '']);
            const result = yield controller.deleteLeaderboard(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_BAD_PARAM);
        }));
        it('should return an error when no leaderboard is found with that name', () => __awaiter(this, void 0, void 0, function* () {
            const leaderboardName = 'leaderboardName';
            const controller = new controller_1.LeaderboardController();
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName]);
            const dao = ts_mockito_1.mock(dao_1.LeaderboardDAO);
            ts_mockito_1.when(dao.getLeaderboard(leaderboardName)).thenResolve([]);
            controller.dao = ts_mockito_1.instance(dao);
            const result = yield controller.deleteLeaderboard(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_NOT_FOUND);
        }));
        it('should return true when the leaderboard column is updated', () => __awaiter(this, void 0, void 0, function* () {
            const leaderboardName = 'leaderboardName';
            const leaderboardId = 1;
            const controller = new controller_1.LeaderboardController();
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName]);
            const dao = ts_mockito_1.mock(dao_1.LeaderboardDAO);
            ts_mockito_1.when(dao.getLeaderboard(leaderboardName)).thenResolve([
                { id: leaderboardId }
            ]);
            ts_mockito_1.when(dao.deleteLeaderboard(leaderboardId)).thenResolve();
            controller.dao = ts_mockito_1.instance(dao);
            const result = yield controller.deleteLeaderboard(ts_mockito_1.instance(command));
            chai_1.expect(result).to.be.true;
        }));
    });
});
//# sourceMappingURL=controller.spec.js.map