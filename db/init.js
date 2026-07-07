const path = require("path");
const Database = require("better-sqlite3");

const db = new Database(path.join(__dirname, "ferrari.db"));
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS models (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    tagline TEXT,
    power_hp INTEGER,
    zero_to_100 REAL,
    top_speed_kmh INTEGER,
    starting_price TEXT,
    image_url TEXT
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    model_id INTEGER,
    dealership TEXT,
    preferred_date TEXT,
    message TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (model_id) REFERENCES models(id)
  );

  CREATE TABLE IF NOT EXISTS contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

const modelCount = db.prepare("SELECT COUNT(*) AS count FROM models").get();

if (modelCount.count === 0) {
  const insert = db.prepare(`
    INSERT INTO models (name, category, tagline, power_hp, zero_to_100, top_speed_kmh, starting_price, image_url)
    VALUES (@name, @category, @tagline, @power_hp, @zero_to_100, @top_speed_kmh, @starting_price, @image_url)
  `);

  const seed = [
    {
      name: "F80",
      category: "Hypercar",
      tagline: "The pinnacle of Ferrari road-going performance.",
      power_hp: 1200,
      zero_to_100: 2.15,
      top_speed_kmh: 350,
      starting_price: "On request",
      image_url: "https://i0.wp.com/thejudge13.com/wp-content/uploads/2026/01/ferrari2026shakedown-ezgif.com-webp-to-jpg-converter.jpg"
    },
    {
      name: "SF90 Stradale",
      category: "Plug-in Hybrid",
      tagline: "830 horses of hybrid Prancing Horse.",
      power_hp: 1000,
      zero_to_100: 2.5,
      top_speed_kmh: 340,
      starting_price: "€430,000",
      image_url: "https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000001/fom-website/2026/Ferrari/G_V027BWQAASNgK.webp"
    },
    {
      name: "296 GTB",
      category: "V6 Hybrid Berlinetta",
      tagline: "The smallest V6 ever built for a road car, reimagined.",
      power_hp: 830,
      zero_to_100: 2.9,
      top_speed_kmh: 330,
      starting_price: "€320,000",
      image_url: "https://e0.365dm.com/25/02/1600x900/skysports-pirelli-f1-2025-test_6820918.jpg?20250206074138"
    },
    {
      name: "Purosangue",
      category: "Four-door, Four-seat",
      tagline: "Ferrari's answer to a car for every road.",
      power_hp: 725,
      zero_to_100: 3.3,
      top_speed_kmh: 310,
      starting_price: "€390,000",
      image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx3o_iPJLC-TCLbQWR6a7ebPa4_HDqedris6DRJF8YfXFBt-VYISETY4A&s=10"
    },
    {
      name: "Roma",
      category: "Grand Tourer",
      tagline: "La Nuova Dolce Vita.",
      power_hp: 620,
      zero_to_100: 3.4,
      top_speed_kmh: 320,
      starting_price: "€225,000",
      image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0yZdvTorejyI0H9w36nXTBzmhOGBb49r2QKZ78iCgktLbwzONh2U_2sph&s=10"
    }
  ];

  const insertMany = db.transaction((rows) => {
    for (const row of rows) insert.run(row);
  });
  insertMany(seed);
}

module.exports = db;
