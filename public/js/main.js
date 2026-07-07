// ---------- Nav helpers ----------
function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
  const navBlock = document.getElementById("navBlock");
  if (navBlock) navBlock.classList.remove("open");
}

document.getElementById("navToggle").addEventListener("click", () => {
  document.getElementById("navBlock").classList.toggle("open");
});

// ---------- Model range ----------
let modelsCache = [];

async function loadModels() {
  const grid = document.getElementById("modelGrid");
  const status = document.getElementById("modelsStatus");
  const select = document.getElementById("b_model");
  const telemetryTrack = document.getElementById("telemetryTrack");

  try {
    const res = await fetch("/api/models");
    if (!res.ok) throw new Error("Request failed");
    modelsCache = await res.json();

    status.textContent = `${modelsCache.length} models currently in the lineup.`;

    grid.innerHTML = modelsCache.map(renderModelCard).join("");
    select.innerHTML = modelsCache
      .map((m) => `<option value="${m.id}">${m.name}</option>`)
      .join("");

    const tickerHTML = modelsCache
      .map(
        (m) =>
          `<span class="telemetry-item">${m.name} &nbsp; <b>${m.power_hp} HP</b> &nbsp;|&nbsp; 0–100: <b>${m.zero_to_100}s</b> &nbsp;|&nbsp; TOP: <b>${m.top_speed_kmh} KM/H</b></span>`
      )
      .join("");
    // duplicate content so the CSS marquee loop is seamless
    telemetryTrack.innerHTML = tickerHTML + tickerHTML;
  } catch (err) {
    status.textContent = "Could not load range data. Is the server running?";
    console.error(err);
  }
}

function renderModelCard(m) {
  return `
    <div class="model-card">
      <div class="Box3">
        <img src="${m.image_url}" alt="${m.name}">
      </div>
      <div class="model-body">
        <span class="eyebrow">${m.category}</span>
        <h3 class="model-name">${m.name}</h3>
        <p class="model-tagline">${m.tagline || ""}</p>
        <div class="model-specs">
          <span><b>${m.power_hp} HP</b>Power</span>
          <span><b>${m.zero_to_100}s</b>0–100</span>
          <span><b>${m.top_speed_kmh}</b>km/h top</span>
        </div>
        <button class="model-cta" onclick="bookModel(${m.id})">Book Test Drive</button>
      </div>
    </div>
  `;
}

function bookModel(id) {
  const select = document.getElementById("b_model");
  select.value = id;
  scrollToId("booking");
}

// ---------- Booking form ----------
document.getElementById("bookingForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const submitBtn = document.getElementById("bookingSubmit");
  const statusEl = document.getElementById("bookingStatus");

  const payload = {
    full_name: form.full_name.value,
    email: form.email.value,
    phone: form.phone.value,
    model_id: Number(form.model_id.value),
    dealership: form.dealership.value,
    preferred_date: form.preferred_date.value,
    message: form.message.value
  };

  submitBtn.disabled = true;
  statusEl.textContent = "Sending request…";
  statusEl.className = "form-status";

  try {
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Something went wrong");

    statusEl.textContent = `Request received — a dealership contact will confirm shortly (booking #${data.id}).`;
    statusEl.className = "form-status ok";
    form.reset();
  } catch (err) {
    statusEl.textContent = err.message;
    statusEl.className = "form-status err";
  } finally {
    submitBtn.disabled = false;
  }
});

// ---------- Contact form ----------
document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const statusEl = document.getElementById("contactStatus");

  const payload = {
    full_name: form.full_name.value,
    email: form.email.value,
    subject: form.subject.value,
    message: form.message.value
  };

  statusEl.textContent = "Sending…";
  statusEl.className = "form-status";

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Something went wrong");

    statusEl.textContent = "Message sent — thank you.";
    statusEl.className = "form-status ok";
    form.reset();
  } catch (err) {
    statusEl.textContent = err.message;
    statusEl.className = "form-status err";
  }
});

loadModels();
