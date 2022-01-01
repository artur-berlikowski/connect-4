const express = require('express');

let router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    partials: {
      main: 'partials/game'
    }
  });
});

router.get('/rules', (req, res) => {
  res.render('index', {
    partials: {
      nav: 'partials/navbar',
      main: 'partials/rules'
    }
  });
});

router.get('/high_scores', (req, res) => {
  res.render('index', {
    partials: {
      nav: 'partials/navbar',
      main: 'partials/high_scores'
    }
  });
});

module.exports = router;