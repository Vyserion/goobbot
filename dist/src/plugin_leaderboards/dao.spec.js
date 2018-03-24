"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const sinon_1 = require("sinon");
const dataManager_1 = require("../core/dataManager");
const dao_1 = require("./dao");
describe('LeaderboardDAO ::', () => {
    beforeEach(() => {
        sinon_1.stub(dataManager_1.DataManager, "query").returns(true);
    });
    afterEach(() => {
        dataManager_1.DataManager.query.restore();
    });
    describe('getLeaderboards()', () => {
        it('should query for leaderboards.', () => __awaiter(this, void 0, void 0, function* () {
            const expectedQuery = ` SELECT * FROM leaderboards`;
            const dao = new dao_1.LeaderboardDAO();
            const result = yield dao.getLeaderboards();
            chai_1.expect(dataManager_1.DataManager.query.called).to.be.true;
            const call = dataManager_1.DataManager.query.getCall(0);
            let query = call.args[0];
            chai_1.expect(query).to.equal(expectedQuery);
        }));
    });
    describe('getLeaderboard()', () => {
        it('should query for a leaderboard with the correct parameters.', () => __awaiter(this, void 0, void 0, function* () {
            const expectedName = 'leaderboardname';
            const expectedQuery = ` SELECT * FROM leaderboards WHERE name = ($1)`;
            const dao = new dao_1.LeaderboardDAO();
            const result = yield dao.getLeaderboard(expectedName);
            chai_1.expect(dataManager_1.DataManager.query.called).to.be.true;
            const call = dataManager_1.DataManager.query.getCall(0);
            const query = call.args[0];
            chai_1.expect(query).to.equal(expectedQuery);
            const queryArguments = call.args[1];
            const name = queryArguments[0];
            chai_1.expect(name).to.equal(expectedName);
        }));
    });
    describe('getLeaderboardColumns()', () => {
        it('should query for leaderboard columns with the correct parameters', () => __awaiter(this, void 0, void 0, function* () {
            const expectedId = 1;
            const expectedQuery = ` SELECT * FROM leaderboardColumns WHERE leaderboardId = $1`;
            const dao = new dao_1.LeaderboardDAO();
            const result = yield dao.getLeaderboardColumns(expectedId);
            chai_1.expect(dataManager_1.DataManager.query.called).to.be.true;
            const call = dataManager_1.DataManager.query.getCall(0);
            const query = call.args[0];
            chai_1.expect(query).to.equal(expectedQuery);
            const queryArguments = call.args[1];
            const id = queryArguments[0];
            chai_1.expect(id).to.equal(expectedId);
        }));
    });
    describe('getLeaderboardColumn()', () => {
        it('should query for a leaderboard column with the correct parameters', () => __awaiter(this, void 0, void 0, function* () {
            const expectedId = 1;
            const columnName = 'name';
            const expectedQuery = ` SELECT * FROM leaderboardColumns WHERE leaderboardId = $1 AND name = $2`;
            const dao = new dao_1.LeaderboardDAO();
            const result = yield dao.getLeaderboardColumn(expectedId, columnName);
            chai_1.expect(dataManager_1.DataManager.query.called).to.be.true;
            const call = dataManager_1.DataManager.query.getCall(0);
            const query = call.args[0];
            chai_1.expect(query).to.equal(expectedQuery);
            const queryArguments = call.args[1];
            const id = queryArguments[0];
            chai_1.expect(id).to.equal(expectedId);
            const name = queryArguments[1];
            chai_1.expect(name).to.equal(columnName);
        }));
    });
    describe('insertLeaderboard()', () => {
        it('should insert a leaderboard with the correct parameters.', () => __awaiter(this, void 0, void 0, function* () {
            const expectedName = 'leaderboardname';
            const expectedQuery = ` INSERT INTO leaderboards VALUES (DEFAULT, $1)`;
            const dao = new dao_1.LeaderboardDAO();
            const result = yield dao.insertLeaderboard(expectedName);
            chai_1.expect(dataManager_1.DataManager.query.called).to.be.true;
            const call = dataManager_1.DataManager.query.getCall(0);
            const query = call.args[0];
            chai_1.expect(query).to.equal(expectedQuery);
            const queryArguments = call.args[1];
            const name = queryArguments[0];
            chai_1.expect(name).to.equal(expectedName);
        }));
    });
    describe('insertLeaderboardColumn()', () => {
        it('should insert a leaderboard column with the correct parameters.', () => __awaiter(this, void 0, void 0, function* () {
            const leaderboardId = 1;
            const expectedColumnName = 'columnName';
            const expectedColumnType = 'col';
            const expectedQuery = ' INSERT INTO leaderboardColumns VALUES (DEFAULT, $1, $2, $3)';
            const dao = new dao_1.LeaderboardDAO();
            const result = yield dao.insertLeaderboardColumn(leaderboardId, expectedColumnName, expectedColumnType);
            chai_1.expect(dataManager_1.DataManager.query.called).to.be.true;
            const call = dataManager_1.DataManager.query.getCall(0);
            const query = call.args[0];
            chai_1.expect(query).to.equal(expectedQuery);
            const queryArguments = call.args[1];
            const id = queryArguments[0];
            chai_1.expect(id).to.equal(leaderboardId);
            const name = queryArguments[1];
            chai_1.expect(name).to.equal(expectedColumnName);
            const type = queryArguments[2];
            chai_1.expect(type).to.equal(expectedColumnType);
        }));
    });
    describe('updateLeaderboard()', () => {
        it('should update a leaderboard with the correct parameters.', () => __awaiter(this, void 0, void 0, function* () {
            const expectedId = 123;
            const expectedName = 'leaderboardname';
            const expectedQuery = ` UPDATE leaderboards SET name = ($1) WHERE id = ($2)`;
            const dao = new dao_1.LeaderboardDAO();
            const result = yield dao.updateLeaderboard(expectedId, expectedName);
            chai_1.expect(dataManager_1.DataManager.query.called).to.be.true;
            const call = dataManager_1.DataManager.query.getCall(0);
            const queryArgument = call.args[0];
            chai_1.expect(queryArgument).to.equal(expectedQuery);
            const queryArguments = call.args[1];
            const name = queryArguments[0];
            chai_1.expect(name).to.equal(expectedName);
            const id = queryArguments[1];
            chai_1.expect(id).to.equal(expectedId);
        }));
    });
    describe('deleteLeaderboard()', () => {
        it('should delete a leaderboard with the correct parameters.', () => __awaiter(this, void 0, void 0, function* () {
            const expectedId = 123;
            const expectedQuery = ` DELETE FROM leaderboards WHERE id = ($1)`;
            const dao = new dao_1.LeaderboardDAO();
            const result = yield dao.deleteLeaderboard(expectedId);
            chai_1.expect(dataManager_1.DataManager.query.called).to.be.true;
            const call = dataManager_1.DataManager.query.getCall(0);
            let query = call.args[0];
            chai_1.expect(query).to.equal(expectedQuery);
            const queryArguments = call.args[1];
            const id = queryArguments[0];
            chai_1.expect(id).to.equal(expectedId);
        }));
    });
});
//# sourceMappingURL=dao.spec.js.map