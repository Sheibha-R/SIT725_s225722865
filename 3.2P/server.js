// server.js
// SIT725 Task 3.2P - Events Web App (with images & interactivity)

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// --- Simple in-memory data: 5 upcoming events (with images) ---
const events = [
  {
    id: 1,
    name: 'ATEEZ World Tour – Melbourne',
    date: 'March 2–3, 2026',
    location: 'Rod Laver Arena',
    description:
      'Eight-member South Korean K-pop group, highly regarded for their performance abilities.',
    imageUrl: 'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg'
  },
  {
    id: 2,
    name: 'Ed Sheeran Live',
    date: 'February 27, 2026',
    location: 'Marvel Stadium',
    description:
      'A stadium-filling event featuring new music from his most recent albums.',
    imageUrl: 'https://images.pexels.com/photos/164716/pexels-photo-164716.jpeg'
  },
  {
    id: 3,
    name: 'Melbourne Fringe Festival',
    date: 'September / October',
    location: 'Various venues across Melbourne CBD',
    description:
      'An annual multi-arts festival with more than 450 events created by independent and emerging artists.',
    imageUrl: 'https://images.pexels.com/photos/799091/pexels-photo-799091.jpeg'
  },
  {
    id: 4,
    name: 'Moomba Festival',
    date: 'March 2026',
    location: 'Along the Yarra River, CBD',
    description:
      'The largest annual free community festival of Melbourne along the banks of the Yarra River.',
    imageUrl: 'https://images.pexels.com/photos/207983/pexels-photo-207983.jpeg'
  },
  {
    id: 5,
    name: 'Australian Open',
    date: 'January (every year)',
    location: 'Melbourne Park',
    description:
      'The first of four annual Grand Slam tennis events held in Melbourne Park during the last two weeks of January.',
    imageUrl: 'https://images.pexels.com/photos/1405355/pexels-photo-1405355.jpeg'
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
