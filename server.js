require('dotenv').config()

const cookieParser = require('cookie-parser');
const express = require('express')

const app = express()
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

var cookieSession = require('cookie-session')
app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 10 * 60 * 1000 // cookies last 10 minutes (tyle samo co sesja Aruby)
}))

const index = require('./routes/index.js');
const test = require('./routes/test.js');
const testMac = require('./routes/testMac.js');
const aruba = require('./routes/aruba.js');
const database = require('./routes/database.js');

app.use('/', index);
app.use('/database', database);
app.use('/aruba', aruba);
app.use('/testmac', testMac);
app.use('/test', test);

app.get('*', function (req, res) {
  res.sendFile('errorpage.html', { root: 'public' });
});

app.listen(process.env.SERVER_PORT)