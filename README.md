# Ferrari Experience — Full-Stack Rebuild

A responsive Ferrari showcase site: the original hero viewport is preserved pixel-for-pixel
(colors, layout, hover animation, nav table), everything after it has been rebuilt with a
real backend and database behind it.

## Stack

- **Frontend:** static HTML/CSS/JS in `public/` (no framework, no build step)
- **Backend:** Node.js + Express (`server.js`, `routes/`)
- **Database:** SQLite via `better-sqlite3` (`db/init.js` creates and seeds `db/ferrari.db` on first run)

## What's in the database

Three tables, created automatically the first time the server starts:

| Table               | Purpose                                      |
|----------------------|-----------------------------------------------|
| `models`             | The 5 cars shown in the range grid + ticker  |
| `bookings`           | Test-drive requests submitted on the site    |
| `contact_messages`   | Messages submitted on the contact form       |

## Running it

```bash
npm install
npm start
```

Then open **http://localhost:3000**.

## API endpoints

| Method | Path             | Description                          |
|--------|------------------|---------------------------------------|
| GET    | `/api/models`      | List all models                     |
| GET    | `/api/models/:id`  | Get a single model                  |
| POST   | `/api/bookings`    | Create a test-drive booking         |
| GET    | `/api/bookings`    | List all bookings (admin/demo view) |
| POST   | `/api/contact`     | Submit a contact message            |

## What changed vs. the original file

- **Hero (`Main1`):** untouched visually — same colors, same hover-reveal animation, same
  nav table and logo. Added a collapsing mobile nav (`nav-toggle`) that only appears under
  800px, so the desktop view is identical to the source file.
- **Video section (`Main2`):** now has a headline/overlay ("Engineering Emotion") and a
  scrolling telemetry ticker that reads live spec data straight from `/api/models`.
- **Gallery (`Main3`):** the four static image quadrants became a data-driven model grid —
  each card is rendered from the database (name, category, tagline, power, 0–100, top
  speed) with a "Book Test Drive" button that jumps to the booking form pre-selected.
- **New heritage section:** short brand story with a stat strip, breaks up the flow between
  the range and the booking form.
- **New booking section:** a real form that POSTs to `/api/bookings` and is stored in
  SQLite — model and dealership are selects, date is required, everything is validated
  server-side too.
- **Footer (`Main4`):** the dead `<button>Explore</button>` became a working contact form
  that POSTs to `/api/contact`, plus a footer bar with quick links and the original email.

## Notes / things to plug in yourself

- The hero and gallery images are hot-linked from their original source URLs — swap them
  for hosted assets before shipping.
- `Main2` looks for `public/videos/f80-intro.mp4`, which isn't included. Drop a video file
  there (matching filename or update the `<source>` tag) — it falls back to a static poster
  image until then.
- There's no auth on `GET /api/bookings`; it's included for demo/admin convenience. Add
  auth before exposing it publicly.
