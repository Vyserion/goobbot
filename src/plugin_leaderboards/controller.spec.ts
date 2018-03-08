import 'mocha';
import { expect } from 'chai';
import { stub } from 'sinon';
import { mock, instance, when } from 'ts-mockito';
import { LeaderboardDAO } from "./dao";
import { LeaderboardController } from './controller';
import { ErrorCodes } from "./errorCodes";
import { Command } from "../core/command";

describe('LeaderboardController ::', () => {

    describe('getLeaderboards()', () => {
        // No testable functionality.
    });

    describe('insertLeaderboard()', () => {

        it('should check for less than one argument', async () => {
            const controller: LeaderboardController = new LeaderboardController();

            const command: Command = mock(Command);
            when(command.arguments).thenReturn([]);

            const result = await controller.insertLeaderboard(instance(command));
            expect(result).to.equal(ErrorCodes.LDBD_BAD_PARAM);
        });

        it('should check for more than one argument', async () => {
            const controller: LeaderboardController = new LeaderboardController();

            const command: Command = mock(Command);
            when(command.arguments).thenReturn(['one', 'two']);

            const result = await controller.insertLeaderboard(instance(command));
            expect(result).to.equal(ErrorCodes.LDBD_BAD_PARAM);
        });

        it('should return an error when a leaderboard with the same name is detected', async () => {
            const leaderboardName: string = 'leaderboardname';
            
            const controller: LeaderboardController = new LeaderboardController();

            const command: Command = mock(Command);
            when(command.arguments).thenReturn([leaderboardName]);

            const dao: LeaderboardDAO = mock(LeaderboardDAO);
            when(dao.getLeaderboard).thenResolve();
            controller.dao = dao;

            const result = await controller.insertLeaderboard(instance(command));
        });

    });

});