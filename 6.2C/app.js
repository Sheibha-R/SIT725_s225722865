const express = require("express");
const { validateCertificate } = require("./src/validate");
const { calculateProgress } = require("./src/progress");

const app = express();
app.use(express.json());

// In-memory store for this testing-only mini project
const certificates = [];

// REST endpoint to add a certificate record
app.post("/api/certificates", (req, res) => {
  const checked = validateCertificate(req.body);
  if (!checked.ok) return res.status(400).json({ error: checked.error });

  const record = { id: certificates.length + 1, ...checked.data };
  certificates.push(record);

  return res.status(201).json({ message: "saved", record });
});

// REST endpoint that uses the calculation function
app.get("/api/progress", (req, res) => {
  const summary = calculateProgress(certificates);
  return res.json(summary);
});

// test helper endpoint (keeps tests independent)
app.post("/api/reset", (req, res) => {
  certificates.length = 0;
  res.json({ message: "reset" });
});

module.exports = app;
