const express = require('express');
const app = express()
const port = 3000;
const path = require('path');

app.use(express.static(path.join(__dirname, 'dist')));

app.set('view engine', 'ejs');

const env = process.argv[2];

app.get('/', function (req, res) {
    res.render('pages/app', {env});
});

app.get('/breeds', function (req, res) {
    res.render('pages/app', {env});
});

app.get('/favorites', function (req, res) {
    res.render('pages/app', {env});
});

app.listen(port, () => {
    console.log(`Cats app listening on port ${port}`)
})