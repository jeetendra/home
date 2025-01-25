var AWS = require("aws-sdk");

const {v4: uuid} = require("uuid");

var dynamodb = AWS.DynamoDB.DocumentClient();
