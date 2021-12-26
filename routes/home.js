const express = require('express');
const res = require('express/lib/response');

let router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;