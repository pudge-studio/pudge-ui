/**
 * Scroll Director — IntersectionObserver fallback for scroll-driven animations
 * and component interactivity wiring for the landing page.
 *
 * If the browser supports CSS scroll-timeline (animation-timeline: scroll()),
 * animations are handled purely in CSS. Otherwise, this script adds .is-visible
 * classes on intersection for transition-based reveals.
 */

const supportsScrollTimeline = CSS.supports("animation-timeline", "scroll()");

if (!supportsScrollTimeline) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
  );

  document.querySelectorAll(".scene:not(.scene--hero), .reveal-item").forEach((el) => {
    observer.observe(el);
  });
}

// Subtle parallax on hero device panel
const heroPanel = document.querySelector(".device-panel__chassis");
if (heroPanel && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          heroPanel.style.transform = `translateY(${y * 0.08}px)`;
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true },
  );
}

// Wire component interactivity for hero panel and showcase grid
import("./component-interactivity.js").then(({ initAll }) => {
  const heroPanel = document.getElementById("scene-hero");
  if (heroPanel) initAll(heroPanel);

  const showcaseGrid = document.getElementById("showcase-grid");
  if (showcaseGrid) initAll(showcaseGrid);
});
