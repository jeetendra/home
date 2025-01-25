import { ddbDocClient } from './db.js';
import { CreateTableCommand } from '@aws-sdk/client-dynamodb';
import config from './config/config.js';

const createBookmarksTable = () => {
  const params = {
    TableName: config.tableName,
    AttributeDefinitions: [
      { AttributeName: 'id', AttributeType: 'S' }
    ],
    KeySchema: [
      { AttributeName: 'id', KeyType: 'HASH' }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    }
  };

  return ddbDocClient.send(new CreateTableCommand(params));
};

const createUsersTable = () => {
  const params = {
    TableName: config.userTableName,
    AttributeDefinitions: [
      { AttributeName: 'id', AttributeType: 'S' }
    ],
    KeySchema: [
      { AttributeName: 'id', KeyType: 'HASH' }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    }
  };

  return ddbDocClient.send(new CreateTableCommand(params));
};

const init = async () => {
  try {
    await createBookmarksTable();
    console.log('BookmarksTable created');
  } catch (err) {
    if (err.name === 'ResourceInUseException') {
      console.log('BookmarksTable already exists');
    } else {
      console.error('Error creating BookmarksTable:', err);
    }
  }

  try {
    await createUsersTable();
    console.log('UsersTable created');
  } catch (err) {
    if (err.name === 'ResourceInUseException') {
      console.log('UsersTable already exists');
    } else {
      console.error('Error creating UsersTable:', err);
    }
  }
};

init();
