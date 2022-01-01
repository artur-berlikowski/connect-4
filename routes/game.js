const express = require('express');

let router = express.Router();

router.get('/', (req, res) => {
  res.send('game');
});

router.get('/rules', (req, res) => {
  res.send('rules');
});

router.get('/leaderboard', (req, res) => {
  res.send('leaderboard');
});

module.exports = router;