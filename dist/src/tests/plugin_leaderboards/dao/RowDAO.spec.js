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
    describe('getLeaderboardRows()', () => {
        it('should query for leaderboard rows with the correct parameters.', async () => {
            const expectedLeaderboardId = 1;
            const expectedQuery = ` SELECT * FROM leaderboard_rows WHERE leaderboard_id = $1`;
            const result = await RowDAO_1.RowDAO.getLeaderboardRows(expectedLeaderboardId);
            chai_1.expect(dataManager_1.DataManager.query.called).to.be.true;
            const call = dataManager_1.DataManager.query.getCall(0);
            const query = call.args[0];
            chai_1.expect(query).to.equal(expectedQuery);
            const queryArguments = call.args[1];
            const leaderboardId = queryArguments[0];
            chai_1.expect(leaderboardId).to.equal(expectedLeaderboardId);
        });
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
    describe('updateLeaderboardRow()', () => {
        it('should update a leaderboard row with the correct parameters.', async () => {
            const expectedLeaderboardId = 1;
            const expectedNewName = 'New Name';
            const expectedQuery = ` UPDATE leaderboard_rows SET name = ($2) WHERE ID = ($1)`;
            const result = await RowDAO_1.RowDAO.updateLeaderboardRow(expectedLeaderboardId, expectedNewName);
            chai_1.expect(dataManager_1.DataManager.query.called).to.be.true;
            const call = dataManager_1.DataManager.query.getCall(0);
            const queryArgument = call.args[0];
            chai_1.expect(queryArgument).to.equal(expectedQuery);
            const queryArguments = call.args[1];
            const leaderboardId = queryArguments[0];
            chai_1.expect(leaderboardId).to.equal(expectedLeaderboardId);
            const name = queryArguments[1];
            chai_1.expect(name).to.equal(expectedNewName);
        });
    });
    describe('deleteLeaderboardRows()', () => {
        it('should delete leaderboard rows with the correct parameters.', async () => {
            const expectedId = 123;
            const expectedQuery = ` DELETE FROM leaderboard_rows WHERE leaderboard_id = ($1)`;
            const result = await RowDAO_1.RowDAO.deleteLeaderboardRows(expectedId);
            chai_1.expect(dataManager_1.DataManager.query.called).to.be.true;
            const call = dataManager_1.DataManager.query.getCall(0);
            const queryArgument = call.args[0];
            chai_1.expect(queryArgument).to.equal(expectedQuery);
            const queryArguments = call.args[1];
            const leaderboardId = queryArguments[0];
            chai_1.expect(leaderboardId).to.equal(expectedId);
        });
    });
    describe('deleteLeaderboardRow()', () => {
        it('should delete a leaderboard row with the correct parameters.', async () => {
            const expectedLeaderboardRowId = 1;
            const expectedQuery = ` DELETE FROM leaderboard_rows WHERE id = ($1)`;
            const result = await RowDAO_1.RowDAO.deleteLeaderboardRow(expectedLeaderboardRowId);
            chai_1.expect(dataManager_1.DataManager.query.called).to.be.true;
            const call = dataManager_1.DataManager.query.getCall(0);
            const queryArgument = call.args[0];
            chai_1.expect(queryArgument).to.equal(expectedQuery);
            const queryArguments = call.args[1];
            const leaderboardRowId = queryArguments[0];
            chai_1.expect(leaderboardRowId).to.equal(expectedLeaderboardRowId);
        });
    });
});
//# sourceMappingURL=RowDAO.spec.js.map