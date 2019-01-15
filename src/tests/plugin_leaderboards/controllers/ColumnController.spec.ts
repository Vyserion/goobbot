// import "mocha";
// import { expect } from "chai";
// import { mock, instance, when } from "ts-mockito";
// import { LeaderboardDAO } from "../../../plugin_leaderboards/dao/LeaderboardDAO";
// import { ColumnDAO } from "../../../plugin_leaderboards/dao/ColumnDAO";
// import { ColumnController } from "../../../plugin_leaderboards/controllers/ColumnController";
// import { ReturnCodes } from "../../../plugin_leaderboards/config/ReturnCodes";
// import { Command } from "../../../core/typings";
// import { stub } from "sinon";

// describe("ColumnController ::", () => {
// 	describe("insertLeaderboardColumn()", () => {
// 		it("should check for less than 2 arguments.", async () => {
// 			const zeroCommand: Command = mock(Command);
// 			when(zeroCommand.arguments).thenReturn([]);

// 			const zeroResult = await ColumnController.insertLeaderboardColumn(instance(zeroCommand));
// 			expect(zeroResult).to.equal(ReturnCodes.INCORRECT_PARAM_LENGTH);

// 			const oneCommand: Command = mock(Command);
// 			when(oneCommand.arguments).thenReturn(["1"]);

// 			const oneResult = await ColumnController.insertLeaderboardColumn(instance(oneCommand));
// 			expect(oneResult).to.equal(ReturnCodes.INCORRECT_PARAM_LENGTH);
// 		});

// 		it("should check for more than 3 arguments.", async () => {
// 			const command: Command = mock(Command);
// 			when(command.arguments).thenReturn(["1", "2", "3", "4"]);

// 			const result = await ColumnController.insertLeaderboardColumn(instance(command));
// 			expect(result).to.equal(ReturnCodes.INCORRECT_PARAM_LENGTH);
// 		});

// 		it("should return an error when no leaderboard is found with that id.", async () => {
// 			const leaderboardName: string = "leaderboardName";

// 			const command: Command = mock(Command);
// 			when(command.arguments).thenReturn([leaderboardName, ""]);

// 			stub(LeaderboardDAO, "getLeaderboard").returns([]);

// 			const result = await ColumnController.insertLeaderboardColumn(instance(command));
// 			expect(result).to.equal(ReturnCodes.LEADERBOARD_NOT_FOUND);

// 			(LeaderboardDAO.getLeaderboard as any).restore();
// 		});

// 		it("should return an error when a column is found with the same name.", async () => {
// 			const leaderboardName: string = "leaderboardName";
// 			const leaderboardId: number = 1;
// 			const columnName: string = "columnName";

// 			const command: Command = mock(Command);
// 			when(command.arguments).thenReturn([leaderboardName, columnName]);

// 			stub(LeaderboardDAO, "getLeaderboard").returns([{ id: leaderboardId }]);
// 			stub(ColumnDAO, "getLeaderboardColumn").returns([columnName]);

// 			const result = await ColumnController.insertLeaderboardColumn(instance(command));
// 			expect(result).to.equal(ReturnCodes.LEADERBOARD_DUPLICATE_NAME);

// 			(LeaderboardDAO.getLeaderboard as any).restore();
// 			(ColumnDAO.getLeaderboardColumn as any).restore();
// 		});

// 		it(`should return an error when the provided type isn't known`, async () => {
// 			const leaderboardName: string = "leaderboardName";
// 			const leaderboardId: number = 1;
// 			const columnName: string = "columnName";
// 			const columnType: string = "not a column type";

// 			const command: Command = mock(Command);
// 			when(command.arguments).thenReturn([leaderboardName, columnName, columnType]);

// 			stub(LeaderboardDAO, "getLeaderboard").returns([{ id: leaderboardId }]);
// 			stub(ColumnDAO, "getLeaderboardColumn").returns([]);

// 			const result = await ColumnController.insertLeaderboardColumn(instance(command));
// 			expect(result).to.equal(ReturnCodes.BAD_PARAMETER_TYPE);

// 			(LeaderboardDAO.getLeaderboard as any).restore();
// 			(ColumnDAO.getLeaderboardColumn as any).restore();
// 		});

// 		it("should return true when the leaderboard column is inserted correctly.", async () => {
// 			const leaderboardName: string = "leaderboardName";
// 			const leaderboardId: number = 1;
// 			const columnName: string = "columnName";

// 			const command: Command = mock(Command);
// 			when(command.arguments).thenReturn([leaderboardName, columnName]);

// 			stub(LeaderboardDAO, "getLeaderboard").returns([{ id: leaderboardId }]);
// 			stub(ColumnDAO, "getLeaderboardColumn").returns([]);
// 			stub(ColumnDAO, "insertLeaderboardColumn");

// 			const result = await ColumnController.insertLeaderboardColumn(instance(command));
// 			expect(result).to.be.true;

// 			(LeaderboardDAO.getLeaderboard as any).restore();
// 			(ColumnDAO.getLeaderboardColumn as any).restore();
// 			(ColumnDAO.insertLeaderboardColumn as any).restore();
// 		});

// 		it("should return true when the leaderboard column is inserted correctly with a known type.", async () => {
// 			const leaderboardName: string = "leaderboardName";
// 			const leaderboardId: number = 1;
// 			const columnName: string = "columnName";
// 			const columnType: string = "data";

// 			const command: Command = mock(Command);
// 			when(command.arguments).thenReturn([leaderboardName, columnName, columnType]);

// 			stub(LeaderboardDAO, "getLeaderboard").returns([{ id: leaderboardId }]);
// 			stub(ColumnDAO, "getLeaderboardColumn").returns([]);
// 			stub(ColumnDAO, "insertLeaderboardColumn");

// 			const result = await ColumnController.insertLeaderboardColumn(instance(command));
// 			expect(result).to.be.true;

// 			(LeaderboardDAO.getLeaderboard as any).restore();
// 			(ColumnDAO.getLeaderboardColumn as any).restore();
// 			(ColumnDAO.insertLeaderboardColumn as any).restore();
// 		});
// 	});

// 	describe("updateLeaderboardColumn()", () => {
// 		it("should check for less than 4 arguments", async () => {
// 			const command: Command = mock(Command);
// 			when(command.arguments).thenReturn([]);

// 			const result = await ColumnController.updateLeaderboardColumn(instance(command));
// 			expect(result).to.equal(ReturnCodes.INCORRECT_PARAM_LENGTH);
// 		});

// 		it("should check for more than 4 arguments", async () => {
// 			const command: Command = mock(Command);
// 			when(command.arguments).thenReturn(["", "", "", "", ""]);

// 			const result = await ColumnController.updateLeaderboardColumn(instance(command));
// 			expect(result).to.equal(ReturnCodes.INCORRECT_PARAM_LENGTH);
// 		});

// 		it("should return an error when no leaderboard is found with that name", async () => {
// 			const leaderboardName: string = "leaderboardName";

// 			const command: Command = mock(Command);
// 			when(command.arguments).thenReturn([leaderboardName, "", "", ""]);

// 			stub(LeaderboardDAO, "getLeaderboard").returns([]);

// 			const result = await ColumnController.updateLeaderboardColumn(instance(command));
// 			expect(result).to.equal(ReturnCodes.LEADERBOARD_NOT_FOUND);

// 			(LeaderboardDAO.getLeaderboard as any).restore();
// 		});

// 		it("should return an error when no leaderboard column is found with that name", async () => {
// 			const leaderboardName: string = "leaderboardName";
// 			const columnName: string = "columnName";

// 			const command: Command = mock(Command);
// 			when(command.arguments).thenReturn([leaderboardName, columnName, "", ""]);

// 			stub(LeaderboardDAO, "getLeaderboard").returns([leaderboardName]);
// 			stub(ColumnDAO, "getLeaderboardColumn").returns([]);

// 			const result = await ColumnController.updateLeaderboardColumn(instance(command));
// 			expect(result).to.equal(ReturnCodes.COLUMN_NOT_FOUND);

// 			(LeaderboardDAO.getLeaderboard as any).restore();
// 			(ColumnDAO.getLeaderboardColumn as any).restore();
// 		});

// 		it("should return an error when the action is invalid", async () => {
// 			const leaderboardName: string = "leaderboardName";
// 			const columnName: string = "columnName";
// 			const action: string = "invalidAction";

// 			const command: Command = mock(Command);
// 			when(command.arguments).thenReturn([leaderboardName, columnName, action, ""]);

// 			stub(LeaderboardDAO, "getLeaderboard").returns([leaderboardName]);
// 			stub(ColumnDAO, "getLeaderboardColumn").returns([columnName]);

// 			const result = await ColumnController.updateLeaderboardColumn(instance(command));
// 			expect(result).to.equal(ReturnCodes.INVALID_PARAMETER);

// 			(LeaderboardDAO.getLeaderboard as any).restore();
// 			(ColumnDAO.getLeaderboardColumn as any).restore();
// 		});

// 		it("should return an error when the column type is unknown.", async () => {
// 			const leaderboardName: string = "leaderboardName";
// 			const columnName: string = "columnName";
// 			const action: string = "TYPE";
// 			const value: string = "NOTATYPE";

// 			const command: Command = mock(Command);
// 			when(command.arguments).thenReturn([leaderboardName, columnName, action, value]);

// 			stub(LeaderboardDAO, "getLeaderboard").returns([leaderboardName]);
// 			stub(ColumnDAO, "getLeaderboardColumn").returns([columnName]);

// 			const result = await ColumnController.updateLeaderboardColumn(instance(command));
// 			expect(result).to.equal(ReturnCodes.BAD_PARAMETER_TYPE);

// 			(LeaderboardDAO.getLeaderboard as any).restore();
// 			(ColumnDAO.getLeaderboardColumn as any).restore();
// 		});

// 		it("should return true when the Type is updated", async () => {
// 			const leaderboardName: string = "leaderboardName";
// 			const columnName: string = "columnName";
// 			const action: string = "TYPE";
// 			const value: string = "DATA";

// 			const command: Command = mock(Command);
// 			when(command.arguments).thenReturn([leaderboardName, columnName, action, value]);

// 			stub(LeaderboardDAO, "getLeaderboard").returns([leaderboardName]);
// 			stub(ColumnDAO, "getLeaderboardColumn").returns([columnName]);
// 			stub(ColumnDAO, "updateLeaderboardColumnType").returns(true);

// 			const result = await ColumnController.updateLeaderboardColumn(instance(command));
// 			expect(result).to.be.true;

// 			(LeaderboardDAO.getLeaderboard as any).restore();
// 			(ColumnDAO.getLeaderboardColumn as any).restore();
// 			(ColumnDAO.updateLeaderboardColumnType as any).restore();
// 		});

// 		it("should return true when the Name is updated", async () => {
// 			const leaderboardName: string = "leaderboardName";
// 			const columnName: string = "columnName";
// 			const action: string = "NAME";
// 			const value: string = "some text";

// 			const command: Command = mock(Command);
// 			when(command.arguments).thenReturn([leaderboardName, columnName, action, value]);

// 			stub(LeaderboardDAO, "getLeaderboard").returns([leaderboardName]);
// 			stub(ColumnDAO, "getLeaderboardColumn").returns([columnName]);
// 			stub(ColumnDAO, "updateLeaderboardColumnName").returns(true);

// 			const result = await ColumnController.updateLeaderboardColumn(instance(command));
// 			expect(result).to.be.true;

// 			(LeaderboardDAO.getLeaderboard as any).restore();
// 			(ColumnDAO.getLeaderboardColumn as any).restore();
// 			(ColumnDAO.updateLeaderboardColumnName as any).restore();
// 		});
// 	});

// 	describe("deleteLeaderboardColumn()", () => {
// 		it("should check for less than 2 arguments.", async () => {
// 			const command: Command = mock(Command);
// 			when(command.arguments).thenReturn([]);

// 			const result = await ColumnController.deleteLeaderboardColumn(instance(command));
// 			expect(result).to.equal(ReturnCodes.INCORRECT_PARAM_LENGTH);
// 		});

// 		it("should check for more than 2 arguments.", async () => {
// 			const command: Command = mock(Command);
// 			when(command.arguments).thenReturn(["", "", ""]);

// 			const result = await ColumnController.deleteLeaderboardColumn(instance(command));
// 			expect(result).to.equal(ReturnCodes.INCORRECT_PARAM_LENGTH);
// 		});

// 		it("should return an error when no leaderboard is found with that name.", async () => {
// 			const leaderboardName: string = "leaderboardName";

// 			const command: Command = mock(Command);
// 			when(command.arguments).thenReturn([leaderboardName, ""]);

// 			stub(LeaderboardDAO, "getLeaderboard").returns([]);

// 			const result = await ColumnController.deleteLeaderboardColumn(instance(command));
// 			expect(result).to.equal(ReturnCodes.LEADERBOARD_NOT_FOUND);

// 			(LeaderboardDAO.getLeaderboard as any).restore();
// 		});

// 		it("should return an error when no leaderboard column is found with that name.", async () => {
// 			const leaderboardName: string = "leaderboardName";
// 			const columnName: string = "columnName";

// 			const command: Command = mock(Command);
// 			when(command.arguments).thenReturn([leaderboardName, columnName]);

// 			stub(LeaderboardDAO, "getLeaderboard").returns([leaderboardName]);
// 			stub(ColumnDAO, "getLeaderboardColumn").returns([]);

// 			const result = await ColumnController.deleteLeaderboardColumn(instance(command));
// 			expect(result).to.equal(ReturnCodes.COLUMN_NOT_FOUND);

// 			(LeaderboardDAO.getLeaderboard as any).restore();
// 			(ColumnDAO.getLeaderboardColumn as any).restore();
// 		});

// 		it("should return true when the leaderboard column is deleted.", async () => {
// 			const leaderboardName: string = "leaderboardName";
// 			const columnName: string = "columnName";

// 			const command: Command = mock(Command);
// 			when(command.arguments).thenReturn([leaderboardName, columnName]);

// 			stub(LeaderboardDAO, "getLeaderboard").returns([leaderboardName]);
// 			stub(ColumnDAO, "getLeaderboardColumn").returns([columnName]);

// 			const result = await ColumnController.deleteLeaderboardColumn(instance(command));
// 			expect(result).to.be.true;

// 			(LeaderboardDAO.getLeaderboard as any).restore();
// 			(ColumnDAO.getLeaderboardColumn as any).restore();
// 		});
// 	});
// });
