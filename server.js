const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

let lastActive = Date.now();

// Endpoint to update your last activity
app.get('/ping', (req, res) => {
  lastActive = Date.now();
  res.send('Pong');
});

// Endpoint to get current status
app.get('/status', (req, res) => {
  const now = Date.now();
  const diffMinutes = (now - lastActive) / 60000; // convert milliseconds to minutes
  if (diffMinutes <= 5) {
    res.json({ status: 'online' });
  } else {
    res.json({ status: 'offline' });
  }
});

// Default route
app.get('/', (req, res) => {
  res.send('Status Server is running');
});

// Listen on the Vercel provided port
module.exports = app;
