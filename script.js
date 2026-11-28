// 1. Auto-update copyright year
document.getElementById("year").textContent = new Date().getFullYear();

// 2. Mobile navigation toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// 3. Interactive category filter (works from both filter pills and Pillar cards)
const filterButtons = document.querySelectorAll(".filter-btn");
const pillarCards = document.querySelectorAll(".pillar-card");
const guideCards = document.querySelectorAll(".guide-card");

function applyFilter(category) {
  filterButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.filter === category);
  });

  guideCards.forEach((card) => {
    const match = category === "all" || card.dataset.category === category;
    card.classList.toggle("hidden", !match);
  });
}

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => applyFilter(btn.dataset.filter));
});

pillarCards.forEach((card) => {
  card.addEventListener("click", () => {
    applyFilter(card.dataset.filter);
    document.getElementById("guides").scrollIntoView({ behavior: "smooth" });
  });
});

// 4. Quick Preview Modal for starter guide cards
const previews = {
  bhairavgad: {
    category: "Treks & Endurance",
    title: "Moroshi Bhairavgad Trek: Complete Weekend Guide",
    body: "Structure this full article with: 1) Night travel plan & base village breakfast spot, 2) Technical rock patch & safety gear requirements, 3) Rappelling descent checklist, 4) Total per-person budget, and 5) Best season & hydration tips."
  },
  "bike-touring": {
    category: "Road Trips & Rides",
    title: "Couple Motorcycle Touring: Rider & Pillion Checklist",
    body: "Cover riding gear for both rider and pillion, seat-cushion upgrades, luggage mounting without cramping pillion space, break schedules every 90 km, and affiliate links to the exact helmets, jackets, and gloves you trust."
  },
  "heritage-circuit": {
    category: "Dharmic Heritage",
    title: "Weekend Temple & Fort Circuit Planner",
    body: "Share historical background, temple opening and aarti timings, parking details, nearby local vegetarian food options, and respectful photography tips so families and couples can plan effortlessly."
  },
  "recovery-meals": {
    category: "Home Kitchen",
    title: "Post-Run & Post-Trek Home Recovery Meals",
    body: "Include prep time, exact ingredient list, step-by-step method, approximate protein/carb balance, and a short note from your wife on why it works after long outdoor days."
  },
  "fort-cleanup": {
    category: "Seva & Events",
    title: "Organizing a Fort Cleanup & Plantation Drive",
    body: "Outline gloves/biodegradable bag quantities, coordination with local forest/village groups, waste disposal plan, and embed your free Google Form so followers can sign up for the next drive."
  }
};

const modal = document.getElementById("guideModal");
const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");

document.querySelectorAll(".read-more").forEach((btn) => {
  btn.addEventListener("click", () => {
    const data = previews[btn.dataset.guide];
    if (!data) return;
    modalCategory.textContent = data.category;
    modalTitle.textContent = data.title;
    modalBody.textContent = data.body;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  });
});

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});