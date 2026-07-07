const express = require("express");
const cors = require("cors");
const path = require("path");

require("./db/init"); // ensures DB + tables + seed data exist before routes touch them

const modelsRouter = require("./routes/models");
const bookingsRouter = require("./routes/bookings");
const contactRouter = require("./routes/contact");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/models", modelsRouter);
app.use("/api/bookings", bookingsRouter);
app.use("/api/contact", contactRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Ferrari experience running at http://localhost:${PORT}`);
});
