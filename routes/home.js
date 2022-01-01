const express = require('express');
const res = require('express/lib/response');

let router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    partials: {
      nav: 'partials/navbar',
      main: 'partials/home'
    }
  });
});

module.exports = router;