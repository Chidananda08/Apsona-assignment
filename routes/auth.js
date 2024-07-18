const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/database');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], function(err) {
    if (err) return res.status(400).send('User already exists');
    res.status(201).send({ userId: this.lastID });
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err || !user) return res.status(400).send('User not found');
    bcrypt.compare(password, user.password, (err, match) => {
      if (match) {
        const token = jwt.sign({ id: user.id }, 'secretkey'); // use env variable in production
        res.json({ token });
      } else {
        res.status(400).send('Invalid password');
      }
    });
  });
});

module.exports = router;
