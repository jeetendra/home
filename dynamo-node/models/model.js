import { ddbDocClient } from '../db.js';
import { PutCommand, ScanCommand, DeleteCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';

export const saveData = async (params) => {
  try {
    console.log('Saving data with params:', params); // Log the params
    await ddbDocClient.send(new PutCommand(params));
    return { status: 200, message: 'Data saved successfully' };
  } catch (error) {
    console.error('Error saving data:', error); // Add detailed error logging
    return { status: 500, message: 'Error saving data', error: error.message };
  }
};

export const queryData = async (params) => {
  try {
    console.log('Querying data with params:', params); // Log the params
    const data = await ddbDocClient.send(new ScanCommand(params));
    console.log('Query data response:', data); // Log the response
    return {
      status: 200,
      data: {
        items: data.Items || [], // Ensure items is an array
        lastKey: data.LastEvaluatedKey ? JSON.stringify(data.LastEvaluatedKey) : null
      }
    };
  } catch (error) {
    console.error('Error querying data:', error); // Add detailed error logging
    return { status: 500, message: 'Error querying data', error: error.message };
  }
};

export const queryDataByUserId = async (params) => {
  try {
    console.log('Querying data by user ID with params:', params); // Log the params
    const data = await ddbDocClient.send(new QueryCommand(params));
    console.log('Query data by user ID response:', data); // Log the response
    return {
      status: 200,
      data: {
        items: data.Items || [], // Ensure items is an array
        lastKey: data.LastEvaluatedKey ? JSON.stringify(data.LastEvaluatedKey) : null
      }
    };
  } catch (error) {
    console.error('Error querying data by user ID:', error); // Add detailed error logging
    return { status: 500, message: 'Error querying data by user ID', error: error.message };
  }
};

export const deleteData = async (params) => {
  try {
    await ddbDocClient.send(new DeleteCommand(params));
    return { status: 200, message: 'Data deleted successfully' };
  } catch (error) {
    console.error('Error deleting data:', error); // Add detailed error logging
    return { status: 500, message: 'Error deleting data', error: error.message };
  }
};
