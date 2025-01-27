class BaseDatabase {
  constructor() {
    this.connectionCache = new Map();
    this.connectionTimeouts = new Map();
  }

  getConnectionKey({ host, port, user, database }) {
    return `${host}:${port}:${user}:${database}`;
  }

  setConnectionTimeout(key, closeConnection) {
    const timeout = setTimeout(async () => {
      const connection = this.connectionCache.get(key);
      if (connection) {
        await closeConnection(connection);
        this.connectionCache.delete(key);
        this.connectionTimeouts.delete(key);
        console.log(`Connection ${key} closed due to inactivity.`);
      }
    }, 10 * 60 * 1000); // 10 minutes
    this.connectionTimeouts.set(key, timeout);
  }

  clearConnectionTimeout(key) {
    if (this.connectionTimeouts.has(key)) {
      clearTimeout(this.connectionTimeouts.get(key));
      this.connectionTimeouts.delete(key);
    }
  }
}

export default BaseDatabase;
