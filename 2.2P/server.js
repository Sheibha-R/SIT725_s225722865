// server.js
// SIT725 Task 2.2P - Express Web Server

const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000; // fixed port to avoid confusion

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Simple route to test server
app.get("/hello", (req, res) => {
  res.send("SIT725 Task 2.2P - Express server is working!");
});

// Add two numbers: http://localhost:3000/add?num1=5&num2=10
app.get("/add", (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  if (Number.isNaN(num1) || Number.isNaN(num2)) {
    return res.status(400).json({
      error: "Both num1 and num2 must be valid numbers.",
      example: "/add?num1=5&num2=10",
    });
  }

  const result = num1 + num2;

  res.json({
    num1,
    num2,
    operation: "addition",
    result,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
