import { Pool, Query } from "pg";
import { createClient } from 'redis';

const pool = new Pool({
  user: process.env.PGUSER ||  "postgres",
  password: process.env.PGPASSWORD || "postgres",
  host: process.env.PGHOST || "localhost",
  port: Number(process.env.PGPORT) || 5432,
  database: process.env.PGDATABASE || "posts",
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

pool.on('error', (error, client) => {
  console.error('ERROR:PG', error);  
});

export const query = (text: string, param: any[] = []) => {
  return pool.query(text, param);
};

export const getClient = async () => {
  const client: any = await pool.connect();
  const query = client.query;
  const release = client.release;
  // set a timeout of 5 seconds, after which we will log this client's last query
  const timeout = setTimeout(() => {
    console.error("A client has been checked out for more than 5 seconds!");
    console.error(
      `The last executed query on this client was: ${client.lastQuery}`
    );
  }, 5000);
  // monkey patch the query method to keep track of the last query executed
  client.query = (...args: [string, any[]]) => {
    client.lastQuery = args;
    return query.apply(client, args);
  };
  client.release = () => {
    // clear our timeout
    clearTimeout(timeout);
    // set the methods back to their old un-monkey-patched version
    client.query = query;
    client.release = release;
    return release.apply(client);
  };
  return client;
};


const redisClient = createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  retry_strategy: function(options) {
    return 1000;
  }
});

redisClient.on('error', err => console.log('Redis Client Error', err))