const express = require('express');
const mysql = require('mysql2');
const router = express.Router();
const db = require('../utils/db');

router.post('/', (req, res) => {
    const { username, email } = req.body;
    const sql = 'INSERT INTO users (username, email) VALUES (?, ?)';
    db.query(sql, [username, email], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'User created', userId: results.insertId });
    });
});

module.exports = router;
