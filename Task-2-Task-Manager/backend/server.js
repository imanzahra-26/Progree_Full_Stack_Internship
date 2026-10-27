const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});

// ===== CRUD ROUTES =====

// 1. READ (Get all tasks)
app.get('/api/tasks', (req, res) => {
  db.query('SELECT * FROM tasks ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// 2. CREATE (Add a new task)
app.post('/api/tasks', (req, res) => {
  const { text } = req.body;
  db.query('INSERT INTO tasks (text) VALUES (?)', [text], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, text, completed: 0 });
  });
});

// 3. UPDATE (Edit text or toggle complete)
app.put('/api/tasks/:id', (req, res) => {
  const { text, completed } = req.body;
  db.query(
    'UPDATE tasks SET text = COALESCE(?, text), completed = COALESCE(?, completed) WHERE id = ?',
    [text, completed, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Task updated' });
    }
  );
});

// 4. DELETE (Remove a task)
app.delete('/api/tasks/:id', (req, res) => {
  db.query('DELETE FROM tasks WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Task deleted' });
  });
});

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Backend running on http://localhost:${process.env.PORT}`);
});