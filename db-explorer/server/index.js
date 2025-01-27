import express from 'express';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  credentials: true // Allow credentials (cookies) to be sent
}));
app.use(express.json());
app.use(session({
  secret: 'your-secret-key', // Replace with a secure key
  resave: false,
  saveUninitialized: false, // Change to false to avoid saving uninitialized sessions
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/sessions' }), // Replace with your MongoDB connection string
  cookie: { secure: false, httpOnly: true, sameSite: 'lax' } // Set to true if using HTTPS
}));

const dbModules = {
  mysql: './db/mysql.js',
  postgres: './db/postgres.js',
  mongodb: './db/mongodb.js'
};

async function loadDbModule(dbType) {
  if (!dbModules[dbType]) {
    throw new Error(`Unsupported database type: ${dbType}`);
  }
  return import(dbModules[dbType]);
}

app.post('/connect', async (req, res) => {
  const { dbType, host, port, user, password, database } = req.body;
  try {
    const dbModule = await loadDbModule(dbType);
    const connection = await dbModule.default.getConnection({ host, port: parseInt(port), user, password, database });
    req.session.connectionDetails = { host, port, user, password, database };
    req.session.dbType = dbType;
    console.log('Saving session:', req.session);
    req.session.save((err) => {
      if (err) {
        console.error('Error saving session:', err);
        return res.status(500).send('Failed to save session');
      }
      dbModule.default.setConnectionTimeout(dbModule.default.getConnectionKey(req.session.connectionDetails), dbModule.default.closeConnection);
      console.log('Connection stored in cache:', dbModule.default.connectionCache.has(dbModule.default.getConnectionKey(req.session.connectionDetails)));
      res.status(200).send('Connected to database');
    });
  } catch (error) {
    console.error('Error connecting to database:', error);
    res.status(500).send('Failed to connect to database');
  }
});

app.get('/check-connection', (req, res) => {
  const isConnected = !!req.session.connectionDetails && !!req.session.dbType;
  res.status(200).json({ isConnected });
});

app.post('/query', async (req, res) => {
  console.log('Session data:', req.session);
  const { query } = req.body;
  if (!req.session.connectionDetails || !req.session.dbType) {
    return res.status(500).send('Not connected to database');
  }
  try {
    console.log('Executing query:', query);
    const dbModule = await loadDbModule(req.session.dbType);
    let connection = dbModule.default.connectionCache.get(dbModule.default.getConnectionKey(req.session.connectionDetails));
    if (!connection) {
      console.log('Connection not found in cache, creating a new connection');
      connection = await dbModule.default.getConnection(req.session.connectionDetails);
    }
    console.log('Connection retrieved from cache:', connection);
    const result = await dbModule.default.executeQuery(connection, query);
    dbModule.default.setConnectionTimeout(dbModule.default.getConnectionKey(req.session.connectionDetails), dbModule.default.closeConnection);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error running query:', query, error);
    res.status(500).send('Failed to run query');
  }
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).send('Internal server error');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
