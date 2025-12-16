const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// Hardcoded MongoDB URI (required by task)
const MONGO_URI = "mongodb://localhost:27017/booksdb_53c";

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static client
app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// Routes
const booksRoutes = require("./routes/books.routes");
app.use("/api/books", booksRoutes);

// Special integrity route: must return 204 No Content
app.get("/api/integrity-check42", (req, res) => {
  return res.status(204).send();
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
