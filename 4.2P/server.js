const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// ---------- MIDDLEWARE ----------
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// ---------- MONGODB CONNECTION ----------
const mongoURL =
  process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/melbEventsDB';

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log('✅ Connected to MongoDB:', mongoURL);
    seedEventsIfEmpty();
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });

// ---------- EVENT SCHEMA & MODEL ----------
const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const Event = mongoose.model('Event', eventSchema);

// ---------- SEED DATA (5 EVENTS) ----------
const seedEvents = [
  {
    name: 'ATEEZ World Tour – Melbourne',
    date: 'March 2–3, 2026',
    location: 'Rod Laver Arena',
    description:
      'Eight-member South Korean K-pop group, highly regarded for their performance abilities.',
    imageUrl:
      'https://www.rollingstone.co.uk/wp-content/uploads/sites/2/2025/02/DSC04068.jpg',
  },
  {
    name: 'Ed Sheeran Live',
    date: 'February 27, 2026',
    location: 'Marvel Stadium',
    description:
      'A stadium-filling event featuring new music from his most recent albums.',
    imageUrl:
      'https://static.ffx.io/images/$zoom_0.136%2C$multiply_0.7725%2C$ratio_1.5%2C$width_756%2C$x_0%2C$y_0/t_crop_custom/q_86%2Cf_auto/ce115860ed97a16d94ca5a91e0b27340c40f5bdb',
  },
  {
    name: 'Melbourne Fringe Festival',
    date: 'September / October',
    location: 'Various venues across Melbourne CBD',
    description:
      'An annual multi-arts festival with more than 450 events created by independent and emerging artists.',
    imageUrl:
      'https://api.melbournefringe.com.au/media/mgfnaqmu/fringe-carousellarge.jpg',
  },
  {
    name: 'Moomba Festival',
    date: 'March 2026',
    location: 'Along the Yarra River, CBD',
    description:
      'The largest annual free community festival of Melbourne along the banks of the Yarra River.',
    imageUrl: 'https://media.timeout.com/images/105613721/750/422/image.jpg',
  },
  {
    name: 'Australian Open',
    date: 'January (every year)',
    location: 'Melbourne Park',
    description:
      'The first of four annual Grand Slam tennis events held in Melbourne Park during the last two weeks of January.',
    imageUrl:
      'https://content.api.news/v3/images/bin/1e38a808ad54bf7a7c34e75e42fdba33',
  },
];

// Seed only if collection is empty
async function seedEventsIfEmpty() {
  try {
    const count = await Event.countDocuments();
    if (count === 0) {
      await Event.insertMany(seedEvents);
      console.log('🌱 Seeded events collection with 5 sample events.');
    } else {
      console.log(
        `ℹ️ Events collection already has ${count} documents, skipping seed.`,
      );
    }
  } catch (err) {
    console.error('Error seeding events:', err);
  }
}

// ---------- REST ENDPOINTS ----------

// GET /api/events -> returns all events from the database
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find().sort({ name: 1 });
    // main.js expects an array of event objects
    res.json(events);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// ---------- START SERVER ----------
app.listen(PORT, () => {
  console.log(`🚀 Events app running at http://localhost:${PORT}`);
});
