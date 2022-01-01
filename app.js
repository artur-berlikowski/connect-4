const express = require('express');
const path = require('path');
const port = 3000;
const resource = 'resource';

let app = express();

app.set('view engine', 'ejs');
app.use(express.static(resource));
app.listen(port, () => {
  console.log(`Express JS listening on port ${port}`);
});

app.get('/', (req, res) => {
  res.render('index', {
    partials: {
      nav: 'partials/navbar',
      main: 'partials/home'
    }
  });
});

app.get('/game', (req, res) => {
  res.render('index', {
    partials: {
      main: 'partials/game'
    }
  });
});

app.get('/rules', (req, res) => {
  res.render('index', {
    partials: {
      nav: 'partials/navbar',
      main: 'partials/rules'
    }
  });
});

app.get('/high_scores', (req, res) => {
  res.render('index', {
    partials: {
      nav: 'partials/navbar',
      main: 'partials/high_scores'
    }
  });
});