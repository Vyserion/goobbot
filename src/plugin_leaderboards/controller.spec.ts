import 'mocha';
import { expect } from 'chai';
import { mock, instance, when, anything } from 'ts-mockito';
import { LeaderboardDAO } from "./dao";
import { LeaderboardController } from './controller';
import { ErrorCodes } from "./config/errorCodes";
import { Command } from "../core/command";

describe('LeaderboardController ::', () => {

    describe('getLeaderboards()', () => {
        
        it('should return the list of leaderboards from the DAO.', async () => {
            const controller: LeaderboardController = new LeaderboardController();
            const dao: LeaderboardDAO = mock(LeaderboardDAO);
            when(dao.getLeaderboards()).thenResolve(['leaderboard']);
            controller.dao = instance(dao);

            const result = await controller.getLeaderboards();
            expect(result.length).to.equal(1);
        });

    });

    describe('insertLeaderboard()', () => {

        it('should check for less than one argument.', async () => {
            const controller: LeaderboardController = new LeaderboardController();

            const command: Command = mock(Command);
            when(command.arguments).thenReturn([]);

            const result = await controller.insertLeaderboard(instance(command));
            expect(result).to.equal(ErrorCodes.LDBD_BAD_PARAM);
        });

        it('should check for more than one argument.', async () => {
            const controller: LeaderboardController = new LeaderboardController();

            const command: Command = mock(Command);
            when(command.arguments).thenReturn(['one', 'two']);

            const result = await controller.insertLeaderboard(instance(command));
            expect(result).to.equal(ErrorCodes.LDBD_BAD_PARAM);
        });

        it('should return an error when a leaderboard with the same name is detected.', async () => {
            const leaderboardName: string = 'leaderboardname';
            
            const controller: LeaderboardController = new LeaderboardController();

            const command: Command = mock(Command);
            when(command.arguments).thenReturn([leaderboardName]);

            const dao: LeaderboardDAO = mock(LeaderboardDAO);
            when(dao.getLeaderboard(leaderboardName)).thenResolve([leaderboardName]);
            controller.dao = instance(dao);

            const result = await controller.insertLeaderboard(instance(command));
            expect(result).to.equal(ErrorCodes.LDBD_DUP_NAME);
        });

        it('should return true when the leaderboard is inserted correctly.', async () => {
            const leaderboardName: string = 'leaderboardName';

            const command: Command = mock(Command);
            when(command.arguments).thenReturn([leaderboardName]);

            const controller: LeaderboardController = new LeaderboardController();
            const dao: LeaderboardDAO = mock(LeaderboardDAO);
            when(dao.getLeaderboard(leaderboardName)).thenResolve([]);
            when(dao.insertLeaderboard(leaderboardName)).thenResolve();
            controller.dao = instance(dao);

            const result = await controller.insertLeaderboard(instance(command));
            expect(result).to.be.true;
        });

    });

    describe('insertLeaderboardColumn()', () => {

        it('should check for less than 2 arguments.', async () => {
            const controller: LeaderboardController = new LeaderboardController();

            const zeroCommand: Command = mock(Command);
            when(zeroCommand.arguments).thenReturn([]);

            const zeroResult = await controller.insertLeaderboardColumn(instance(zeroCommand));
            expect(zeroResult).to.equal(ErrorCodes.LDBD_BAD_PARAM);

            const oneCommand: Command = mock(Command);
            when(oneCommand.arguments).thenReturn(['1']);

            const oneResult = await controller.insertLeaderboardColumn(instance(oneCommand));
            expect(oneResult).to.equal(ErrorCodes.LDBD_BAD_PARAM);
        });

        it('should check for more than 3 arguments.', async () => {
            const controller: LeaderboardController = new LeaderboardController();

            const command: Command = mock(Command);
            when(command.arguments).thenReturn(['1', '2', '3', '4']);

            const result = await controller.insertLeaderboardColumn(instance(command));
            expect(result).to.equal(ErrorCodes.LDBD_BAD_PARAM);
        });

        it('should return an error when no leaderboard is found with that id.', async () => {
            const leaderboardName: string = 'leaderboardName';

            const controller: LeaderboardController = new LeaderboardController();

            const command: Command = mock(Command);
            when(command.arguments).thenReturn([leaderboardName, '']);

            const dao: LeaderboardDAO = mock(LeaderboardDAO);
            when(dao.getLeaderboard(leaderboardName)).thenResolve([]);
            controller.dao = instance(dao);

            const result = await controller.insertLeaderboardColumn(instance(command));
            expect(result).to.equal(ErrorCodes.LDBD_NOT_FOUND);
        });

        it('should return an error when a column is found with the same name.', async () => {
            const leaderboardName: string = 'leaderboardName';
            const leaderboardId: number = 1;
            const columnName: string = 'columnName';

            const controller: LeaderboardController = new LeaderboardController();

            const command: Command = mock(Command);
            when(command.arguments).thenReturn([leaderboardName, columnName]);

            const dao: LeaderboardDAO = mock(LeaderboardDAO);
            when(dao.getLeaderboard(leaderboardName)).thenResolve([
                { id: leaderboardId }
            ]);
            when(dao.getLeaderboardColumn(leaderboardId, columnName)).thenResolve([columnName]);
            controller.dao = instance(dao);

            const result = await controller.insertLeaderboardColumn(instance(command));
            expect(result).to.equal(ErrorCodes.LDBD_DUP_NAME);
        });

        it('should return true when the leaderboard column is inserted correctly.', async () => {
            const leaderboardName: string = 'leaderboardName';
            const leaderboardId: number = 1;
            const columnName: string = 'columnName';

            const controller: LeaderboardController = new LeaderboardController();

            const command: Command = mock(Command);
            when(command.arguments).thenReturn([leaderboardName, columnName]);

            const dao: LeaderboardDAO = mock(LeaderboardDAO);
            when(dao.getLeaderboard(leaderboardName)).thenResolve([
                { id: leaderboardId }
            ]);
            when(dao.getLeaderboardColumn(leaderboardId, columnName)).thenResolve([]);
            when(dao.insertLeaderboardColumn(leaderboardId, columnName, 'DATA')).thenResolve();
            controller.dao = instance(dao);

            const result = await controller.insertLeaderboardColumn(instance(command));
            expect(result).to.be.true;
        });

    });

    describe('updateLeaderboard()', () => {

        it('should check for less than 2 arguments', async () => {
            const controller: LeaderboardController = new LeaderboardController();

            const command: Command = mock(Command);
            when(command.arguments).thenReturn([]);

            const result = await controller.updateLeaderboard(instance(command));
            expect(result).to.equal(ErrorCodes.LDBD_BAD_PARAM);
        });

        it('should check for more than 2 arguments', async () => {
            const controller: LeaderboardController = new LeaderboardController();

            const command: Command = mock(Command);
            when(command.arguments).thenReturn(['', '', '']);

            const result = await controller.updateLeaderboard(instance(command));
            expect(result).to.equal(ErrorCodes.LDBD_BAD_PARAM);
        });

        it('should return an error when no leaderboard is found with that name', async () => {
            const leaderboardName: string = 'leaderboardName';

            const controller: LeaderboardController = new LeaderboardController();

            const command: Command = mock(Command);
            when(command.arguments).thenReturn([leaderboardName, '']);

            const dao: LeaderboardDAO = mock(LeaderboardDAO);
            when(dao.getLeaderboard(leaderboardName)).thenResolve([]);
            controller.dao = instance(dao);

            const result = await controller.updateLeaderboard(instance(command));
            expect(result).to.equal(ErrorCodes.LDBD_NOT_FOUND);
        });

        it('should return true when the leaderboard column is updated', async () => {
            const leaderboardName: string = 'leaderboardName';
            const leaderboardId: number = 1;

            const controller: LeaderboardController = new LeaderboardController();
            
            const command: Command = mock(Command);
            when(command.arguments).thenReturn([leaderboardName, '']);

            const dao: LeaderboardDAO = mock(LeaderboardDAO);
            when(dao.getLeaderboard(leaderboardName)).thenResolve([
                { id: leaderboardId }
            ]);
            when(dao.updateLeaderboard(leaderboardId, '')).thenResolve();
            controller.dao = instance(dao);

            const result = await controller.updateLeaderboard(instance(command));
            expect(result).to.be.true;
        });

    });

    describe('deleteLeaderboard()', () => {

        it('should check for less than 1 arguments', async () => {
            const controller: LeaderboardController = new LeaderboardController();

            const command: Command = mock(Command);
            when(command.arguments).thenReturn([]);

            const result = await controller.deleteLeaderboard(instance(command));
            expect(result).to.equal(ErrorCodes.LDBD_BAD_PARAM);
        });

        it('should check for more than 1 argument', async () => {
            const controller: LeaderboardController = new LeaderboardController();

            const command: Command = mock(Command);
            when(command.arguments).thenReturn(['', '']);

            const result = await controller.deleteLeaderboard(instance(command));
            expect(result).to.equal(ErrorCodes.LDBD_BAD_PARAM);
        });

        it('should return an error when no leaderboard is found with that name', async () => {
            const leaderboardName: string = 'leaderboardName';

            const controller: LeaderboardController = new LeaderboardController();

            const command: Command = mock(Command);
            when(command.arguments).thenReturn([leaderboardName]);

            const dao: LeaderboardDAO = mock(LeaderboardDAO);
            when(dao.getLeaderboard(leaderboardName)).thenResolve([]);
            controller.dao = instance(dao);

            const result = await controller.deleteLeaderboard(instance(command));
            expect(result).to.equal(ErrorCodes.LDBD_NOT_FOUND);
        });

        it('should return true when the leaderboard column is updated', async () => {
            const leaderboardName: string = 'leaderboardName';
            const leaderboardId: number = 1;

            const controller: LeaderboardController = new LeaderboardController();
            
            const command: Command = mock(Command);
            when(command.arguments).thenReturn([leaderboardName]);

            const dao: LeaderboardDAO = mock(LeaderboardDAO);
            when(dao.getLeaderboard(leaderboardName)).thenResolve([
                { id: leaderboardId }
            ]);
            when(dao.deleteLeaderboard(leaderboardId)).thenResolve();
            controller.dao = instance(dao);

            const result = await controller.deleteLeaderboard(instance(command));
            expect(result).to.be.true;
        });
        
    });

});