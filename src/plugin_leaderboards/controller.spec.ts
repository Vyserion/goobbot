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

            const result = await controller.insertLeaderboard(command);
            expect(result).to.equal(ErrorCodes.LDBD_BAD_PARAM);
        });

    });

});