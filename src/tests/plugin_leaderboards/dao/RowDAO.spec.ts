import 'mocha';
import { expect } from 'chai';
import { stub } from 'sinon';
import { DataManager } from '../../../core/dataManager';
import { RowDAO } from "../../../plugin_leaderboards/dao/RowDAO";

describe('RowDAO ::', () => {
    
    beforeEach(() => {
        stub(DataManager, "query").returns(true);
    });

    afterEach(() => {
        (DataManager.query as any).restore();
    });

    describe('insertLeaderboardRow()', () => {

        it('should insert a leaderboard row with the correct parameters.', async () => {
            const leaderboardId: number = 1;
            const expectedRowName: string = 'rowName';
            const expectedQuery: string = ` INSERT INTO leaderboard_rows VALUES (DEFAULT, $1, $2)`;

            const result = await RowDAO.insertLeaderboardRow(leaderboardId, expectedRowName);
            expect((DataManager.query as any).called).to.be.true;

            const call: any = (DataManager.query as any).getCall(0);
            const query: string = call.args[0];
            expect(query).to.equal(expectedQuery);

            const queryArguments: any[] = call.args[1];
            const id: number = queryArguments[0];
            expect(id).to.equal(leaderboardId);
            const name: string = queryArguments[1];
            expect(name).to.equal(expectedRowName);
        });

    });

});