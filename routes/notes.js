const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db/database');

const router = express.Router();

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.sendStatus(403);
  jwt.verify(token, 'secretkey', (err, user) => {
    if (err) return res.sendStatus(403);
    req.userId = user.id;
    next();
  });
};

router.use(authenticate);

router.post('/', (req, res) => {
  const { title, content, tags, backgroundColor } = req.body;
  db.run('INSERT INTO notes (userId, title, content, tags, backgroundColor, createdAt, updatedAt, isArchived, isTrashed) VALUES (?, ?, ?, ?, ?, ?, ?, 0, 0)', [req.userId, title, content, tags, backgroundColor, new Date(), new Date()], function(err) {
    if (err) return res.status(400).send(err.message);
    res.status(201).send({ noteId: this.lastID });
  });
});

router.get('/', (req, res) => {
  db.all('SELECT * FROM notes WHERE userId = ? AND isTrashed = 0', [req.userId], (err, notes) => {
    if (err) return res.status(400).send(err.message);
    res.json(notes);
  });
});

router.put('/:id', (req, res) => {
  const { title, content, tags, backgroundColor, isArchived, isTrashed } = req.body;
  const { id } = req.params;
  db.run('UPDATE notes SET title = ?, content = ?, tags = ?, backgroundColor = ?, isArchived = ?, isTrashed = ?, updatedAt = ? WHERE id = ? AND userId = ?', [title, content, tags, backgroundColor, isArchived, isTrashed, new Date(), id, req.userId], function(err) {
    if (err) return res.status(400).send(err.message);
    res.sendStatus(200);
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM notes WHERE id = ? AND userId = ?', [id, req.userId], function(err) {
    if (err) return res.status(400).send(err.message);
    res.sendStatus(200);
  });
});

module.exports = router;
