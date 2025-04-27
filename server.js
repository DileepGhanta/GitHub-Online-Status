const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

let lastActive = Date.now();

app.get('/ping', (req, res) => {
  lastActive = Date.now();
  res.send('Pong');
});

app.get('/status', (req, res) => {
  const now = Date.now();
  const diffMinutes = (now - lastActive) / 60000;
  const status = diffMinutes <= 5 ? 'online' : 'offline';
  res.json({ status });
});

// BADGE format
app.get('/status-badge', (req, res) => {
  const now = Date.now();
  const diffMinutes = (now - lastActive) / 60000;
  const status = diffMinutes <= 5 ? 'online' : 'offline';

  res.json({
    schemaVersion: 1,
    label: "Status",
    message: status,
    color: status === "online" ? "brightgreen" : "red"
  });
});

app.get('/', (req, res) => {
  res.send('Status Server running');
});

module.exports = app;
