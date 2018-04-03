const express = require('express');
const fs = require('fs');

const app = express();

app.get('/', function(req, res) {
  fs.readFile('main.html', function(err, data) {
    if (err) {
      res.status(404).send('Not Found');
      return;
    }
    res.send(data.toString());
  });
});

app.get('/client.js', function(req, res) {
  fs.readFile('out.js', function(err, data) {
    if (err) {
      res.status(404).send('Not Found');
      return;
    }
    res.set('Content-Type', 'application/javascript');
    res.send(data);
  });
});

app.get('/style.css', function(req, res) {
  fs.readFile('style.css', function(err, data) {
    if (err) {
      res.status(404).send('Not Found');
      return;
    }
    res.set('Content-Type', 'text/css');
    res.send(data);
  });
});

app.listen(4000);
