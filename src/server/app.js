import express from 'express';
import fs from 'fs';
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import MainPage from './MainPage';

const app = express();

app.get('/', function(req, res) {
  const markup = ReactDOMServer.renderToStaticMarkup(<MainPage />);
  res.send('<!DOCTYPE html>' + markup);
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

export default app;
