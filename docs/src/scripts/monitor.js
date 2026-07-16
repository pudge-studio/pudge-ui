// Landing "Monitor" — boot flourish, pointer parallax, and live components.
// The drifting parts are wired with the same selector-driven engine that powers
// every component page, so knobs turn, meters sway, toggles flip.
import { initAll } from "./component-interactivity.js";

const REDUCE_MOTION =
  window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const screen = document.getElementById("monitor-screen");
const floaters = document.getElementById("floaters");
const hud = document.querySelector(".hud");

// Bring the floating components to life (idle meter/gauge motion is self-gating).
if (floaters) initAll(floaters);

// ── CRT power-on: a fixed overlay, so it never shifts layout ────────────────
const boot = document.querySelector(".crt-boot");
if (boot) {
  if (REDUCE_MOTION) {
    boot.classList.add("is-done");
  } else {
    // Kick off on the next frame so the white scan line is visible from black.
    requestAnimationFrame(() => boot.classList.add("is-booting"));
    boot.addEventListener("animationend", (e) => {
      if (e.animationName === "crt-fade") boot.classList.add("is-done");
    });
    // Safety net in case animationend never fires (e.g. tab backgrounded).
    setTimeout(() => boot.classList.add("is-done"), 1400);
  }
}

// ── Pointer parallax: the field drifts opposite the cursor, HUD leads it ────
if (screen && floaters && !REDUCE_MOTION && window.matchMedia("(pointer: fine)").matches) {
  let tx = 0;
  let ty = 0;
  let cx = 0;
  let cy = 0;
  let raf = null;

  const tick = () => {
    cx += (tx - cx) * 0.08;
    cy += (ty - cy) * 0.08;
    floaters.style.transform = `translate(${cx * -14}px, ${cy * -10}px)`;
    if (hud) hud.style.transform = `translate(${cx * 6}px, ${cy * 4}px)`;
    raf = Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001 ? requestAnimationFrame(tick) : null;
  };

  screen.addEventListener("pointermove", (e) => {
    const r = screen.getBoundingClientRect();
    tx = (e.clientX - r.left) / r.width - 0.5;
    ty = (e.clientY - r.top) / r.height - 0.5;
    if (raf == null) raf = requestAnimationFrame(tick);
  });
  screen.addEventListener("pointerleave", () => {
    tx = 0;
    ty = 0;
    if (raf == null) raf = requestAnimationFrame(tick);
  });
}
