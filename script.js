const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });
}

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
    const guidesSection = document.getElementById("guides");
    if (guidesSection) guidesSection.scrollIntoView({ behavior: "smooth" });
  });
});

const previews = {
  "bike-touring": {
    category: "Road Trips & Rides",
    title: "Couple Motorcycle Touring: Rider & Pillion Checklist",
    body: "Coming soon: Our full guide covering safety gear for both rider and pillion, seat comfort tips for 400+ km highway days, luggage distribution, and essential roadside tools."
  },
  "heritage-circuit": {
    category: "Dharmic Heritage",
    title: "Weekend Temple & Fort Circuit Planner",
    body: "Coming soon: Darshan timings, historical notes, modest attire guidance, and practical routes to combine ancient temples and Sahyadri forts over a single weekend."
  },
  "recovery-meals": {
    category: "Home Kitchen",
    title: "Post-Run & Post-Trek Home Recovery Meals",
    body: "Coming soon: Tested home-cooked sattvic recipes with prep timings, macro notes, and easy ingredients to refuel after marathons and tough climbs."
  },
  "fort-cleanup": {
    category: "Seva & Events",
    title: "Organizing a Fort Cleanup & Plantation Drive",
    body: "Coming soon: Waste sorting supplies, local coordination checklist, safety briefings, and how you can join our next weekend seva drive."
  }
};

const modal = document.getElementById("guideModal");
if (modal) {
  const modalCategory = document.getElementById("modalCategory");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");
  const modalClose = document.getElementById("modalClose");

  document.querySelectorAll("button.read-more").forEach((btn) => {
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

  const closeModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  };

  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
}