import 'mocha';
import { expect } from 'chai';
import { mock, instance, when, anything } from 'ts-mockito';
import { LeaderboardDAO } from "../../plugin_leaderboards/dao";
import { LeaderboardController } from "../../plugin_leaderboards/controller";
import { ErrorCodes } from "../../plugin_leaderboards/config/errorCodes";
import { Command } from "../../core/command";
import { ColumnTypes } from "../../plugin_leaderboards/config/columnTypes";
import Column from "../../plugin_leaderboards/models/Column";
import Leaderboard from "../../plugin_leaderboards/models/Leaderboard";
import { stub } from 'sinon';

describe('LeaderboardController ::', () => {

    describe('getLeaderboards()', () => {
        
        it('should return the list of leaderboards from the DAO.', async () => {
            stub(LeaderboardDAO, "getLeaderboards").returns(['leaderboard']);

            const result = await LeaderboardController.getLeaderboards();
            expect(result.length).to.equal(1);

            (LeaderboardDAO.getLeaderboards as any).restore();
        });

    });

    describe('getLeaderboard()', () => {

        it('should check for less than one argument.', async () => {
            const command: Command = mock(Command);
            when(command.arguments).thenReturn([]);

            const result = await LeaderboardController.getLeaderboard(instance(command));
            expect(result).to.equal(ErrorCodes.LDBD_BAD_PARAM);
        });

        it('should return an error when no leaderboard is found with that id.', async () => {
            const leaderboardName: string = 'leaderboardName';

            const command: Command = mock(Command);
            when(command.arguments).thenReturn([leaderboardName]);

            stub(LeaderboardDAO, "getLeaderboard").returns([]);

            const result = await LeaderboardController.getLeaderboard(instance(command));
            expect(result).to.equal(ErrorCodes.LDBD_NOT_FOUND);

            (LeaderboardDAO.getLeaderboard as any).restore();
        });

        it('should return the correct leaderboard when it is found, with columns', async () => {
            const leaderboardName: string = 'leaderboardName';

            const command: Command = mock(Command);
            when(command.arguments).thenReturn([leaderboardName]);

            stub(LeaderboardDAO, 'getLeaderboard').returns([
                {
                    id: 1, 
                    name: leaderboardName 
                }
            ]);

            const columnName = 'col';
            const columnType = ColumnTypes.DATA;
            stub(LeaderboardDAO, 'getLeaderboardColumns').returns([
                {
                    name: columnName,
                    type: columnType
                }
            ]);

            const result = await LeaderboardController.getLeaderboard(instance(command));
            
            const resultLeaderboard: Leaderboard = <Leaderboard> result;
            expect(resultLeaderboard.name).to.equal(leaderboardName);
            expect(resultLeaderboard.columns.length).to.equal(1);
            expect(resultLeaderboard.columns[0].name).to.equal(columnName);
            expect(resultLeaderboard.columns[0].type).to.equal(columnType);

            (LeaderboardDAO.getLeaderboard as any).restore();
            (LeaderboardDAO.getLeaderboardColumns as any).restore();
        });

    });

    describe('insertLeaderboard()', () => {

        it('should check for less than one argument.', async () => {
            const command: Command = mock(Command);
            when(command.arguments).thenReturn([]);

            const result = await LeaderboardController.insertLeaderboard(instance(command));
            expect(result).to.equal(ErrorCodes.LDBD_BAD_PARAM);
        });

        it('should check for more than one argument.', async () => {
            const command: Command = mock(Command);
            when(command.arguments).thenReturn(['one', 'two']);

            const result = await LeaderboardController.insertLeaderboard(instance(command));
            expect(result).to.equal(ErrorCodes.LDBD_BAD_PARAM);
        });

        it('should return an error when a leaderboard with the same name is detected.', async () => {
            const leaderboardName: string = 'leaderboardname';

            const command: Command = mock(Command);
            when(command.arguments).thenReturn([leaderboardName]);

            stub(LeaderboardDAO, 'getLeaderboard').returns([leaderboardName]);

            const result = await LeaderboardController.insertLeaderboard(instance(command));
            expect(result).to.equal(ErrorCodes.LDBD_DUP_NAME);

            (LeaderboardDAO.getLeaderboard as any).restore();
        });

        it('should return true when the leaderboard is inserted correctly.', async () => {
            const leaderboardName: string = 'leaderboardName';

            const command: Command = mock(Command);
            when(command.arguments).thenReturn([leaderboardName]);

            stub(LeaderboardDAO, 'getLeaderboard').returns([]);
            stub(LeaderboardDAO, 'insertLeaderboard').returns([]);

            const result = await LeaderboardController.insertLeaderboard(instance(command));
            expect(result).to.be.true;

            (LeaderboardDAO.getLeaderboard as any).restore();
            (LeaderboardDAO.insertLeaderboard as any).restore();
        });

    });

    describe('insertLeaderboardColumn()', () => {

        it('should check for less than 2 arguments.', async () => {
            const zeroCommand: Command = mock(Command);
            when(zeroCommand.arguments).thenReturn([]);

            const zeroResult = await LeaderboardController.insertLeaderboardColumn(instance(zeroCommand));
            expect(zeroResult).to.equal(ErrorCodes.LDBD_BAD_PARAM);

            const oneCommand: Command = mock(Command);
            when(oneCommand.arguments).thenReturn(['1']);

            const oneResult = await LeaderboardController.insertLeaderboardColumn(instance(oneCommand));
            expect(oneResult).to.equal(ErrorCodes.LDBD_BAD_PARAM);
        });

        it('should check for more than 3 arguments.', async () => {
            const command: Command = mock(Command);
            when(command.arguments).thenReturn(['1', '2', '3', '4']);

            const result = await LeaderboardController.insertLeaderboardColumn(instance(command));
            expect(result).to.equal(ErrorCodes.LDBD_BAD_PARAM);
        });

        it('should return an error when no leaderboard is found with that id.', async () => {
            const leaderboardName: string = 'leaderboardName';

            const command: Command = mock(Command);
            when(command.arguments).thenReturn([leaderboardName, '']);

            stub(LeaderboardDAO, 'getLeaderboard').returns([]);

            const result = await LeaderboardController.insertLeaderboardColumn(instance(command));
            expect(result).to.equal(ErrorCodes.LDBD_NOT_FOUND);

            (LeaderboardDAO.getLeaderboard as any).restore();
        });

        it('should return an error when a column is found with the same name.', async () => {
            const leaderboardName: string = 'leaderboardName';
            const leaderboardId: number = 1;
            const columnName: string = 'columnName';

            const command: Command = mock(Command);
            when(command.arguments).thenReturn([leaderboardName, columnName]);

            stub(LeaderboardDAO, 'getLeaderboard').returns([
                { id: leaderboardId }
            ]);
            stub(LeaderboardDAO, 'getLeaderboardColumn').returns([columnName]);

            const result = await LeaderboardController.insertLeaderboardColumn(instance(command));
            expect(result).to.equal(ErrorCodes.LDBD_DUP_NAME);

            (LeaderboardDAO.getLeaderboard as any).restore();
            (LeaderboardDAO.getLeaderboardColumn as any).restore();
        });

        it('should return true when the leaderboard column is inserted correctly.', async () => {
            const leaderboardName: string = 'leaderboardName';
            const leaderboardId: number = 1;
            const columnName: string = 'columnName';

            const command: Command = mock(Command);
            when(command.arguments).thenReturn([leaderboardName, columnName]);

            stub(LeaderboardDAO, 'getLeaderboard').returns([
                { id: leaderboardId }
            ]);
            stub(LeaderboardDAO, 'getLeaderboardColumn').returns([]);
            stub(LeaderboardDAO, 'insertLeaderboardColumn');

            const result = await LeaderboardController.insertLeaderboardColumn(instance(command));
            expect(result).to.be.true;

            (LeaderboardDAO.getLeaderboard as any).restore();
            (LeaderboardDAO.getLeaderboardColumn as any).restore();
            (LeaderboardDAO.insertLeaderboardColumn as any).restore();
        });

    });

    describe('updateLeaderboard()', () => {

        it('should check for less than 2 arguments', async () => {
            const command: Command = mock(Command);
            when(command.arguments).thenReturn([]);

            const result = await LeaderboardController.updateLeaderboard(instance(command));
            expect(result).to.equal(ErrorCodes.LDBD_BAD_PARAM);
        });

        it('should check for more than 2 arguments', async () => {
            const command: Command = mock(Command);
            when(command.arguments).thenReturn(['', '', '']);

            const result = await LeaderboardController.updateLeaderboard(instance(command));
            expect(result).to.equal(ErrorCodes.LDBD_BAD_PARAM);
        });

        it('should return an error when no leaderboard is found with that name', async () => {
            const leaderboardName: string = 'leaderboardName';

            const command: Command = mock(Command);
            when(command.arguments).thenReturn([leaderboardName, '']);

            stub(LeaderboardDAO, 'getLeaderboard').returns([]);

            const result = await LeaderboardController.updateLeaderboard(instance(command));
            expect(result).to.equal(ErrorCodes.LDBD_NOT_FOUND);

            (LeaderboardDAO.getLeaderboard as any).restore();
        });

        it('should return true when the leaderboard column is updated', async () => {
            const leaderboardName: string = 'leaderboardName';
            const leaderboardId: number = 1;

            const command: Command = mock(Command);
            when(command.arguments).thenReturn([leaderboardName, '']);

            stub(LeaderboardDAO, 'getLeaderboard').returns([
                { id: leaderboardId }
            ]);
            stub(LeaderboardDAO, 'updateLeaderboard');

            const result = await LeaderboardController.updateLeaderboard(instance(command));
            expect(result).to.be.true;

            (LeaderboardDAO.getLeaderboard as any).restore();
            (LeaderboardDAO.updateLeaderboard as any).restore();
        });

    });

    describe('updateLeaderboardColumn()', () => {

        it('should check for less than 4 arguments', async () => {
            const command: Command = mock(Command);
            when(command.arguments).thenReturn([]);

            const result = await LeaderboardController.updateLeaderboardColumn(instance(command));
            expect(result).to.equal(ErrorCodes.LDBD_BAD_PARAM);
        });

        it('should check for more than 4 arguments', async () => {
            const command: Command = mock(Command);
            when(command.arguments).thenReturn(['', '', '', '', '']);

            const result = await LeaderboardController.updateLeaderboardColumn(instance(command));
            expect(result).to.equal(ErrorCodes.LDBD_BAD_PARAM);
        });

        it('should return an error when no leaderboard is found with that name', async () => {
            const leaderboardName: string = 'leaderboardName';

            const command: Command = mock(Command);
            when(command.arguments).thenReturn([leaderboardName, '', '', '']);

            stub(LeaderboardDAO, 'getLeaderboard').returns([]);

            const result = await LeaderboardController.updateLeaderboardColumn(instance(command));
            expect(result).to.equal(ErrorCodes.LDBD_NOT_FOUND);

            (LeaderboardDAO.getLeaderboard as any).restore();
        });

        it('should return an error when no leaderboard column is found with that name', async () => {
            const leaderboardName: string = 'leaderboardName';
            const columnName: string = 'columnName';

            const command: Command = mock(Command);
            when(command.arguments).thenReturn([leaderboardName, columnName, '', '']);

            stub(LeaderboardDAO, 'getLeaderboard').returns([leaderboardName]);
            stub(LeaderboardDAO, 'getLeaderboardColumn').returns([]);

            const result = await LeaderboardController.updateLeaderboardColumn(instance(command));
            expect(result).to.equal(ErrorCodes.LDBD_COL_NOT_FOUND);

            (LeaderboardDAO.getLeaderboard as any).restore();
            (LeaderboardDAO.getLeaderboardColumn as any).restore();
        });

        it('should return an error when the action is invalid', async () => {
            const leaderboardName: string = 'leaderboardName';
            const columnName: string = 'columnName';
            const action: string = 'invalidAction';

            const command: Command = mock(Command);
            when(command.arguments).thenReturn([leaderboardName, columnName, action, '']);

            stub(LeaderboardDAO, 'getLeaderboard').returns([leaderboardName]);
            stub(LeaderboardDAO, 'getLeaderboardColumn').returns([columnName]);

            const result = await LeaderboardController.updateLeaderboardColumn(instance(command));
            expect(result).to.equal(ErrorCodes.LDBD_INVALID_PARAM);

            (LeaderboardDAO.getLeaderboard as any).restore();
            (LeaderboardDAO.getLeaderboardColumn as any).restore();
        });

        it('should return true when the Type is updated', async () => {
            const leaderboardName: string = 'leaderboardName';
            const columnName: string = 'columnName';
            const action: string = 'TYPE';
            const value: string = 'some text';

            const command: Command = mock(Command);
            when(command.arguments).thenReturn([leaderboardName, columnName, action, value]);

            stub(LeaderboardDAO, 'getLeaderboard').returns([leaderboardName]);
            stub(LeaderboardDAO, 'getLeaderboardColumn').returns([columnName]);
            stub(LeaderboardDAO, 'updateLeaderboardColumnType').returns(true);

            const result = await LeaderboardController.updateLeaderboardColumn(instance(command));
            expect(result).to.be.true;

            (LeaderboardDAO.getLeaderboard as any).restore();
            (LeaderboardDAO.getLeaderboardColumn as any).restore();
            (LeaderboardDAO.updateLeaderboardColumnType as any).restore();
        });

        it('should return true when the Name is updated', async () => {
            const leaderboardName: string = 'leaderboardName';
            const columnName: string = 'columnName';
            const action: string = 'NAME';
            const value: string = 'some text';

            const command: Command = mock(Command);
            when(command.arguments).thenReturn([leaderboardName, columnName, action, value]);

            stub(LeaderboardDAO, 'getLeaderboard').returns([leaderboardName]);
            stub(LeaderboardDAO, 'getLeaderboardColumn').returns([columnName]);
            stub(LeaderboardDAO, 'updateLeaderboardColumnName').returns(true);

            const result = await LeaderboardController.updateLeaderboardColumn(instance(command));
            expect(result).to.be.true;

            (LeaderboardDAO.getLeaderboard as any).restore();
            (LeaderboardDAO.getLeaderboardColumn as any).restore();
            (LeaderboardDAO.updateLeaderboardColumnName as any).restore();
        });

    });

    describe('deleteLeaderboard()', () => {

        it('should check for less than 1 arguments', async () => {
            const command: Command = mock(Command);
            when(command.arguments).thenReturn([]);

            const result = await LeaderboardController.deleteLeaderboard(instance(command));
            expect(result).to.equal(ErrorCodes.LDBD_BAD_PARAM);
        });

        it('should check for more than 1 argument', async () => {
            const command: Command = mock(Command);
            when(command.arguments).thenReturn(['', '']);

            const result = await LeaderboardController.deleteLeaderboard(instance(command));
            expect(result).to.equal(ErrorCodes.LDBD_BAD_PARAM);
        });

        it('should return an error when no leaderboard is found with that name', async () => {
            const leaderboardName: string = 'leaderboardName';

            const command: Command = mock(Command);
            when(command.arguments).thenReturn([leaderboardName]);

            stub(LeaderboardDAO, 'getLeaderboard').returns([]);

            const result = await LeaderboardController.deleteLeaderboard(instance(command));
            expect(result).to.equal(ErrorCodes.LDBD_NOT_FOUND);

            (LeaderboardDAO.getLeaderboard as any).restore();
        });

        it('should return true when the leaderboard column is updated', async () => {
            const leaderboardName: string = 'leaderboardName';
            const leaderboardId: number = 1;

            const command: Command = mock(Command);
            when(command.arguments).thenReturn([leaderboardName]);

            stub(LeaderboardDAO, 'getLeaderboard').returns([
                { id: leaderboardId }
            ]);
            stub(LeaderboardDAO, 'deleteLeaderboard');

            const result = await LeaderboardController.deleteLeaderboard(instance(command));
            expect(result).to.be.true;

            (LeaderboardDAO.getLeaderboard as any).restore();
            (LeaderboardDAO.deleteLeaderboard as any).restore();
        });
        
    });

    describe('deleteLeaderboardColumn()', () => {

        it('should check for less than 2 arguments.', async () => {
            const command: Command = mock(Command);
            when(command.arguments).thenReturn([]);

            const result = await LeaderboardController.deleteLeaderboardColumn(instance(command));
            expect(result).to.equal(ErrorCodes.LDBD_BAD_PARAM);
        });

        it('should check for more than 2 arguments.', async () => {
            const command: Command = mock(Command);
            when(command.arguments).thenReturn(['', '', '']);

            const result = await LeaderboardController.deleteLeaderboardColumn(instance(command));
            expect(result).to.equal(ErrorCodes.LDBD_BAD_PARAM);
        });

        it('should return an error when no leaderboard is found with that name.', async () => {
            const leaderboardName: string = 'leaderboardName';

            const command: Command = mock(Command);
            when(command.arguments).thenReturn([leaderboardName, '']);

            stub(LeaderboardDAO, 'getLeaderboard').returns([]);

            const result = await LeaderboardController.deleteLeaderboardColumn(instance(command));
            expect(result).to.equal(ErrorCodes.LDBD_NOT_FOUND);

            (LeaderboardDAO.getLeaderboard as any).restore();
        });

        it('should return an error when no leaderboard column is found with that name.', async () => {
            const leaderboardName: string = 'leaderboardName';
            const columnName: string = 'columnName';

            const command: Command = mock(Command);
            when(command.arguments).thenReturn([leaderboardName, columnName]);

            stub(LeaderboardDAO, 'getLeaderboard').returns([leaderboardName]);
            stub(LeaderboardDAO, 'getLeaderboardColumn').returns([]);

            const result = await LeaderboardController.deleteLeaderboardColumn(instance(command));
            expect(result).to.equal(ErrorCodes.LDBD_COL_NOT_FOUND);

            (LeaderboardDAO.getLeaderboard as any).restore();
            (LeaderboardDAO.getLeaderboardColumn as any).restore();
        });

        it('should return true when the leaderboard column is deleted.', async () => {
            const leaderboardName: string = 'leaderboardName';
            const columnName: string = 'columnName';

            const command: Command = mock(Command);
            when(command.arguments).thenReturn([leaderboardName, columnName]);

            stub(LeaderboardDAO, 'getLeaderboard').returns([leaderboardName]);
            stub(LeaderboardDAO, 'getLeaderboardColumn').returns([columnName]);

            const result = await LeaderboardController.deleteLeaderboardColumn(instance(command));
            expect(result).to.be.true;

            (LeaderboardDAO.getLeaderboard as any).restore();
            (LeaderboardDAO.getLeaderboardColumn as any).restore();
        });

    });

});