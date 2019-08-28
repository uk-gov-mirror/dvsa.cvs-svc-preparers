/* workaround AWSXRay.captureAWS(...) call obscures types provided by the AWS sdk.
https://github.com/aws/aws-xray-sdk-node/issues/14
*/
/* tslint:disable */
const AWSXRay = require("aws-xray-sdk");
const AWS = AWSXRay.captureAWS(require("aws-sdk"));
/* tslint:enable */
import { IDBConfig } from ".";
import { Configuration } from "../utils/Configuration";
import { DocumentClient } from "aws-sdk/lib/dynamodb/document_client";

class PreparersDAO {
  private tableName: string;
  private static docClient: DocumentClient;

  constructor() {
    const config: IDBConfig = Configuration.getInstance().getDynamoDBConfig();
    this.tableName = config.table;
    if (!PreparersDAO.docClient) {
      PreparersDAO.docClient = new AWS.DynamoDB.DocumentClient(config.params);
    }  }

  public getAll() {
    return PreparersDAO.docClient.scan({ TableName: this.tableName }).promise();
  }

  public createMultiple(preparerItems: any[]) {
    const params = this.generatePartialParams();

    preparerItems.forEach((preparerItem: any) => {
      params.RequestItems[this.tableName].push(
        {
          PutRequest:
            {
              Item: preparerItem
            }
        });
    });

    return PreparersDAO.docClient.batchWrite(params).promise();
  }

  public deleteMultiple(primaryKeysToBeDeleted: string[]) {
    const params = this.generatePartialParams();

    primaryKeysToBeDeleted.forEach((key) => {
      params.RequestItems[this.tableName].push(
        {
          DeleteRequest:
            {
              Key:
                {
                  preparerId: key
                }
            }
        }
      );
    });

    return PreparersDAO.docClient.batchWrite(params).promise();
  }

  public generatePartialParams(): any {
    return {
      RequestItems:
        {
          [this.tableName]: []
        }
    };
  }
}

export default PreparersDAO;
