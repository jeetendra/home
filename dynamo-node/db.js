import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({
  region: 'us-west-2',
  endpoint: 'http://localhost:9000' // Point to local DynamoDB instance
});
const ddbDocClient = DynamoDBDocumentClient.from(client);

export { ddbDocClient };
