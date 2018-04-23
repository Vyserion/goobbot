"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const ts_mockito_1 = require("ts-mockito");
const dao_1 = require("../../plugin_leaderboards/dao");
const controller_1 = require("../../plugin_leaderboards/controller");
const errorCodes_1 = require("../../plugin_leaderboards/config/errorCodes");
const command_1 = require("../../core/command");
const columnTypes_1 = require("../../plugin_leaderboards/config/columnTypes");
const sinon_1 = require("sinon");
describe('LeaderboardController ::', () => {
    describe('getLeaderboards()', () => {
        it('should return the list of leaderboards from the DAO.', async () => {
            sinon_1.stub(dao_1.LeaderboardDAO, "getLeaderboards").returns(['leaderboard']);
            const result = await controller_1.LeaderboardController.getLeaderboards();
            chai_1.expect(result.length).to.equal(1);
            dao_1.LeaderboardDAO.getLeaderboards.restore();
        });
    });
    describe('getLeaderboard()', () => {
        it('should check for less than one argument.', async () => {
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([]);
            const result = await controller_1.LeaderboardController.getLeaderboard(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_BAD_PARAM);
        });
        it('should return an error when no leaderboard is found with that id.', async () => {
            const leaderboardName = 'leaderboardName';
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName]);
            sinon_1.stub(dao_1.LeaderboardDAO, "getLeaderboard").returns([]);
            const result = await controller_1.LeaderboardController.getLeaderboard(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_NOT_FOUND);
            dao_1.LeaderboardDAO.getLeaderboard.restore();
        });
        it('should return the correct leaderboard when it is found, with columns', async () => {
            const leaderboardName = 'leaderboardName';
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName]);
            sinon_1.stub(dao_1.LeaderboardDAO, 'getLeaderboard').returns([
                {
                    id: 1,
                    name: leaderboardName
                }
            ]);
            const columnName = 'col';
            const columnType = columnTypes_1.ColumnTypes.DATA;
            sinon_1.stub(dao_1.LeaderboardDAO, 'getLeaderboardColumns').returns([
                {
                    name: columnName,
                    type: columnType
                }
            ]);
            const result = await controller_1.LeaderboardController.getLeaderboard(ts_mockito_1.instance(command));
            const resultLeaderboard = result;
            chai_1.expect(resultLeaderboard.name).to.equal(leaderboardName);
            chai_1.expect(resultLeaderboard.columns.length).to.equal(1);
            chai_1.expect(resultLeaderboard.columns[0].name).to.equal(columnName);
            chai_1.expect(resultLeaderboard.columns[0].type).to.equal(columnType);
            dao_1.LeaderboardDAO.getLeaderboard.restore();
            dao_1.LeaderboardDAO.getLeaderboardColumns.restore();
        });
    });
    describe('insertLeaderboard()', () => {
        it('should check for less than one argument.', async () => {
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([]);
            const result = await controller_1.LeaderboardController.insertLeaderboard(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_BAD_PARAM);
        });
        it('should check for more than one argument.', async () => {
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn(['one', 'two']);
            const result = await controller_1.LeaderboardController.insertLeaderboard(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_BAD_PARAM);
        });
        it('should return an error when a leaderboard with the same name is detected.', async () => {
            const leaderboardName = 'leaderboardname';
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName]);
            sinon_1.stub(dao_1.LeaderboardDAO, 'getLeaderboard').returns([leaderboardName]);
            const result = await controller_1.LeaderboardController.insertLeaderboard(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_DUP_NAME);
            dao_1.LeaderboardDAO.getLeaderboard.restore();
        });
        it('should return true when the leaderboard is inserted correctly.', async () => {
            const leaderboardName = 'leaderboardName';
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName]);
            sinon_1.stub(dao_1.LeaderboardDAO, 'getLeaderboard').returns([]);
            sinon_1.stub(dao_1.LeaderboardDAO, 'insertLeaderboard').returns([]);
            const result = await controller_1.LeaderboardController.insertLeaderboard(ts_mockito_1.instance(command));
            chai_1.expect(result).to.be.true;
            dao_1.LeaderboardDAO.getLeaderboard.restore();
            dao_1.LeaderboardDAO.insertLeaderboard.restore();
        });
    });
    describe('insertLeaderboardColumn()', () => {
        it('should check for less than 2 arguments.', async () => {
            const zeroCommand = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(zeroCommand.arguments).thenReturn([]);
            const zeroResult = await controller_1.LeaderboardController.insertLeaderboardColumn(ts_mockito_1.instance(zeroCommand));
            chai_1.expect(zeroResult).to.equal(errorCodes_1.ErrorCodes.LDBD_BAD_PARAM);
            const oneCommand = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(oneCommand.arguments).thenReturn(['1']);
            const oneResult = await controller_1.LeaderboardController.insertLeaderboardColumn(ts_mockito_1.instance(oneCommand));
            chai_1.expect(oneResult).to.equal(errorCodes_1.ErrorCodes.LDBD_BAD_PARAM);
        });
        it('should check for more than 3 arguments.', async () => {
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn(['1', '2', '3', '4']);
            const result = await controller_1.LeaderboardController.insertLeaderboardColumn(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_BAD_PARAM);
        });
        it('should return an error when no leaderboard is found with that id.', async () => {
            const leaderboardName = 'leaderboardName';
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName, '']);
            sinon_1.stub(dao_1.LeaderboardDAO, 'getLeaderboard').returns([]);
            const result = await controller_1.LeaderboardController.insertLeaderboardColumn(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_NOT_FOUND);
            dao_1.LeaderboardDAO.getLeaderboard.restore();
        });
        it('should return an error when a column is found with the same name.', async () => {
            const leaderboardName = 'leaderboardName';
            const leaderboardId = 1;
            const columnName = 'columnName';
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName, columnName]);
            sinon_1.stub(dao_1.LeaderboardDAO, 'getLeaderboard').returns([
                { id: leaderboardId }
            ]);
            sinon_1.stub(dao_1.LeaderboardDAO, 'getLeaderboardColumn').returns([columnName]);
            const result = await controller_1.LeaderboardController.insertLeaderboardColumn(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_DUP_NAME);
            dao_1.LeaderboardDAO.getLeaderboard.restore();
            dao_1.LeaderboardDAO.getLeaderboardColumn.restore();
        });
        it('should return true when the leaderboard column is inserted correctly.', async () => {
            const leaderboardName = 'leaderboardName';
            const leaderboardId = 1;
            const columnName = 'columnName';
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName, columnName]);
            sinon_1.stub(dao_1.LeaderboardDAO, 'getLeaderboard').returns([
                { id: leaderboardId }
            ]);
            sinon_1.stub(dao_1.LeaderboardDAO, 'getLeaderboardColumn').returns([]);
            sinon_1.stub(dao_1.LeaderboardDAO, 'insertLeaderboardColumn');
            const result = await controller_1.LeaderboardController.insertLeaderboardColumn(ts_mockito_1.instance(command));
            chai_1.expect(result).to.be.true;
            dao_1.LeaderboardDAO.getLeaderboard.restore();
            dao_1.LeaderboardDAO.getLeaderboardColumn.restore();
            dao_1.LeaderboardDAO.insertLeaderboardColumn.restore();
        });
    });
    describe('updateLeaderboard()', () => {
        it('should check for less than 2 arguments', async () => {
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([]);
            const result = await controller_1.LeaderboardController.updateLeaderboard(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_BAD_PARAM);
        });
        it('should check for more than 2 arguments', async () => {
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn(['', '', '']);
            const result = await controller_1.LeaderboardController.updateLeaderboard(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_BAD_PARAM);
        });
        it('should return an error when no leaderboard is found with that name', async () => {
            const leaderboardName = 'leaderboardName';
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName, '']);
            sinon_1.stub(dao_1.LeaderboardDAO, 'getLeaderboard').returns([]);
            const result = await controller_1.LeaderboardController.updateLeaderboard(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_NOT_FOUND);
            dao_1.LeaderboardDAO.getLeaderboard.restore();
        });
        it('should return true when the leaderboard column is updated', async () => {
            const leaderboardName = 'leaderboardName';
            const leaderboardId = 1;
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName, '']);
            sinon_1.stub(dao_1.LeaderboardDAO, 'getLeaderboard').returns([
                { id: leaderboardId }
            ]);
            sinon_1.stub(dao_1.LeaderboardDAO, 'updateLeaderboard');
            const result = await controller_1.LeaderboardController.updateLeaderboard(ts_mockito_1.instance(command));
            chai_1.expect(result).to.be.true;
            dao_1.LeaderboardDAO.getLeaderboard.restore();
            dao_1.LeaderboardDAO.updateLeaderboard.restore();
        });
    });
    describe('updateLeaderboardColumn()', () => {
        it('should check for less than 4 arguments', async () => {
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([]);
            const result = await controller_1.LeaderboardController.updateLeaderboardColumn(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_BAD_PARAM);
        });
        it('should check for more than 4 arguments', async () => {
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn(['', '', '', '', '']);
            const result = await controller_1.LeaderboardController.updateLeaderboardColumn(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_BAD_PARAM);
        });
        it('should return an error when no leaderboard is found with that name', async () => {
            const leaderboardName = 'leaderboardName';
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName, '', '', '']);
            sinon_1.stub(dao_1.LeaderboardDAO, 'getLeaderboard').returns([]);
            const result = await controller_1.LeaderboardController.updateLeaderboardColumn(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_NOT_FOUND);
            dao_1.LeaderboardDAO.getLeaderboard.restore();
        });
        it('should return an error when no leaderboard column is found with that name', async () => {
            const leaderboardName = 'leaderboardName';
            const columnName = 'columnName';
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName, columnName, '', '']);
            sinon_1.stub(dao_1.LeaderboardDAO, 'getLeaderboard').returns([leaderboardName]);
            sinon_1.stub(dao_1.LeaderboardDAO, 'getLeaderboardColumn').returns([]);
            const result = await controller_1.LeaderboardController.updateLeaderboardColumn(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_COL_NOT_FOUND);
            dao_1.LeaderboardDAO.getLeaderboard.restore();
            dao_1.LeaderboardDAO.getLeaderboardColumn.restore();
        });
        it('should return an error when the action is invalid', async () => {
            const leaderboardName = 'leaderboardName';
            const columnName = 'columnName';
            const action = 'invalidAction';
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName, columnName, action, '']);
            sinon_1.stub(dao_1.LeaderboardDAO, 'getLeaderboard').returns([leaderboardName]);
            sinon_1.stub(dao_1.LeaderboardDAO, 'getLeaderboardColumn').returns([columnName]);
            const result = await controller_1.LeaderboardController.updateLeaderboardColumn(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_INVALID_PARAM);
            dao_1.LeaderboardDAO.getLeaderboard.restore();
            dao_1.LeaderboardDAO.getLeaderboardColumn.restore();
        });
        it('should return true when the Type is updated', async () => {
            const leaderboardName = 'leaderboardName';
            const columnName = 'columnName';
            const action = 'TYPE';
            const value = 'some text';
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName, columnName, action, value]);
            sinon_1.stub(dao_1.LeaderboardDAO, 'getLeaderboard').returns([leaderboardName]);
            sinon_1.stub(dao_1.LeaderboardDAO, 'getLeaderboardColumn').returns([columnName]);
            sinon_1.stub(dao_1.LeaderboardDAO, 'updateLeaderboardColumnType').returns(true);
            const result = await controller_1.LeaderboardController.updateLeaderboardColumn(ts_mockito_1.instance(command));
            chai_1.expect(result).to.be.true;
            dao_1.LeaderboardDAO.getLeaderboard.restore();
            dao_1.LeaderboardDAO.getLeaderboardColumn.restore();
            dao_1.LeaderboardDAO.updateLeaderboardColumnType.restore();
        });
        it('should return true when the Name is updated', async () => {
            const leaderboardName = 'leaderboardName';
            const columnName = 'columnName';
            const action = 'NAME';
            const value = 'some text';
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName, columnName, action, value]);
            sinon_1.stub(dao_1.LeaderboardDAO, 'getLeaderboard').returns([leaderboardName]);
            sinon_1.stub(dao_1.LeaderboardDAO, 'getLeaderboardColumn').returns([columnName]);
            sinon_1.stub(dao_1.LeaderboardDAO, 'updateLeaderboardColumnName').returns(true);
            const result = await controller_1.LeaderboardController.updateLeaderboardColumn(ts_mockito_1.instance(command));
            chai_1.expect(result).to.be.true;
            dao_1.LeaderboardDAO.getLeaderboard.restore();
            dao_1.LeaderboardDAO.getLeaderboardColumn.restore();
            dao_1.LeaderboardDAO.updateLeaderboardColumnName.restore();
        });
    });
    describe('deleteLeaderboard()', () => {
        it('should check for less than 1 arguments', async () => {
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([]);
            const result = await controller_1.LeaderboardController.deleteLeaderboard(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_BAD_PARAM);
        });
        it('should check for more than 1 argument', async () => {
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn(['', '']);
            const result = await controller_1.LeaderboardController.deleteLeaderboard(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_BAD_PARAM);
        });
        it('should return an error when no leaderboard is found with that name', async () => {
            const leaderboardName = 'leaderboardName';
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName]);
            sinon_1.stub(dao_1.LeaderboardDAO, 'getLeaderboard').returns([]);
            const result = await controller_1.LeaderboardController.deleteLeaderboard(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_NOT_FOUND);
            dao_1.LeaderboardDAO.getLeaderboard.restore();
        });
        it('should return true when the leaderboard column is updated', async () => {
            const leaderboardName = 'leaderboardName';
            const leaderboardId = 1;
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName]);
            sinon_1.stub(dao_1.LeaderboardDAO, 'getLeaderboard').returns([
                { id: leaderboardId }
            ]);
            sinon_1.stub(dao_1.LeaderboardDAO, 'deleteLeaderboard');
            sinon_1.stub(dao_1.LeaderboardDAO, 'deleteLeaderboardColumns');
            const result = await controller_1.LeaderboardController.deleteLeaderboard(ts_mockito_1.instance(command));
            chai_1.expect(result).to.be.true;
            dao_1.LeaderboardDAO.getLeaderboard.restore();
            dao_1.LeaderboardDAO.deleteLeaderboard.restore();
            dao_1.LeaderboardDAO.deleteLeaderboardColumns.restore();
        });
    });
    describe('deleteLeaderboardColumn()', () => {
        it('should check for less than 2 arguments.', async () => {
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([]);
            const result = await controller_1.LeaderboardController.deleteLeaderboardColumn(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_BAD_PARAM);
        });
        it('should check for more than 2 arguments.', async () => {
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn(['', '', '']);
            const result = await controller_1.LeaderboardController.deleteLeaderboardColumn(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_BAD_PARAM);
        });
        it('should return an error when no leaderboard is found with that name.', async () => {
            const leaderboardName = 'leaderboardName';
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName, '']);
            sinon_1.stub(dao_1.LeaderboardDAO, 'getLeaderboard').returns([]);
            const result = await controller_1.LeaderboardController.deleteLeaderboardColumn(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_NOT_FOUND);
            dao_1.LeaderboardDAO.getLeaderboard.restore();
        });
        it('should return an error when no leaderboard column is found with that name.', async () => {
            const leaderboardName = 'leaderboardName';
            const columnName = 'columnName';
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName, columnName]);
            sinon_1.stub(dao_1.LeaderboardDAO, 'getLeaderboard').returns([leaderboardName]);
            sinon_1.stub(dao_1.LeaderboardDAO, 'getLeaderboardColumn').returns([]);
            const result = await controller_1.LeaderboardController.deleteLeaderboardColumn(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(errorCodes_1.ErrorCodes.LDBD_COL_NOT_FOUND);
            dao_1.LeaderboardDAO.getLeaderboard.restore();
            dao_1.LeaderboardDAO.getLeaderboardColumn.restore();
        });
        it('should return true when the leaderboard column is deleted.', async () => {
            const leaderboardName = 'leaderboardName';
            const columnName = 'columnName';
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName, columnName]);
            sinon_1.stub(dao_1.LeaderboardDAO, 'getLeaderboard').returns([leaderboardName]);
            sinon_1.stub(dao_1.LeaderboardDAO, 'getLeaderboardColumn').returns([columnName]);
            const result = await controller_1.LeaderboardController.deleteLeaderboardColumn(ts_mockito_1.instance(command));
            chai_1.expect(result).to.be.true;
            dao_1.LeaderboardDAO.getLeaderboard.restore();
            dao_1.LeaderboardDAO.getLeaderboardColumn.restore();
        });
    });
});
//# sourceMappingURL=controller.spec.js.map