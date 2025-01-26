import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import session from 'express-session';

const app = express();
app.use(cors());
app.use(express.json());
app.use(session({
  secret: 'your-secret-key', // Replace with a secure key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

const connectionCache = new Map();
const connectionTimeouts = new Map();

function getConnectionKey({ host, port, user, database }) {
  return `${host}:${port}:${user}:${database}`;
}

async function getConnection(details) {
  const key = getConnectionKey(details);
  if (connectionCache.has(key)) {
    clearTimeout(connectionTimeouts.get(key));
    connectionTimeouts.delete(key);
    return connectionCache.get(key);
  }
  const connection = await mysql.createConnection(details);
  connectionCache.set(key, connection);
  return connection;
}

function setConnectionTimeout(key) {
  const timeout = setTimeout(async () => {
    const connection = connectionCache.get(key);
    if (connection) {
      await connection.end();
      connectionCache.delete(key);
      connectionTimeouts.delete(key);
      console.log(`Connection ${key} closed due to inactivity.`);
    }
  }, 10 * 60 * 1000); // 10 minutes
  connectionTimeouts.set(key, timeout);
}

app.post('/connect', async (req, res) => {
  const { host, port, user, password, database } = req.body;
  try {
    const connection = await getConnection({ host, port: parseInt(port), user, password, database });
    req.session.connectionKey = getConnectionKey({ host, port, user, database });
    req.session.save();
    setConnectionTimeout(req.session.connectionKey);
    res.status(200).send('Connected to database');
  } catch (error) {
    res.status(500).send('Failed to connect to database');
  }
});

app.post('/query', async (req, res) => {
  const { query } = req.body;
  if (!req.session.connectionKey) {
    return res.status(500).send('Not connected to database');
  }
  try {
    const connection = connectionCache.get(req.session.connectionKey);
    const [rows] = await connection.execute(query);
    setConnectionTimeout(req.session.connectionKey);
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).send('Failed to run query');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
