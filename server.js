const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.json());

require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
};

const db = mysql.createConnection(dbConfig);

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

// Endpoint to get all abbreviations
app.get('/abbreviations', (req, res) => {
    db.query('SELECT * FROM abbreviations', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});


// Endpoint to view a single abbreviation
app.get('/abbreviations/:id', (req, res) => {
    const sql = 'SELECT * FROM abbreviations WHERE id = ?';
    db.query(sql, req.params.id, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Endpoint to create a new abbreviation
app.post('/abbreviations', (req, res) => {
    const sql = 'INSERT INTO abbreviations SET ?';
    db.query(sql, req.body, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Endpoint to edit an existing abbreviation
app.put('/abbreviations/:id', (req, res) => {
    const sql = 'UPDATE abbreviations SET ? WHERE id = ?';
    db.query(sql, [req.body, req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Endpoint to delete an abbreviation
app.delete('/abbreviations/:id', (req, res) => {
    const sql = 'DELETE FROM abbreviations WHERE id = ?';
    db.query(sql, req.params.id, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

const PORT = 1337;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});