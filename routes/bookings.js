const express = require("express");
const router = express.Router();
const db = require("../db/init");

// POST /api/bookings - create a test-drive booking
router.post("/", (req, res) => {
  const { full_name, email, phone, model_id, dealership, preferred_date, message } = req.body;

  if (!full_name || !email || !model_id || !preferred_date) {
    return res.status(400).json({
      error: "full_name, email, model_id, and preferred_date are required."
    });
  }

  const stmt = db.prepare(`
    INSERT INTO bookings (full_name, email, phone, model_id, dealership, preferred_date, message)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    full_name, email, phone || null, model_id, dealership || null, preferred_date, message || null
  );

  const booking = db.prepare("SELECT * FROM bookings WHERE id = ?").get(result.lastInsertRowid);
  res.status(201).json(booking);
});

// GET /api/bookings - list bookings (for admin/demo purposes)
router.get("/", (req, res) => {
  const bookings = db.prepare(`
    SELECT bookings.*, models.name AS model_name
    FROM bookings
    LEFT JOIN models ON models.id = bookings.model_id
    ORDER BY bookings.created_at DESC
  `).all();
  res.json(bookings);
});

module.exports = router;
