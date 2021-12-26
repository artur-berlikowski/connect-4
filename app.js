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

let home = require(path.resolve(__dirname + '/routes/home.js'));
let game = require(path.resolve(__dirname + '/routes/game.js'));

app.use('/', home);
app.use('/game', game);