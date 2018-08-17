import "mocha";
import { expect } from "chai";
import { mock, instance, when } from "ts-mockito";
import { stub } from "sinon";
import { DataManager } from "../../../core/dataManager";
import { ColumnDAO } from "../../../plugin_leaderboards/dao/ColumnDAO";

describe("ColumnDAO ::", () => {
	beforeEach(() => {
		stub(DataManager, "query").returns(true);
	});

	afterEach(() => {
		(DataManager.query as any).restore();
	});

	describe("getLeaderboardColumns()", () => {
		it("should query for leaderboard columns with the correct parameters", async () => {
			const expectedId: number = 1;
			const expectedQuery: string = ` SELECT * FROM leaderboard_columns WHERE leaderboard_id = $1`;

			const result = await ColumnDAO.getLeaderboardColumns(expectedId);
			expect((DataManager.query as any).called).to.be.true;

			const call: any = (DataManager.query as any).getCall(0);
			const query: string = call.args[0];
			expect(query).to.equal(expectedQuery);

			const queryArguments: any[] = call.args[1];
			const id: number = queryArguments[0];
			expect(id).to.equal(expectedId);
		});
	});

	describe("getLeaderboardColumn()", () => {
		it("should query for a leaderboard column with the correct parameters", async () => {
			const expectedId: number = 1;
			const columnName: string = "name";
			const expectedQuery: string = ` SELECT * FROM leaderboard_columns WHERE leaderboard_id = $1 AND name = $2`;

			const result = await ColumnDAO.getLeaderboardColumn(expectedId, columnName);
			expect((DataManager.query as any).called).to.be.true;

			const call: any = (DataManager.query as any).getCall(0);
			const query: string = call.args[0];
			expect(query).to.equal(expectedQuery);

			const queryArguments: any[] = call.args[1];
			const id: number = queryArguments[0];
			expect(id).to.equal(expectedId);
			const name: string = queryArguments[1];
			expect(name).to.equal(columnName);
		});
	});

	describe("insertLeaderboardColumn()", () => {
		it("should insert a leaderboard column with the correct parameters.", async () => {
			const leaderboardId: number = 1;
			const expectedColumnName: string = "columnName";
			const expectedColumnType: string = "col";
			const expectedQuery: string = " INSERT INTO leaderboard_columns VALUES (DEFAULT, $1, $2, $3)";

			const result = await ColumnDAO.insertLeaderboardColumn(
				leaderboardId,
				expectedColumnName,
				expectedColumnType
			);
			expect((DataManager.query as any).called).to.be.true;

			const call: any = (DataManager.query as any).getCall(0);
			const query: string = call.args[0];
			expect(query).to.equal(expectedQuery);

			const queryArguments: any[] = call.args[1];
			const id: number = queryArguments[0];
			expect(id).to.equal(leaderboardId);
			const name: string = queryArguments[1];
			expect(name).to.equal(expectedColumnName);
			const type: string = queryArguments[2];
			expect(type).to.equal(expectedColumnType);
		});
	});

	describe("updateLeaderboardColumnName()", () => {
		it(`should update a leaderboard column's type with the correct parameters.`, async () => {
			const expectedLeaderboardId: number = 123;
			const expectedId: number = 456;
			const expectedNewName: string = "New Name";
			const expectedQuery: string = ` UPDATE leaderboard_columns SET name = ($3) WHERE leaderboard_id = ($1) AND id = ($2)`;

			const result = await ColumnDAO.updateLeaderboardColumnName(
				expectedLeaderboardId,
				expectedId,
				expectedNewName
			);
			expect((DataManager.query as any).called).to.be.true;

			const call: any = (DataManager.query as any).getCall(0);
			const queryArgument: string = call.args[0];
			expect(queryArgument).to.equal(expectedQuery);

			const queryArguments: any[] = call.args[1];
			const leaderboardId: number = queryArguments[0];
			expect(leaderboardId).to.equal(expectedLeaderboardId);

			const columnId: number = queryArguments[1];
			expect(columnId).to.equal(expectedId);

			const name: string = queryArguments[2];
			expect(name).to.equal(expectedNewName);
		});
	});

	describe("updateLeaderboardColumnType()", () => {
		it(`should update a leaderboard column's type with the correct parameters`, async () => {
			const expectedLeaderboardId: number = 123;
			const expectedId: number = 456;
			const expectedType: string = "Type";
			const expectedQuery: string =
				" UPDATE leaderboard_columns SET type = ($3) WHERE leaderboard_id = ($1) AND id = ($2)";

			const result = await ColumnDAO.updateLeaderboardColumnType(expectedLeaderboardId, expectedId, expectedType);
			expect((DataManager.query as any).called).to.be.true;

			const call: any = (DataManager.query as any).getCall(0);
			const queryArgument: string = call.args[0];
			expect(queryArgument).to.equal(expectedQuery);

			const queryArguments: any[] = call.args[1];
			const leaderboardId: number = queryArguments[0];
			expect(leaderboardId).to.equal(expectedLeaderboardId);

			const columnId: number = queryArguments[1];
			expect(columnId).to.equal(expectedId);

			const type: string = queryArguments[2];
			expect(type).to.equal(expectedType);
		});
	});

	describe("deleteLeaderboardColumns()", () => {
		it("should delete leaderboard columns with the correct parameters.", async () => {
			const expectedId: number = 123;
			const expectedQuery: string = ` DELETE FROM leaderboard_columns WHERE leaderboard_id = ($1)`;

			const result = await ColumnDAO.deleteLeaderboardColumns(expectedId);
			expect((DataManager.query as any).called).to.be.true;

			const call: any = (DataManager.query as any).getCall(0);
			let query: string = call.args[0];
			expect(query).to.equal(expectedQuery);

			const queryArguments: any[] = call.args[1];
			const leaderboardId: number = queryArguments[0];
			expect(leaderboardId).to.equal(expectedId);
		});
	});

	describe("deleteLeaderboardColumn()", () => {
		it("should delete a leaderboard column with the correct parameters.", async () => {
			const expectedLeaderboardId: number = 123;
			const expectedId: number = 456;
			const expectedQuery: string = ` DELETE FROM leaderboard_columns WHERE leaderboard_id = ($1) AND id = ($2)`;

			const result = await ColumnDAO.deleteLeaderboardColumn(expectedLeaderboardId, expectedId);
			expect((DataManager.query as any).called).to.be.true;

			const call: any = (DataManager.query as any).getCall(0);
			let query: string = call.args[0];
			expect(query).to.equal(expectedQuery);

			const queryArguments: any[] = call.args[1];
			const leaderboardId: number = queryArguments[0];
			expect(leaderboardId).to.equal(expectedLeaderboardId);

			const columnId: number = queryArguments[1];
			expect(columnId).to.equal(expectedId);
		});
	});
});
