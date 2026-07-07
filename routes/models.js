const express = require("express");
const router = express.Router();
const db = require("../db/init");

// GET /api/models - list all models
router.get("/", (req, res) => {
  const models = db.prepare("SELECT * FROM models ORDER BY id").all();
  res.json(models);
});

// GET /api/models/:id - single model
router.get("/:id", (req, res) => {
  const model = db.prepare("SELECT * FROM models WHERE id = ?").get(req.params.id);
  if (!model) return res.status(404).json({ error: "Model not found" });
  res.json(model);
});

module.exports = router;
