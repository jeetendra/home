import { saveData, queryData, deleteData as deleteDataModel } from '../models/model.js';
import config from '../config/config.js';
import { v4 as uuidv4 } from 'uuid';

export const createUser = async (req, res) => {
  const params = {
    TableName: config.userTableName,
    Item: {
      id: uuidv4(),
      name: req.body.name,
      email: req.body.email
    }
  };

  const result = await saveData(params);
  res.status(result.status).send(result.message);
};

export const listUsers = async (req, res) => {
  const params = {
    TableName: config.userTableName,
    Limit: 10,
    ExclusiveStartKey: req.query.lastKey ? JSON.parse(req.query.lastKey) : null
  };

  const result = await queryData(params);
  if (result.status === 200) {
    res.status(result.status).json(result.data);
  } else {
    res.status(result.status).send(result.message);
  }
};

export const deleteUser = async (req, res) => {
  const params = {
    TableName: config.userTableName,
    Key: {
      id: req.body.id
    }
  };

  const result = await deleteDataModel(params);
  res.status(result.status).send(result.message);
};
