import { Pool, Query } from "pg";

const pool = new Pool({
  user: "postgres",
  database: "posts",
  password: "postgres",
  port: 5432,
  host: "localhost",
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

export const query = (text: string, param: any[] = []) => {
  return pool.query(text, param);
};
