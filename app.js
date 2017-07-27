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

// app.get('/steps/:num', function(req, res) {
//   res.render('steps', { num: req.params.num, numPages: db.numPages(), content: db.getPage(req.params.num) });
// })

app.get('/steps/:num', function(req, res) {
  db.getPageCb(req.params.num*1, function(err, pageContent) {
    db.numPagesCb(function(err, numPages) {
      res.render('steps', { num: req.params.num, numPages: numPages, content: pageContent });
    })
  })
})






const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`listening on port ${port}`);
})
