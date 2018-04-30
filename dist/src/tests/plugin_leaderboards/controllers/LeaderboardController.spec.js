"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const ts_mockito_1 = require("ts-mockito");
const LeaderboardDAO_1 = require("../../../plugin_leaderboards/dao/LeaderboardDAO");
const ColumnDAO_1 = require("../../../plugin_leaderboards/dao/ColumnDAO");
const LeaderboardController_1 = require("../../../plugin_leaderboards/controllers/LeaderboardController");
const errorCodes_1 = require("../../../plugin_leaderboards/config/errorCodes");
const command_1 = require("../../../core/command");
const columnTypes_1 = require("../../../plugin_leaderboards/config/columnTypes");
const sinon_1 = require("sinon");
describe('LeaderboardController ::', () => {
    describe('getLeaderboards()', () => {
        it('should return the list of leaderboards from the DAO.', async () => {
            sinon_1.stub(LeaderboardDAO_1.LeaderboardDAO, "getLeaderboards").returns(['leaderboard']);
            const result = await LeaderboardController_1.LeaderboardController.getLeaderboards();
            chai_1.expect(result.length).to.equal(1);
            LeaderboardDAO_1.LeaderboardDAO.getLeaderboards.restore();
        });
    });
    describe('getLeaderboard()', () => {
        it('should check for less than one argument.', async () => {
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([]);
            const result = await LeaderboardController_1.LeaderboardController.getLeaderboard(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_BAD_PARAM);
        });
        it('should return an error when no leaderboard is found with that id.', async () => {
            const leaderboardName = 'leaderboardName';
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName]);
            sinon_1.stub(LeaderboardDAO_1.LeaderboardDAO, "getLeaderboard").returns([]);
            const result = await LeaderboardController_1.LeaderboardController.getLeaderboard(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_NOT_FOUND);
            LeaderboardDAO_1.LeaderboardDAO.getLeaderboard.restore();
        });
        it('should return the correct leaderboard when it is found, with columns', async () => {
            const leaderboardName = 'leaderboardName';
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName]);
            sinon_1.stub(LeaderboardDAO_1.LeaderboardDAO, 'getLeaderboard').returns([
                {
                    id: 1,
                    name: leaderboardName
                }
            ]);
            const columnName = 'col';
            const columnType = columnTypes_1.ColumnTypes.DATA;
            sinon_1.stub(ColumnDAO_1.ColumnDAO, 'getLeaderboardColumns').returns([
                {
                    name: columnName,
                    type: columnType
                }
            ]);
            const result = await LeaderboardController_1.LeaderboardController.getLeaderboard(ts_mockito_1.instance(command));
            const resultLeaderboard = result;
            chai_1.expect(resultLeaderboard.name).to.equal(leaderboardName);
            chai_1.expect(resultLeaderboard.columns.length).to.equal(1);
            chai_1.expect(resultLeaderboard.columns[0].name).to.equal(columnName);
            chai_1.expect(resultLeaderboard.columns[0].type).to.equal(columnType);
            LeaderboardDAO_1.LeaderboardDAO.getLeaderboard.restore();
            ColumnDAO_1.ColumnDAO.getLeaderboardColumns.restore();
        });
    });
    describe('insertLeaderboard()', () => {
        it('should check for less than one argument.', async () => {
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([]);
            const result = await LeaderboardController_1.LeaderboardController.insertLeaderboard(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_BAD_PARAM);
        });
        it('should check for more than one argument.', async () => {
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn(['one', 'two']);
            const result = await LeaderboardController_1.LeaderboardController.insertLeaderboard(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_BAD_PARAM);
        });
        it('should return an error when a leaderboard with the same name is detected.', async () => {
            const leaderboardName = 'leaderboardname';
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName]);
            sinon_1.stub(LeaderboardDAO_1.LeaderboardDAO, 'getLeaderboard').returns([leaderboardName]);
            const result = await LeaderboardController_1.LeaderboardController.insertLeaderboard(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_DUP_NAME);
            LeaderboardDAO_1.LeaderboardDAO.getLeaderboard.restore();
        });
        it('should return true when the leaderboard is inserted correctly.', async () => {
            const leaderboardName = 'leaderboardName';
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName]);
            sinon_1.stub(LeaderboardDAO_1.LeaderboardDAO, 'getLeaderboard').returns([]);
            sinon_1.stub(LeaderboardDAO_1.LeaderboardDAO, 'insertLeaderboard').returns([]);
            const result = await LeaderboardController_1.LeaderboardController.insertLeaderboard(ts_mockito_1.instance(command));
            chai_1.expect(result).to.be.true;
            LeaderboardDAO_1.LeaderboardDAO.getLeaderboard.restore();
            LeaderboardDAO_1.LeaderboardDAO.insertLeaderboard.restore();
        });
    });
    describe('updateLeaderboard()', () => {
        it('should check for less than 2 arguments', async () => {
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([]);
            const result = await LeaderboardController_1.LeaderboardController.updateLeaderboard(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_BAD_PARAM);
        });
        it('should check for more than 2 arguments', async () => {
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn(['', '', '']);
            const result = await LeaderboardController_1.LeaderboardController.updateLeaderboard(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_BAD_PARAM);
        });
        it('should return an error when no leaderboard is found with that name', async () => {
            const leaderboardName = 'leaderboardName';
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName, '']);
            sinon_1.stub(LeaderboardDAO_1.LeaderboardDAO, 'getLeaderboard').returns([]);
            const result = await LeaderboardController_1.LeaderboardController.updateLeaderboard(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_NOT_FOUND);
            LeaderboardDAO_1.LeaderboardDAO.getLeaderboard.restore();
        });
        it('should return true when the leaderboard column is updated', async () => {
            const leaderboardName = 'leaderboardName';
            const leaderboardId = 1;
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName, '']);
            sinon_1.stub(LeaderboardDAO_1.LeaderboardDAO, 'getLeaderboard').returns([
                { id: leaderboardId }
            ]);
            sinon_1.stub(LeaderboardDAO_1.LeaderboardDAO, 'updateLeaderboard');
            const result = await LeaderboardController_1.LeaderboardController.updateLeaderboard(ts_mockito_1.instance(command));
            chai_1.expect(result).to.be.true;
            LeaderboardDAO_1.LeaderboardDAO.getLeaderboard.restore();
            LeaderboardDAO_1.LeaderboardDAO.updateLeaderboard.restore();
        });
    });
    describe('deleteLeaderboard()', () => {
        it('should check for less than 1 arguments', async () => {
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([]);
            const result = await LeaderboardController_1.LeaderboardController.deleteLeaderboard(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_BAD_PARAM);
        });
        it('should check for more than 1 argument', async () => {
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn(['', '']);
            const result = await LeaderboardController_1.LeaderboardController.deleteLeaderboard(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_BAD_PARAM);
        });
        it('should return an error when no leaderboard is found with that name', async () => {
            const leaderboardName = 'leaderboardName';
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName]);
            sinon_1.stub(LeaderboardDAO_1.LeaderboardDAO, 'getLeaderboard').returns([]);
            const result = await LeaderboardController_1.LeaderboardController.deleteLeaderboard(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_NOT_FOUND);
            LeaderboardDAO_1.LeaderboardDAO.getLeaderboard.restore();
        });
        it('should return true when the leaderboard column is updated', async () => {
            const leaderboardName = 'leaderboardName';
            const leaderboardId = 1;
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName]);
            sinon_1.stub(LeaderboardDAO_1.LeaderboardDAO, 'getLeaderboard').returns([
                { id: leaderboardId }
            ]);
            sinon_1.stub(LeaderboardDAO_1.LeaderboardDAO, 'deleteLeaderboard');
            sinon_1.stub(ColumnDAO_1.ColumnDAO, 'deleteLeaderboardColumns');
            const result = await LeaderboardController_1.LeaderboardController.deleteLeaderboard(ts_mockito_1.instance(command));
            chai_1.expect(result).to.be.true;
            LeaderboardDAO_1.LeaderboardDAO.getLeaderboard.restore();
            LeaderboardDAO_1.LeaderboardDAO.deleteLeaderboard.restore();
            ColumnDAO_1.ColumnDAO.deleteLeaderboardColumns.restore();
        });
    });
});
//# sourceMappingURL=LeaderboardController.spec.js.map