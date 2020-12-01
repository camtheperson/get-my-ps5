const {getGuid} = require("./index");
const axios = require("axios");

jest.mock('axios');

describe("getGuid", () => {
    it("resolves to guid", async () => {
        const guid = "20ef1214-4105-4187-8791-1dc1808e86c2";

        axios.post.mockResolvedValue({
            data: {
                guid
            }
        });
      
        const result = await getGuid();
        expect(result).toEqual(guid);
      });
});