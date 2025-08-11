// Wait for DOM content loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Vanta Birds background
  if (typeof VANTA !== 'undefined' && VANTA.BIRDS) {
    VANTA.BIRDS({
      el: "#vanta-bg",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200,
      minWidth: 200,
      scale: 1,
      scaleMobile: 1,
      color1: 0x00ff7f,  // neon green
      colorMode: "variance",
      separation: 76,
    });
  }

  // Custom glowing cursor
  const cursor = document.getElementById('cursor');
  window.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  // Smooth scroll for nav buttons
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Light/Dark theme toggle logic
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      body.classList.add('light');
      themeToggle.textContent = '☀️';
    } else {
      body.classList.remove('light');
      themeToggle.textContent = '🌙';
    }
  }
  loadTheme();

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('light');
    if (body.classList.contains('light')) {
      themeToggle.textContent = '☀️';
      localStorage.setItem('theme', 'light');
    } else {
      themeToggle.textContent = '🌙';
      localStorage.setItem('theme', 'dark');
    }
  });

  // Intersection Observer for section fade-in and skill bar animation
  const sections = document.querySelectorAll('[data-animate]');
  const skills = document.querySelectorAll('.skills-list li');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Animate skill bars only when skills section is visible
        if (entry.target.id === 'skills') {
          skills.forEach(skill => {
            const fill = skill.querySelector('.skill-fill');
            const percent = skill.getAttribute('data-percent') || '0';
            fill.style.width = percent + '%';
            skill.classList.add('visible');
          });
        }
      }
    });
  }, { threshold: 0.25 });

  sections.forEach(section => observer.observe(section));
});
