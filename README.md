# Ferrari Experience 🏎️

A premium full-stack Ferrari showcase website built with HTML, CSS, JavaScript, Node.js, Express, and SQLite.

**Live demo:** run locally at `http://localhost:3000` (see [Getting Started](#getting-started))

---

## Features

- Responsive luxury-inspired UI
- Interactive Ferrari model showcase
- Test-drive booking system
- Contact form
- SQLite database integration
- RESTful API
- Dynamic model rendering
- Mobile responsive design

## Tech Stack

| Layer      | Tech                                  |
|------------|----------------------------------------|
| Frontend   | HTML, CSS, vanilla JavaScript         |
| Backend    | Node.js, Express                      |
| Database   | SQLite (via `better-sqlite3`)         |
| Fonts      | Oswald, Inter, JetBrains Mono (Google Fonts) |

## Project Structure

```
ferrari-website/
├── server.js              # Express app entry point
├── package.json
├── db/
│   └── init.js             # creates + seeds SQLite tables on first run
├── routes/
│   ├── models.js           # GET /api/models, /api/models/:id
│   ├── bookings.js         # GET/POST /api/bookings
│   └── contact.js          # POST /api/contact
└── public/
    ├── index.html
    ├── css/style.css
    ├── js/main.js
    └── videos/              # drop f80-intro.mp4 here (not bundled)
```

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org) v18 or higher

### Installation

```bash
git clone https://github.com/<your-username>/ferrari-website.git
cd ferrari-website
npm install
npm start
```

Then open **http://localhost:3000** in your browser.

The SQLite database (`db/ferrari.db`) is created and seeded automatically the first time
the server starts — no manual setup required.

## API Reference

| Method | Endpoint            | Description                          |
|--------|---------------------|----------------------------------------|
| GET    | `/api/models`       | List all models                        |
| GET    | `/api/models/:id`   | Get a single model by ID                |
| POST   | `/api/bookings`     | Create a test-drive booking             |
| GET    | `/api/bookings`     | List all bookings (admin/demo view)     |
| POST   | `/api/contact`      | Submit a contact message                |

**Example — create a booking:**
```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{"full_name":"Jane Doe","email":"jane@example.com","model_id":1,"preferred_date":"2026-08-01"}'
```

## Known Limitations / TODO

- [ ] Hero and gallery images are hot-linked from external sources — swap for hosted assets
- [ ] `public/videos/f80-intro.mp4` isn't bundled; falls back to a static poster until added
- [ ] `GET /api/bookings` has no auth — add before exposing publicly
- [ ] No automated tests yet

## License

MIT — feel free to fork and adapt.
