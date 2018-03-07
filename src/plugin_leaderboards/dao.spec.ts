import 'mocha';
import { expect } from 'chai';
import { mock, instance, when } from 'ts-mockito';
import { stub } from 'sinon';
import { DataManager } from '../core/dataManager';
import { LeaderboardDAO } from './dao';

describe('LeaderboardDAO ::', () => {

    beforeEach(() => {
        stub(DataManager, "query").returns(true);
    });

    afterEach(() => {
        (DataManager.query as any).restore();
    });

    describe('getLeaderboards()', () => {

        it('should query for leaderboards.', async () => {
            const expectedQuery: string = ` SELECT * FROM leaderboards`;

            const dao: LeaderboardDAO = new LeaderboardDAO();
            const result: boolean = await dao.getLeaderboards();
            expect((DataManager.query as any).called).to.be.true;

            const call: any = (DataManager.query as any).getCall(0);
            let query: string = call.args[0];
            expect(query).to.equal(expectedQuery);
        });

    });

    describe('getLeaderboard()', () => {

        it('should query for a leaderboard with the correct parameters.', async () => {
            const expectedName: string = 'leaderboardname';
            const expectedQuery: string = ` SELECT * FROM leaderboards WHERE name = ($1)`;

            const dao: LeaderboardDAO = new LeaderboardDAO();
            const result: boolean = await dao.getLeaderboard(expectedName);
            expect((DataManager.query as any).called).to.be.true;

            const call: any = (DataManager.query as any).getCall(0);
            const query: string = call.args[0];
            expect(query).to.equal(expectedQuery);

            const queryArguments: any[] = call.args[1];
            const name: string = queryArguments[0];
            expect(name).to.equal(expectedName);
        });

    });

    describe('insertLeaderboard()', () => {

        it('should insert a leaderboard with the correct parameters.', async () => {
            const expectedName: string = 'leaderboardname';
            const expectedQuery: string = ` INSERT INTO leaderboards VALUES (DEFAULT, $1)`;

            const dao: LeaderboardDAO = new LeaderboardDAO();
            const result: boolean = await dao.insertLeaderboard(expectedName);
            expect((DataManager.query as any).called).to.be.true;

            const call: any = (DataManager.query as any).getCall(0);
            const query: string = call.args[0];
            expect(query).to.equal(expectedQuery);

            const queryArguments: any[] = call.args[1];
            const name: string = queryArguments[0];
            expect(name).to.equal(expectedName);
        });

    });

    describe('updateLeaderboard()', () => {

        it('should update a leaderboard with the correct parameters.', async () => {
            const expectedId: number = 123;
            const expectedName: string = 'leaderboardname';
            const expectedQuery: string = ` UPDATE leaderboards SET name = ($1) WHERE id = ($2)`;

            const dao: LeaderboardDAO = new LeaderboardDAO();
            const result: boolean = await dao.updateLeaderboard(expectedId, expectedName);
            expect((DataManager.query as any).called).to.be.true;

            const call: any = (DataManager.query as any).getCall(0);
            const queryArgument: string = call.args[0];
            expect(queryArgument).to.equal(expectedQuery);

            const queryArguments: any[] = call.args[1];
            const name: string = queryArguments[0];
            expect(name).to.equal(expectedName);

            const id: number = queryArguments[1];
            expect(id).to.equal(expectedId);
        });

    });

    describe('deleteLeaderboard()', () => {

        it('should delete a leaderboard with the correct parameters.', async () => {
            const expectedId: number = 123;
            const expectedQuery: string = ` DELETE FROM leaderboards WHERE id = ($1)`;

            const dao: LeaderboardDAO = new LeaderboardDAO();
            const result: boolean = await dao.deleteLeaderboard(expectedId);
            expect((DataManager.query as any).called).to.be.true;

            const call: any = (DataManager.query as any).getCall(0);
            let query: string = call.args[0];
            expect(query).to.equal(expectedQuery);

            const queryArguments: any[] = call.args[1];
            const id: number = queryArguments[0];
            expect(id).to.equal(expectedId);
        });

    });

});