// server.js
const express = require('express');
const cors    = require('cors');

const app = express();
app.use(cors());

let lastActive = 0;
const THRESHOLD_MINUTES = 5;
const CACHE_SECONDS     = 300;

function isOnline() {
  return (Date.now() - lastActive) / 60000 <= THRESHOLD_MINUTES;
}

app.get('/ping', (req, res) => {

  const gif = Buffer.from(
    'R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==',
    'base64'
  );
  res.set({
    'Content-Type':  'image/gif',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
  });
  res.send(gif);
});

app.get('/status-badge', (req, res) => {
    lastActive = Date.now();
  const online = isOnline();
  res.json({
    schemaVersion: 1,
    label:         'Status',
    message:       online ? 'Online' : 'Offline',
    color:         online ? 'brightgreen' : 'red',
    cacheSeconds:  CACHE_SECONDS,
  });
});

app.get('/', (req, res) => {
  res.send('Status Server running');
});

module.exports = app;
