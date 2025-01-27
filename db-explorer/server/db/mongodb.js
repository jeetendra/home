import { MongoClient } from 'mongodb';
import BaseDatabase from './base.js';

class MongoDBDatabase extends BaseDatabase {
  async getConnection(details) {
    const key = this.getConnectionKey(details);
    if (this.connectionCache.has(key)) {
      this.clearConnectionTimeout(key);
      return this.connectionCache.get(key);
    }
    const client = new MongoClient(`mongodb://${details.host}:${details.port}`, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db(details.database);
    this.connectionCache.set(key, db);
    return db;
  }

  async closeConnection(connection) {
    await connection.client.close();
  }

  async executeQuery(connection, query) {
    try {
      console.log('Executing MongoDB query:', query);
      const result = await eval(`connection.${query}`);
      return result;
    } catch (error) {
      console.error('Error executing MongoDB query:', query, error);
      throw new Error(`Failed to execute query: ${error.message}`);
    }
  }
}

export default new MongoDBDatabase();
