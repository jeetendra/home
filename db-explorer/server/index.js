import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let connection;

app.post('/connect', async (req, res) => {
  const { host, port, user, password, database } = req.body;
  try {
    connection = await mysql.createConnection({
      host,
      port: parseInt(port),
      user,
      password,
      database
    });
    res.status(200).send('Connected to database');
  } catch (error) {
    res.status(500).send('Failed to connect to database');
  }
});

app.post('/query', async (req, res) => {
  const { query } = req.body;
  if (!connection) {
    return res.status(500).send('Not connected to database');
  }
  try {
    const [rows] = await connection.execute(query);
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
