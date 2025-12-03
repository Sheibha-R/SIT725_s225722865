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
    imageUrl: 'https://www.rollingstone.co.uk/wp-content/uploads/sites/2/2025/02/DSC04068.jpg'
  },
  {
    id: 2,
    name: 'Ed Sheeran Live',
    date: 'February 27, 2026',
    location: 'Marvel Stadium',
    description:
      'A stadium-filling event featuring new music from his most recent albums.',
    imageUrl: 'https://static.ffx.io/images/$zoom_0.136%2C$multiply_0.7725%2C$ratio_1.5%2C$width_756%2C$x_0%2C$y_0/t_crop_custom/q_86%2Cf_auto/ce115860ed97a16d94ca5a91e0b27340c40f5bdb'
  },
  {
    id: 3,
    name: 'Melbourne Fringe Festival',
    date: 'September / October',
    location: 'Various venues across Melbourne CBD',
    description:
      'An annual multi-arts festival with more than 450 events created by independent and emerging artists.',
    imageUrl: 'https://api.melbournefringe.com.au/media/mgfnaqmu/fringe-carousellarge.jpg'
  },
  {
    id: 4,
    name: 'Moomba Festival',
    date: 'March 2026',
    location: 'Along the Yarra River, CBD',
    description:
      'The largest annual free community festival of Melbourne along the banks of the Yarra River.',
    imageUrl: 'https://media.timeout.com/images/105613721/750/422/image.jpg'
  },
  {
    id: 5,
    name: 'Australian Open',
    date: 'January (every year)',
    location: 'Melbourne Park',
    description:
      'The first of four annual Grand Slam tennis events held in Melbourne Park during the last two weeks of January.',
    imageUrl: 'https://content.api.news/v3/images/bin/1e38a808ad54bf7a7c34e75e42fdba33'
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
