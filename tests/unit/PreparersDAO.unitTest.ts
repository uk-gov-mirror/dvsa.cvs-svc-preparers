import AWS from "aws-sdk";
import {expect} from "chai";
import PreparerDAO from "../../src/models/PreparersDAO";
import sinon, {SinonStub} from "sinon";
import HTTPError from "../../src/models/HTTPError";
const sandbox = sinon.createSandbox();

describe("Preparers DAO", () => {
    context("getAll", () => {
        beforeEach(() => {jest.resetModules(); });
        afterEach(() => {sandbox.restore(); });

        it("returns data on successful query", async () => {
            mockDocumentClientWithReturn("scan", "success");
            const dao = new PreparerDAO();
            const output = await dao.getAll();
            expect(output).to.equal("success");
        });

        it("returns error on failed query", async () => {
            const myError = new HTTPError(418, "It broke");
            mockDocumentClientWithReturn("scan", myError);
            const dao = new PreparerDAO();
            const output = await dao.getAll();
            expect(output).to.equal(myError);
        });
    });

    context("createMultiple", () => {
        beforeEach(() => {jest.resetModules(); });
        afterEach(() => {sandbox.restore(); });

        it("builds correct query and returns data on successful query", async () => {
            const stub = mockDocumentClientWithReturn("batchWrite", "success");
            const expectedParams = [{
                PutRequest:
                    {
                        Item: {item: "testItem"}
                    }
            }];
            const dao = new PreparerDAO();
            const output = await dao.createMultiple([{item: "testItem"}]);
            expect(output).to.equal("success");
            expect(getRequestItemsBodyFromStub(stub)).to.deep.equal(expectedParams);
        });

        it("returns error on failed query", async () => {
            const myError = new HTTPError(418, "It broke");
            mockDocumentClientWithReject("batchWrite", myError);
            const dao = new PreparerDAO();
            try {
                const output = await dao.createMultiple(["testItem"]);
                expect.fail();
            } catch (err) {
                expect(err).to.equal(myError);
            }
        });
    });

    context("deleteMultiple", () => {
        beforeEach(() => {jest.resetModules(); });
        afterEach(() => {sandbox.restore(); });

        it("builds correct query and returns data on successful query", async () => {
            const stub = mockDocumentClientWithReturn("batchWrite", "success");
            const expectedParams = [{
                DeleteRequest:
                    {
                        Key:
                            {
                                preparerId: "testItem"
                            }
                    }
            }];
            const dao = new PreparerDAO();
            const output = await dao.deleteMultiple(["testItem"]);
            expect(output).to.equal("success");
            expect(getRequestItemsBodyFromStub(stub)).to.deep.equal(expectedParams);
        });

        it("returns error on failed query", async () => {
            const myError = new HTTPError(418, "It broke");
            mockDocumentClientWithReject("batchWrite", myError);
            const dao = new PreparerDAO();
            try {
                const output = await dao.deleteMultiple(["testItem"]);
                expect.fail();
            } catch (err) {
                expect(err).to.equal(myError);
            }
        });
    });
});

const getRequestItemsBodyFromStub = (input: SinonStub) => {
    const requestItems = input.args[0][0].RequestItems;
    const table = Object.keys(requestItems)[0];
    return requestItems[table];
};

function mockDocumentClientWithReturn(method: "batchWrite" | "scan", retVal: any) {
    const myStub = sinon.stub().callsFake(() => {
        return {
            promise: sinon.fake.resolves(retVal)
        };
    });
    sandbox.replace(AWS.DynamoDB.DocumentClient.prototype, method, myStub);
    return myStub;
}
function mockDocumentClientWithReject(method: "batchWrite" | "scan", retVal: any) {
    const myStub = sinon.stub().callsFake(() => {
        return {
            promise: sinon.fake.rejects(retVal)
        };
    });
    sandbox.replace(AWS.DynamoDB.DocumentClient.prototype, method, myStub);
    return myStub;
}
