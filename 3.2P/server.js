const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// --- Simple in-memory data: 5 upcoming events ---
const events = [
  {
    id: 1,
    name: 'ATEEZ',
    date: 'March 2-3, 2026',
    location: 'Rod Laver Arena',
    description: 'Eight-member South Korean K-pop group, highly regarded for their performance abilities.'
  },
  {
    id: 2,
    name: 'Ed Sheeran',
    date: 'February 27, 2026',
    location: 'Marvel Stadium',
    description: 'A stadium-filling event featuring new music from his most recent albums.'
  },
  {
    id: 3,
    name: 'Melbourne Fringe Festival',
    date: 'September/October',
    location: 'Arts organization in the City of Melbourne, Victoria',
    description: 'An annual multi-arts festival with more than 450 events created by independent and emerging artists.'
  },
  {
    id: 4,
    name: 'Moomba Festival',
    date: 'March 2026',
    location: 'CBD',
    description: 'The largest annual free community festival of Melbourne along the banks of the Yarra River.'
  },
  {
    id: 5,
    name: 'Australian Open',
    date: 'Held in January each year',
    location: 'Melbourne Park, Australia',
    description: 'The first of four annual Grand Slam tennis events held in Melbourne Park during the last two weeks of January.'
  }
];

// --- REST endpoint: GET /api/events ---
app.get('/api/events', (req, res) => {
  res.json(events);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Events app running at http://localhost:${PORT}`);
});