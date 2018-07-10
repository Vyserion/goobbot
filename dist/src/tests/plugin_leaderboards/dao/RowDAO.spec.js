"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const sinon_1 = require("sinon");
const dataManager_1 = require("../../../core/dataManager");
const RowDAO_1 = require("../../../plugin_leaderboards/dao/RowDAO");
describe('RowDAO ::', () => {
    beforeEach(() => {
        sinon_1.stub(dataManager_1.DataManager, "query").returns(true);
    });
    afterEach(() => {
        dataManager_1.DataManager.query.restore();
    });
    describe('getLeaderboardRow()', () => {
        it('should query for a leaderboard row with the correct parameters.', async () => {
            const leaderboardId = 1;
            const rowName = 'name';
            const expectedQuery = ` SELECT * FROM leaderboard_rows WHERE leaderboard_id = $1 AND name = $2`;
            const result = await RowDAO_1.RowDAO.getLeaderboardRow(leaderboardId, rowName);
            chai_1.expect(dataManager_1.DataManager.query.called).to.be.true;
            const call = dataManager_1.DataManager.query.getCall(0);
            const query = call.args[0];
            chai_1.expect(query).to.equal(expectedQuery);
            const queryArguments = call.args[1];
            const id = queryArguments[0];
            chai_1.expect(id).to.equal(leaderboardId);
            const name = queryArguments[1];
            chai_1.expect(name).to.equal(rowName);
        });
    });
    describe('insertLeaderboardRow()', () => {
        it('should insert a leaderboard row with the correct parameters.', async () => {
            const leaderboardId = 1;
            const expectedRowName = 'rowName';
            const expectedQuery = ` INSERT INTO leaderboard_rows VALUES (DEFAULT, $1, $2)`;
            const result = await RowDAO_1.RowDAO.insertLeaderboardRow(leaderboardId, expectedRowName);
            chai_1.expect(dataManager_1.DataManager.query.called).to.be.true;
            const call = dataManager_1.DataManager.query.getCall(0);
            const query = call.args[0];
            chai_1.expect(query).to.equal(expectedQuery);
            const queryArguments = call.args[1];
            const id = queryArguments[0];
            chai_1.expect(id).to.equal(leaderboardId);
            const name = queryArguments[1];
            chai_1.expect(name).to.equal(expectedRowName);
        });
    });
});
//# sourceMappingURL=RowDAO.spec.js.map