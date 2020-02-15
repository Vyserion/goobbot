import * as ListsDAO from "../dao/lists";
import { listExists } from "./validators";
import { TList } from "../typings/lists";

describe("plugins/lists/utils/validators", () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe("listExists", () => {

        it("should return false when the list doesn't exist", async () => {
            jest.spyOn(ListsDAO, "getList").mockReturnValueOnce(Promise.resolve(null));

            const result = await listExists("testName", 1);
            expect(result).toBe(false);
        });

        it("should return true when the list exists", async () => {
            const mockedList: TList = {
                id: 1,
                guild_id: 1,
                name: "mock list",
                values: []
            };
            jest.spyOn(ListsDAO, "getList").mockReturnValueOnce(Promise.resolve(mockedList));

            const result = await listExists("mock list", 1);
            expect(result).toBe(true);
        });
    });
});