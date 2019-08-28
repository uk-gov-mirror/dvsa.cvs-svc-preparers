import GetPreparersFunction from "../../src/functions/getPreparers";
import PreparersService from "../../src/services/PreparersService";
import {expect} from "chai";
import HTTPError from "../../src/models/HTTPError";

jest.mock("../../src/services/PreparersService");

describe("getPreparers function", () => {
  context("on successful service call", () => {
    it("should return data from service", async () => {
      const retData = {testData: true};
      PreparersService.prototype.getPreparersList = jest.fn().mockImplementation(() => {
        return Promise.resolve(retData);
      });

      const res = await GetPreparersFunction();
      expect(res.body).to.equal(JSON.stringify(retData));
      expect(res.statusCode).to.equal(200);
    });
  });

  context("on error from service call", () => {
    it("should return data from service", async () => {
      const retData = {testData: true};
      PreparersService.prototype.getPreparersList = jest.fn().mockImplementation(() => {
        return Promise.reject(new HTTPError(418, "It broke"));
      });

      const res = await GetPreparersFunction();
      expect(res.body).to.equal(JSON.stringify("It broke"));
      expect(res.statusCode).to.equal(418);
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
