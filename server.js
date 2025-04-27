// server.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

let lastActive = 0;                    // start offline
const THRESHOLD_MINUTES = 5;           // offline if >5m since last ping
const CACHE_SECONDS     = 30;          // shields.io TTL

// Helper to decide online/offline
function isOnline() {
  const diffMin = (Date.now() - lastActive) / 60000;
  return diffMin <= THRESHOLD_MINUTES;
}

// 1) Ping endpoint — call this to mark “now” as active
app.get('/ping', (req, res) => {
  lastActive = Date.now();
  // no caching on ping
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.status(204).send();
});

// 2) Status-badge endpoint for Shields.io
app.get('/status-badge', (req, res) => {
  const status = isOnline() ? 'Online' : 'Offline';
  const color  = isOnline() ? 'brightgreen' : 'red';

  res.json({
    schemaVersion: 1,
    label:         'Status',
    message:       status,
    color:         color,
    cacheSeconds:  CACHE_SECONDS,
  });
});

// (Optional) Raw JSON status
app.get('/status', (req, res) => {
  res.json({ status: isOnline() ? 'Online' : 'Offline' });
});

app.get('/', (req, res) => {
  res.send('GitHub Status Server is running');
});

module.exports = app;
