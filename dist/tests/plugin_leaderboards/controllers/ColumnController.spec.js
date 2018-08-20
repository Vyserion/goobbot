"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const chai_1 = require("chai");
const ts_mockito_1 = require("ts-mockito");
const LeaderboardDAO_1 = require("../../../plugin_leaderboards/dao/LeaderboardDAO");
const ColumnDAO_1 = require("../../../plugin_leaderboards/dao/ColumnDAO");
const ColumnController_1 = require("../../../plugin_leaderboards/controllers/ColumnController");
const ReturnCodes_1 = require("../../../plugin_leaderboards/config/ReturnCodes");
const command_1 = require("../../../core/command");
const sinon_1 = require("sinon");
describe("ColumnController ::", () => {
    describe("insertLeaderboardColumn()", () => {
        it("should check for less than 2 arguments.", async () => {
            const zeroCommand = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(zeroCommand.arguments).thenReturn([]);
            const zeroResult = await ColumnController_1.ColumnController.insertLeaderboardColumn(ts_mockito_1.instance(zeroCommand));
            chai_1.expect(zeroResult).to.equal(ReturnCodes_1.ReturnCodes.INCORRECT_PARAM_LENGTH);
            const oneCommand = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(oneCommand.arguments).thenReturn(["1"]);
            const oneResult = await ColumnController_1.ColumnController.insertLeaderboardColumn(ts_mockito_1.instance(oneCommand));
            chai_1.expect(oneResult).to.equal(ReturnCodes_1.ReturnCodes.INCORRECT_PARAM_LENGTH);
        });
        it("should check for more than 3 arguments.", async () => {
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn(["1", "2", "3", "4"]);
            const result = await ColumnController_1.ColumnController.insertLeaderboardColumn(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(ReturnCodes_1.ReturnCodes.INCORRECT_PARAM_LENGTH);
        });
        it("should return an error when no leaderboard is found with that id.", async () => {
            const leaderboardName = "leaderboardName";
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName, ""]);
            sinon_1.stub(LeaderboardDAO_1.LeaderboardDAO, "getLeaderboard").returns([]);
            const result = await ColumnController_1.ColumnController.insertLeaderboardColumn(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(ReturnCodes_1.ReturnCodes.LEADERBOARD_NOT_FOUND);
            LeaderboardDAO_1.LeaderboardDAO.getLeaderboard.restore();
        });
        it("should return an error when a column is found with the same name.", async () => {
            const leaderboardName = "leaderboardName";
            const leaderboardId = 1;
            const columnName = "columnName";
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName, columnName]);
            sinon_1.stub(LeaderboardDAO_1.LeaderboardDAO, "getLeaderboard").returns([{ id: leaderboardId }]);
            sinon_1.stub(ColumnDAO_1.ColumnDAO, "getLeaderboardColumn").returns([columnName]);
            const result = await ColumnController_1.ColumnController.insertLeaderboardColumn(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(ReturnCodes_1.ReturnCodes.LEADERBOARD_DUPLICATE_NAME);
            LeaderboardDAO_1.LeaderboardDAO.getLeaderboard.restore();
            ColumnDAO_1.ColumnDAO.getLeaderboardColumn.restore();
        });
        it(`should return an error when the provided type isn't known`, async () => {
            const leaderboardName = "leaderboardName";
            const leaderboardId = 1;
            const columnName = "columnName";
            const columnType = "not a column type";
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName, columnName, columnType]);
            sinon_1.stub(LeaderboardDAO_1.LeaderboardDAO, "getLeaderboard").returns([{ id: leaderboardId }]);
            sinon_1.stub(ColumnDAO_1.ColumnDAO, "getLeaderboardColumn").returns([]);
            const result = await ColumnController_1.ColumnController.insertLeaderboardColumn(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(ReturnCodes_1.ReturnCodes.BAD_PARAMETER_TYPE);
            LeaderboardDAO_1.LeaderboardDAO.getLeaderboard.restore();
            ColumnDAO_1.ColumnDAO.getLeaderboardColumn.restore();
        });
        it("should return true when the leaderboard column is inserted correctly.", async () => {
            const leaderboardName = "leaderboardName";
            const leaderboardId = 1;
            const columnName = "columnName";
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName, columnName]);
            sinon_1.stub(LeaderboardDAO_1.LeaderboardDAO, "getLeaderboard").returns([{ id: leaderboardId }]);
            sinon_1.stub(ColumnDAO_1.ColumnDAO, "getLeaderboardColumn").returns([]);
            sinon_1.stub(ColumnDAO_1.ColumnDAO, "insertLeaderboardColumn");
            const result = await ColumnController_1.ColumnController.insertLeaderboardColumn(ts_mockito_1.instance(command));
            chai_1.expect(result).to.be.true;
            LeaderboardDAO_1.LeaderboardDAO.getLeaderboard.restore();
            ColumnDAO_1.ColumnDAO.getLeaderboardColumn.restore();
            ColumnDAO_1.ColumnDAO.insertLeaderboardColumn.restore();
        });
        it("should return true when the leaderboard column is inserted correctly with a known type.", async () => {
            const leaderboardName = "leaderboardName";
            const leaderboardId = 1;
            const columnName = "columnName";
            const columnType = "data";
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName, columnName, columnType]);
            sinon_1.stub(LeaderboardDAO_1.LeaderboardDAO, "getLeaderboard").returns([{ id: leaderboardId }]);
            sinon_1.stub(ColumnDAO_1.ColumnDAO, "getLeaderboardColumn").returns([]);
            sinon_1.stub(ColumnDAO_1.ColumnDAO, "insertLeaderboardColumn");
            const result = await ColumnController_1.ColumnController.insertLeaderboardColumn(ts_mockito_1.instance(command));
            chai_1.expect(result).to.be.true;
            LeaderboardDAO_1.LeaderboardDAO.getLeaderboard.restore();
            ColumnDAO_1.ColumnDAO.getLeaderboardColumn.restore();
            ColumnDAO_1.ColumnDAO.insertLeaderboardColumn.restore();
        });
    });
    describe("updateLeaderboardColumn()", () => {
        it("should check for less than 4 arguments", async () => {
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([]);
            const result = await ColumnController_1.ColumnController.updateLeaderboardColumn(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(ReturnCodes_1.ReturnCodes.INCORRECT_PARAM_LENGTH);
        });
        it("should check for more than 4 arguments", async () => {
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn(["", "", "", "", ""]);
            const result = await ColumnController_1.ColumnController.updateLeaderboardColumn(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(ReturnCodes_1.ReturnCodes.INCORRECT_PARAM_LENGTH);
        });
        it("should return an error when no leaderboard is found with that name", async () => {
            const leaderboardName = "leaderboardName";
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName, "", "", ""]);
            sinon_1.stub(LeaderboardDAO_1.LeaderboardDAO, "getLeaderboard").returns([]);
            const result = await ColumnController_1.ColumnController.updateLeaderboardColumn(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(ReturnCodes_1.ReturnCodes.LEADERBOARD_NOT_FOUND);
            LeaderboardDAO_1.LeaderboardDAO.getLeaderboard.restore();
        });
        it("should return an error when no leaderboard column is found with that name", async () => {
            const leaderboardName = "leaderboardName";
            const columnName = "columnName";
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName, columnName, "", ""]);
            sinon_1.stub(LeaderboardDAO_1.LeaderboardDAO, "getLeaderboard").returns([leaderboardName]);
            sinon_1.stub(ColumnDAO_1.ColumnDAO, "getLeaderboardColumn").returns([]);
            const result = await ColumnController_1.ColumnController.updateLeaderboardColumn(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(ReturnCodes_1.ReturnCodes.COLUMN_NOT_FOUND);
            LeaderboardDAO_1.LeaderboardDAO.getLeaderboard.restore();
            ColumnDAO_1.ColumnDAO.getLeaderboardColumn.restore();
        });
        it("should return an error when the action is invalid", async () => {
            const leaderboardName = "leaderboardName";
            const columnName = "columnName";
            const action = "invalidAction";
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName, columnName, action, ""]);
            sinon_1.stub(LeaderboardDAO_1.LeaderboardDAO, "getLeaderboard").returns([leaderboardName]);
            sinon_1.stub(ColumnDAO_1.ColumnDAO, "getLeaderboardColumn").returns([columnName]);
            const result = await ColumnController_1.ColumnController.updateLeaderboardColumn(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(ReturnCodes_1.ReturnCodes.INVALID_PARAMETER);
            LeaderboardDAO_1.LeaderboardDAO.getLeaderboard.restore();
            ColumnDAO_1.ColumnDAO.getLeaderboardColumn.restore();
        });
        it("should return an error when the column type is unknown.", async () => {
            const leaderboardName = "leaderboardName";
            const columnName = "columnName";
            const action = "TYPE";
            const value = "NOTATYPE";
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName, columnName, action, value]);
            sinon_1.stub(LeaderboardDAO_1.LeaderboardDAO, "getLeaderboard").returns([leaderboardName]);
            sinon_1.stub(ColumnDAO_1.ColumnDAO, "getLeaderboardColumn").returns([columnName]);
            const result = await ColumnController_1.ColumnController.updateLeaderboardColumn(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(ReturnCodes_1.ReturnCodes.BAD_PARAMETER_TYPE);
            LeaderboardDAO_1.LeaderboardDAO.getLeaderboard.restore();
            ColumnDAO_1.ColumnDAO.getLeaderboardColumn.restore();
        });
        it("should return true when the Type is updated", async () => {
            const leaderboardName = "leaderboardName";
            const columnName = "columnName";
            const action = "TYPE";
            const value = "DATA";
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName, columnName, action, value]);
            sinon_1.stub(LeaderboardDAO_1.LeaderboardDAO, "getLeaderboard").returns([leaderboardName]);
            sinon_1.stub(ColumnDAO_1.ColumnDAO, "getLeaderboardColumn").returns([columnName]);
            sinon_1.stub(ColumnDAO_1.ColumnDAO, "updateLeaderboardColumnType").returns(true);
            const result = await ColumnController_1.ColumnController.updateLeaderboardColumn(ts_mockito_1.instance(command));
            chai_1.expect(result).to.be.true;
            LeaderboardDAO_1.LeaderboardDAO.getLeaderboard.restore();
            ColumnDAO_1.ColumnDAO.getLeaderboardColumn.restore();
            ColumnDAO_1.ColumnDAO.updateLeaderboardColumnType.restore();
        });
        it("should return true when the Name is updated", async () => {
            const leaderboardName = "leaderboardName";
            const columnName = "columnName";
            const action = "NAME";
            const value = "some text";
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName, columnName, action, value]);
            sinon_1.stub(LeaderboardDAO_1.LeaderboardDAO, "getLeaderboard").returns([leaderboardName]);
            sinon_1.stub(ColumnDAO_1.ColumnDAO, "getLeaderboardColumn").returns([columnName]);
            sinon_1.stub(ColumnDAO_1.ColumnDAO, "updateLeaderboardColumnName").returns(true);
            const result = await ColumnController_1.ColumnController.updateLeaderboardColumn(ts_mockito_1.instance(command));
            chai_1.expect(result).to.be.true;
            LeaderboardDAO_1.LeaderboardDAO.getLeaderboard.restore();
            ColumnDAO_1.ColumnDAO.getLeaderboardColumn.restore();
            ColumnDAO_1.ColumnDAO.updateLeaderboardColumnName.restore();
        });
    });
    describe("deleteLeaderboardColumn()", () => {
        it("should check for less than 2 arguments.", async () => {
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([]);
            const result = await ColumnController_1.ColumnController.deleteLeaderboardColumn(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(ReturnCodes_1.ReturnCodes.INCORRECT_PARAM_LENGTH);
        });
        it("should check for more than 2 arguments.", async () => {
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn(["", "", ""]);
            const result = await ColumnController_1.ColumnController.deleteLeaderboardColumn(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(ReturnCodes_1.ReturnCodes.INCORRECT_PARAM_LENGTH);
        });
        it("should return an error when no leaderboard is found with that name.", async () => {
            const leaderboardName = "leaderboardName";
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName, ""]);
            sinon_1.stub(LeaderboardDAO_1.LeaderboardDAO, "getLeaderboard").returns([]);
            const result = await ColumnController_1.ColumnController.deleteLeaderboardColumn(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(ReturnCodes_1.ReturnCodes.LEADERBOARD_NOT_FOUND);
            LeaderboardDAO_1.LeaderboardDAO.getLeaderboard.restore();
        });
        it("should return an error when no leaderboard column is found with that name.", async () => {
            const leaderboardName = "leaderboardName";
            const columnName = "columnName";
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName, columnName]);
            sinon_1.stub(LeaderboardDAO_1.LeaderboardDAO, "getLeaderboard").returns([leaderboardName]);
            sinon_1.stub(ColumnDAO_1.ColumnDAO, "getLeaderboardColumn").returns([]);
            const result = await ColumnController_1.ColumnController.deleteLeaderboardColumn(ts_mockito_1.instance(command));
            chai_1.expect(result).to.equal(ReturnCodes_1.ReturnCodes.COLUMN_NOT_FOUND);
            LeaderboardDAO_1.LeaderboardDAO.getLeaderboard.restore();
            ColumnDAO_1.ColumnDAO.getLeaderboardColumn.restore();
        });
        it("should return true when the leaderboard column is deleted.", async () => {
            const leaderboardName = "leaderboardName";
            const columnName = "columnName";
            const command = ts_mockito_1.mock(command_1.Command);
            ts_mockito_1.when(command.arguments).thenReturn([leaderboardName, columnName]);
            sinon_1.stub(LeaderboardDAO_1.LeaderboardDAO, "getLeaderboard").returns([leaderboardName]);
            sinon_1.stub(ColumnDAO_1.ColumnDAO, "getLeaderboardColumn").returns([columnName]);
            const result = await ColumnController_1.ColumnController.deleteLeaderboardColumn(ts_mockito_1.instance(command));
            chai_1.expect(result).to.be.true;
            LeaderboardDAO_1.LeaderboardDAO.getLeaderboard.restore();
            ColumnDAO_1.ColumnDAO.getLeaderboardColumn.restore();
        });
    });
});
//# sourceMappingURL=ColumnController.spec.js.map