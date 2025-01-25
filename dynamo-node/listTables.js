import { DynamoDBClient, ListTablesCommand } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({ region: 'us-west-2' });

const listTables = async () => {
  try {
    const data = await client.send(new ListTablesCommand({}));
    console.log('Tables:', data.TableNames);
  } catch (err) {
    console.error('Error listing tables:', err);
  }
};

listTables();
