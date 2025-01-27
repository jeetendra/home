import { Client } from 'pg';
import BaseDatabase from './base.js';

class PostgresDatabase extends BaseDatabase {
  async getConnection(details) {
    const key = this.getConnectionKey(details);
    if (this.connectionCache.has(key)) {
      this.clearConnectionTimeout(key);
      return this.connectionCache.get(key);
    }
    const client = new Client(details);
    await client.connect();
    this.connectionCache.set(key, client);
    return client;
  }

  async closeConnection(connection) {
    await connection.end();
  }

  async executeQuery(connection, query) {
    try {
      console.log('Executing PostgreSQL query:', query);
      const result = await connection.query(query);
      return result.rows;
    } catch (error) {
      console.error('Error executing PostgreSQL query:', query, error);
      throw new Error(`Failed to execute query: ${error.message}`);
    }
  }
}

export default new PostgresDatabase();
