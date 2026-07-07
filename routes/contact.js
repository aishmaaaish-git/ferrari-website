const express = require("express");
const router = express.Router();
const db = require("../db/init");

// GET /api/contact - view all contact messages
router.get("/", (req, res) => {
  const messages = db.prepare(`
    SELECT *
    FROM contact_messages
    ORDER BY id DESC
  `).all();

  res.json(messages);
});

// POST /api/contact - submit a contact message
router.post("/", (req, res) => {
  const { full_name, email, subject, message } = req.body;

  if (!full_name || !email || !message) {
    return res.status(400).json({
      error: "full_name, email, and message are required."
    });
  }

  const stmt = db.prepare(`
    INSERT INTO contact_messages (full_name, email, subject, message)
    VALUES (?, ?, ?, ?)
  `);

  const result = stmt.run(
    full_name,
    email,
    subject || null,
    message
  );

  const entry = db.prepare(
    "SELECT * FROM contact_messages WHERE id = ?"
  ).get(result.lastInsertRowid);

  res.status(201).json(entry);
});

module.exports = router;