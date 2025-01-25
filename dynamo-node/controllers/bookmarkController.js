import { saveData, queryData, deleteData as deleteDataModel, queryDataByUserId } from '../models/model.js';
import config from '../config/config.js';
import { v4 as uuidv4 } from 'uuid';

export const createBookmark = async (req, res) => {
  const { title, url } = req.body;

  if (!title || !url) {
    return res.status(400).send('Title and URL are required');
  }

  const params = {
    TableName: config.tableName,
    Item: {
      id: uuidv4(),
      title,
      url
    }
  };

  const result = await saveData(params);
  res.status(result.status).send(result.message);
};

export const listBookmarks = async (req, res) => {
  const params = {
    TableName: config.tableName,
    Limit: 10
  };

  if (req.query.lastKey) {
    params.ExclusiveStartKey = JSON.parse(req.query.lastKey);
  }

  const result = await queryData(params);
  if (result.status === 200) {
    res.status(result.status).json(result.data);
  } else {
    res.status(result.status).send(result.message);
  }
};

export const deleteBookmark = async (req, res) => {
  const params = {
    TableName: config.tableName,
    Key: {
      id: req.body.id
    }
  };

  const result = await deleteDataModel(params);
  res.status(result.status).send(result.message);
};

export const getBookmarksByUserId = async (req, res) => {
  const params = {
    TableName: config.tableName,
    IndexName: 'authorId-index', // Assuming you have a secondary index on authorId
    KeyConditionExpression: 'authorId = :authorId',
    ExpressionAttributeValues: {
      ':authorId': req.params.userId
    }
  };

  const result = await queryDataByUserId(params);
  if (result.status === 200) {
    res.status(result.status).json(result.data);
  } else {
    res.status(result.status).send(result.message);
  }
};
