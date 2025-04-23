// Theme toggle
const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  toggle.textContent = document.body.classList.contains('light-mode') ? '🌞' : '🌙';
});

// Set dynamic year
const yearSpan = document.getElementById('current-year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Reveal cards on scroll
const cards = document.querySelectorAll('.course-card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.2 });

cards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(40px)';
  observer.observe(card);
});

// Load VanillaTilt for card animation
const tiltScript = document.createElement('script');
tiltScript.src = "https://cdn.jsdelivr.net/npm/vanilla-tilt@1.7.0/dist/vanilla-tilt.min.js";
tiltScript.onload = () => {
  VanillaTilt.init(document.querySelectorAll(".course-card"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
  });
};
document.body.appendChild(tiltScript);

// Course search filter
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase().trim();
  document.querySelectorAll('.course-card').forEach(card => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    const desc = card.querySelector('p').textContent.toLowerCase();
    const show = title.includes(query) || desc.includes(query);
    card.style.display = show ? "block" : "none";
  });
});

// Course level tag filter
document.querySelectorAll('.tag').forEach(tag => {
  tag.addEventListener('click', () => {
    const level = tag.textContent.toLowerCase();
    document.querySelectorAll('.course-card').forEach(card => {
      const show = card.classList.contains(level);
      card.style.display = level === 'all' ? 'block' : (show ? 'block' : 'none');
    });
  });
});
