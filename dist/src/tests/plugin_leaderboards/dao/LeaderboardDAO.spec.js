"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const sinon_1 = require("sinon");
const dataManager_1 = require("../../../core/dataManager");
const LeaderboardDAO_1 = require("../../../plugin_leaderboards/dao/LeaderboardDAO");
describe('LeaderboardDAO ::', () => {
    beforeEach(() => {
        sinon_1.stub(dataManager_1.DataManager, "query").returns(true);
    });
    afterEach(() => {
        dataManager_1.DataManager.query.restore();
    });
    describe('getLeaderboards()', () => {
        it('should query for leaderboards.', async () => {
            const expectedQuery = ` SELECT * FROM leaderboards`;
            const result = await LeaderboardDAO_1.LeaderboardDAO.getLeaderboards();
            chai_1.expect(dataManager_1.DataManager.query.called).to.be.true;
            const call = dataManager_1.DataManager.query.getCall(0);
            let query = call.args[0];
            chai_1.expect(query).to.equal(expectedQuery);
        });
    });
    describe('getLeaderboard()', () => {
        it('should query for a leaderboard with the correct parameters.', async () => {
            const expectedName = 'leaderboardname';
            const expectedQuery = ` SELECT * FROM leaderboards WHERE name = $1`;
            const result = await LeaderboardDAO_1.LeaderboardDAO.getLeaderboard(expectedName);
            chai_1.expect(dataManager_1.DataManager.query.called).to.be.true;
            const call = dataManager_1.DataManager.query.getCall(0);
            const query = call.args[0];
            chai_1.expect(query).to.equal(expectedQuery);
            const queryArguments = call.args[1];
            const name = queryArguments[0];
            chai_1.expect(name).to.equal(expectedName);
        });
    });
    describe('insertLeaderboard()', () => {
        it('should insert a leaderboard with the correct parameters.', async () => {
            const expectedName = 'leaderboardname';
            const expectedQuery = ` INSERT INTO leaderboards VALUES (DEFAULT, $1)`;
            const result = await LeaderboardDAO_1.LeaderboardDAO.insertLeaderboard(expectedName);
            chai_1.expect(dataManager_1.DataManager.query.called).to.be.true;
            const call = dataManager_1.DataManager.query.getCall(0);
            const query = call.args[0];
            chai_1.expect(query).to.equal(expectedQuery);
            const queryArguments = call.args[1];
            const name = queryArguments[0];
            chai_1.expect(name).to.equal(expectedName);
        });
    });
    describe('updateLeaderboard()', () => {
        it('should update a leaderboard with the correct parameters.', async () => {
            const expectedId = 123;
            const expectedName = 'leaderboardname';
            const expectedQuery = ` UPDATE leaderboards SET name = ($1) WHERE id = ($2)`;
            const result = await LeaderboardDAO_1.LeaderboardDAO.updateLeaderboard(expectedId, expectedName);
            chai_1.expect(dataManager_1.DataManager.query.called).to.be.true;
            const call = dataManager_1.DataManager.query.getCall(0);
            const queryArgument = call.args[0];
            chai_1.expect(queryArgument).to.equal(expectedQuery);
            const queryArguments = call.args[1];
            const name = queryArguments[0];
            chai_1.expect(name).to.equal(expectedName);
            const id = queryArguments[1];
            chai_1.expect(id).to.equal(expectedId);
        });
    });
    describe('deleteLeaderboard()', () => {
        it('should delete a leaderboard with the correct parameters.', async () => {
            const expectedId = 123;
            const expectedQuery = ` DELETE FROM leaderboards WHERE id = ($1)`;
            const result = await LeaderboardDAO_1.LeaderboardDAO.deleteLeaderboard(expectedId);
            chai_1.expect(dataManager_1.DataManager.query.called).to.be.true;
            const call = dataManager_1.DataManager.query.getCall(0);
            let query = call.args[0];
            chai_1.expect(query).to.equal(expectedQuery);
            const queryArguments = call.args[1];
            const id = queryArguments[0];
            chai_1.expect(id).to.equal(expectedId);
        });
    });
});
//# sourceMappingURL=LeaderboardDAO.spec.js.map