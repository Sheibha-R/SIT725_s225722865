const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files (public client)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const booksRoutes = require('./routes/books.routes');
app.use('/api/books', booksRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
