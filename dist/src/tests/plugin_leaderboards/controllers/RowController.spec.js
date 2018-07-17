"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const ts_mockito_1 = require("ts-mockito");
const LeaderboardDAO_1 = require("../../../plugin_leaderboards/dao/LeaderboardDAO");
const RowController_1 = require("../../../plugin_leaderboards/controllers/RowController");
const errorCodes_1 = require("../../../plugin_leaderboards/config/errorCodes");
const command_1 = require("../../../core/command");
const sinon_1 = require("sinon");
const RowDAO_1 = require("../../../plugin_leaderboards/dao/RowDAO");
describe('RowController ::', () => {
    describe('insertLeaderboardRow()', () => {
        it('should check for less than 2 arguments.', async () => {
            const zeroCommand = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(zeroCommand.arguments).thenReturn([]);
            const zeroResult = await RowController_1.RowController.insertLeaderboardRow(ts_mockito_1.instance(zeroCommand));
            chai_1.expect(zeroResult).to.equal(errorCodes_1.ErrorCodes.LDBD_BAD_PARAM);
            const oneCommand = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(oneCommand.arguments).thenReturn(['1']);
            const oneResult = await RowController_1.RowController.insertLeaderboardRow(ts_mockito_1.instance(oneCommand));
            chai_1.expect(oneResult).to.equal(errorCodes_1.ErrorCodes.LDBD_BAD_PARAM);
        });
        it('should check for more than 2 arguments.', async () => {
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn(['1', '2', '3']);
            const result = await RowController_1.RowController.insertLeaderboardRow(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_BAD_PARAM);
        });
        it('should return an error code when no leaderboard is found with that id.', async () => {
            const leaderboardName = 'leaderboardName';
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName, '']);
            sinon_1.stub(LeaderboardDAO_1.LeaderboardDAO, 'getLeaderboard').returns([]);
            const result = await RowController_1.RowController.insertLeaderboardRow(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_NOT_FOUND);
            LeaderboardDAO_1.LeaderboardDAO.getLeaderboard.restore();
        });
        it('should return an error when a row is found with the same name.', async () => {
            const leaderboardName = 'leaderboardName';
            const leaderboardId = 1;
            const rowName = 'rowName';
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName, rowName]);
            sinon_1.stub(LeaderboardDAO_1.LeaderboardDAO, 'getLeaderboard').returns([
                { id: leaderboardId }
            ]);
            sinon_1.stub(RowDAO_1.RowDAO, 'getLeaderboardRow').returns([rowName]);
            const result = await RowController_1.RowController.insertLeaderboardRow(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_DUP_NAME);
            LeaderboardDAO_1.LeaderboardDAO.getLeaderboard.restore();
            RowDAO_1.RowDAO.getLeaderboardRow.restore();
        });
        it('should return true when the leaderboard row is inserted correctly.', async () => {
            const LeaderboardName = 'leaderboardName';
            const leaderboardId = 1;
            const rowName = 'rowName';
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([LeaderboardName, rowName]);
            sinon_1.stub(LeaderboardDAO_1.LeaderboardDAO, 'getLeaderboard').returns([
                { id: leaderboardId }
            ]);
            sinon_1.stub(RowDAO_1.RowDAO, 'getLeaderboardRow').returns([]);
            sinon_1.stub(RowDAO_1.RowDAO, 'insertLeaderboardRow');
            const result = await RowController_1.RowController.insertLeaderboardRow(ts_mockito_1.instance(command));
            chai_1.expect(result).to.be.true;
            LeaderboardDAO_1.LeaderboardDAO.getLeaderboard.restore();
            RowDAO_1.RowDAO.getLeaderboardRow.restore();
            RowDAO_1.RowDAO.insertLeaderboardRow.restore();
        });
    });
    describe('updateLeaderboardRow()', () => {
        it('should check for less than 3 arguments.', async () => {
            const zeroCommand = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(zeroCommand.arguments).thenReturn([]);
            const zeroResult = await RowController_1.RowController.updateLeaderboardRow(ts_mockito_1.instance(zeroCommand));
            chai_1.expect(zeroResult).to.equal(errorCodes_1.ErrorCodes.LDBD_BAD_PARAM);
            const twoCommand = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(twoCommand.arguments).thenReturn(['', '']);
            const twoResult = await RowController_1.RowController.updateLeaderboardRow(ts_mockito_1.instance(twoCommand));
            chai_1.expect(twoResult).to.equal(errorCodes_1.ErrorCodes.LDBD_BAD_PARAM);
        });
        it('should check for more than 3 arguments.', async () => {
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn(['', '', '', '']);
            const result = await RowController_1.RowController.updateLeaderboardRow(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_BAD_PARAM);
        });
        it('should return an error code when no leaderboard is found with that name.', async () => {
            const leaderboardName = 'leaderboardName';
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName, '', '']);
            sinon_1.stub(LeaderboardDAO_1.LeaderboardDAO, 'getLeaderboard').returns([]);
            const result = await RowController_1.RowController.updateLeaderboardRow(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_NOT_FOUND);
            LeaderboardDAO_1.LeaderboardDAO.getLeaderboard.restore();
        });
        it('should return an error code when no leaderboard row could be found with that name', async () => {
            const leaderboardName = 'leaderboardName';
            const leaderboardId = 1;
            const rowName = 'rowName';
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName, rowName, '']);
            sinon_1.stub(LeaderboardDAO_1.LeaderboardDAO, 'getLeaderboard').returns([
                { id: leaderboardId }
            ]);
            sinon_1.stub(RowDAO_1.RowDAO, 'getLeaderboardRow').returns([]);
            const result = await RowController_1.RowController.updateLeaderboardRow(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_ROW_NOT_FOUND);
            LeaderboardDAO_1.LeaderboardDAO.getLeaderboard.restore();
            RowDAO_1.RowDAO.getLeaderboardRow.restore();
        });
        it('should return true when the name is updated.', async () => {
            const leaderboardName = 'leaderboardName';
            const leaderboardId = 1;
            const rowName = 'rowName';
            const rowId = 2;
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName, rowName, 'New Row Name']);
            sinon_1.stub(LeaderboardDAO_1.LeaderboardDAO, 'getLeaderboard').returns([
                { id: leaderboardId }
            ]);
            sinon_1.stub(RowDAO_1.RowDAO, 'getLeaderboardRow').returns([
                { id: rowId }
            ]);
            const result = await RowController_1.RowController.updateLeaderboardRow(ts_mockito_1.instance(command));
            chai_1.expect(result).to.be.true;
            LeaderboardDAO_1.LeaderboardDAO.getLeaderboard.restore();
            RowDAO_1.RowDAO.getLeaderboardRow.restore();
        });
    });
});
//# sourceMappingURL=RowController.spec.js.map