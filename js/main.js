/* ============================================================
   Sprout Project — interactions
   ============================================================ */
(function () {
  "use strict";

  const header = document.getElementById("header");
  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");
  const heroBg = document.querySelector(".hero-bg");

  /* ---------- Sticky header state ---------- */
  let ticking = false;
  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle("scrolled", y > 40);

    // Subtle hero parallax
    if (heroBg && y < window.innerHeight) {
      heroBg.style.transform = "scale(1.06) translateY(" + y * 0.18 + "px)";
    }
    ticking = false;
  }
  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    },
    { passive: true }
  );
  onScroll();

  /* ---------- Mobile menu ---------- */
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", function () {
      const open = mobileNav.classList.toggle("open");
      menuToggle.classList.toggle("open", open);
      menuToggle.setAttribute("aria-expanded", String(open));
    });
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("open");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll("[data-reveal]");
  const prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- Newsletter (demo) ---------- */
  const form = document.getElementById("newsletterForm");
  const note = document.getElementById("newsletterNote");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const input = form.querySelector(".newsletter-input");
      const value = (input.value || "").trim();
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (!valid) {
        note.textContent = "Please enter a valid email address.";
        note.style.color = "#9a6a6a";
        input.focus();
        return;
      }
      note.textContent = "You're on the list. We'll reach you when the dark stirs.";
      note.style.color = "var(--grey)";
      input.value = "";
    });
  }
})();
