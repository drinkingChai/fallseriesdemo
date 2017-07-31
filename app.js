const express = require('express');
const nunjucks = require('nunjucks');
const db = require('./db');

const app = express();
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', { express: app, noCache: true });

app.use(express.static('public'));


app.get('/', function(req, res) {
  res.render('index');
})

app.get('/steps/:num', function(req, res) {
  db.getPageCb(req.params.num*1, function(err, pageContent) {
    if (err) return console.log(err);
    db.numPagesCb(function(err, numPages) {
      if (err) return console.log(err);
      numPages = numPages.map(function(item, i) { return i });
      res.render('steps', { num: req.params.num, numPages: numPages, content: pageContent });
    })
  })
})

app.get('/faq', function(req, res) {
  res.render('faq');
})

app.get('/rides', function(req, res) {
  db.getRidesCb(function(err, rides) {
    res.render('rides', { rides });
  })
})



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`listening on port ${port}`);
})
