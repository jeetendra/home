import mysql from 'mysql2/promise';
import BaseDatabase from './base.js';

class MySQLDatabase extends BaseDatabase {
  async getConnection(details) {
    const key = this.getConnectionKey(details);
    if (this.connectionCache.has(key)) {
      this.clearConnectionTimeout(key);
      return this.connectionCache.get(key);
    }
    const connection = await mysql.createConnection(details);
    this.connectionCache.set(key, connection);
    console.log('Connection stored in cache:', key);
    return connection;
  }

  async closeConnection(connection) {
    await connection.end();
  }

  async executeQuery(connection, query) {
    try {
      console.log('Executing MySQL query:', query);
      const [rows] = await connection.execute(query);
      return rows;
    } catch (error) {
      console.error('Error executing MySQL query:', query, error);
      throw new Error(`Failed to execute query: ${error.message}`);
    }
  }
}

export default new MySQLDatabase();
