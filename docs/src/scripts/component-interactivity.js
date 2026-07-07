// pudge-ui — component interactivity engine
// ------------------------------------------------------------------
// Selector-driven behaviors. Each behavior scans a scoped container and
// wires the markup it recognises, so the same engine animates every
// component page without per-component configuration. Pointer events are
// used throughout (mouse + touch + pen). All idle motion shares a single
// rAF ticker and is gated behind prefers-reduced-motion.
// ------------------------------------------------------------------

const REDUCE_MOTION =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---- shared animation loop -------------------------------------------------
const tickers = new Set();
let rafId = null;

function loop(t) {
  tickers.forEach((fn) => fn(t));
  rafId = tickers.size ? requestAnimationFrame(loop) : null;
}
function addTicker(fn) {
  tickers.add(fn);
  if (rafId == null) rafId = requestAnimationFrame(loop);
  return () => tickers.delete(fn);
}
function clearTickers() {
  tickers.clear();
  if (rafId != null) cancelAnimationFrame(rafId);
  rafId = null;
}

// ---- helpers ---------------------------------------------------------------
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
// Prevent double-binding when initAll re-runs after a variant switch.
function once(el, key) {
  const k = `__bhv_${key}`;
  if (el[k]) return false;
  el[k] = true;
  return true;
}
function emit(stage) {
  // surface the live value to the optional stage badge
  return (text) => {
    const badge = stage?.querySelector?.("[data-live-value]");
    if (badge && text != null) badge.textContent = String(text);
  };
}

// ===========================================================================
// ROTARY — drag vertically (or around the dial) to turn knobs & dials
// ===========================================================================
const ROTARY = [
  // radial knob: rotate the indicator needle (origin already centred in CSS)
  {
    sel: ".radial-knob",
    target: ".radial-indicator",
    value: ".radial-value",
    min: -150,
    max: 150,
    start: 0,
    fmt: (a, c) => c.value && `${Math.round(((a - c.min) / (c.max - c.min)) * 100)}`,
    rotateTarget: true,
  },
  // rotary encoder: free-spinning, rotate the whole knob body
  { sel: ".rotary", target: ".rotary", min: -1e6, max: 1e6, start: 0, continuous: true },
  // mode dial: rotate the whole body, snap to labelled detents
  {
    sel: ".mode-dial-body",
    target: ".mode-dial-body",
    label: ".mode-dial-label",
    sub: ".mode-dial-sub",
    detents: [
      ["AUTO", "AUTO"],
      ["P", "PROGRAM"],
      ["A", "APERTURE"],
      ["S", "SHUTTER"],
      ["M", "MANUAL"],
    ],
    min: -120,
    max: 120,
    start: 0,
  },
  // camera knurled dials: spin the knurl texture, bump the badge value
  {
    sel: ".dial-v-body",
    target: ".knurl-cross",
    value: ".dial-badge",
    min: -300,
    max: 300,
    start: 0,
    steps: ["25", "50", "100", "200", "400", "800", "1600", "3200"],
  },
  {
    sel: ".dial-h-body",
    target: ".knurl-cross",
    value: ".dial-badge",
    min: -300,
    max: 300,
    start: 0,
    steps: ["-2", "-1.3", "-0.7", "+0", "+0.7", "+1.3", "+2"],
  },
];

function initRotary(container, signal) {
  ROTARY.forEach((cfg) => {
    container.querySelectorAll(cfg.sel).forEach((knob) => {
      if (!once(knob, "rotary")) return;
      const target = cfg.target ? knob.querySelector(cfg.target) || knob : knob;
      const valEl =
        (cfg.value &&
          (knob.parentElement?.querySelector(cfg.value) || container.querySelector(cfg.value))) ||
        null;
      const labelEl =
        cfg.label && (knob.querySelector(cfg.label) || container.querySelector(cfg.label));
      const subEl = cfg.sub && (knob.querySelector(cfg.sub) || container.querySelector(cfg.sub));
      let angle = cfg.start;
      let startY = 0;
      let startAngle = 0;
      let dragging = false;
      const STEP = cfg.detents
        ? (cfg.max - cfg.min) / (cfg.detents.length - 1)
        : cfg.steps
        ? (cfg.max - cfg.min) / (cfg.steps.length - 1)
        : (cfg.max - cfg.min) / 20;

      knob.setAttribute("tabindex", "0");
      if (!cfg.continuous) {
        knob.setAttribute("role", "slider");
        knob.setAttribute("aria-valuemin", "0");
        knob.setAttribute("aria-valuemax", "100");
      }

      const render = () => {
        target.style.transition = dragging ? "none" : "transform 0.25s cubic-bezier(.2,.9,.3,1.2)";
        target.style.transform = `rotate(${angle}deg)`;
        if (cfg.detents) {
          const span = (cfg.max - cfg.min) / (cfg.detents.length - 1);
          const idx = clamp(Math.round((angle - cfg.min) / span), 0, cfg.detents.length - 1);
          if (labelEl) labelEl.textContent = cfg.detents[idx][0];
          if (subEl) subEl.textContent = cfg.detents[idx][1];
          signal?.(cfg.detents[idx][1]);
        } else if (cfg.steps && valEl) {
          const span = (cfg.max - cfg.min) / (cfg.steps.length - 1);
          const idx = clamp(Math.round((angle - cfg.min) / span), 0, cfg.steps.length - 1);
          valEl.textContent = cfg.steps[idx];
          signal?.(cfg.steps[idx]);
        } else if (cfg.fmt && valEl) {
          const out = cfg.fmt(angle, cfg);
          if (out != null) {
            valEl.textContent = out;
            signal?.(out);
          }
        }
        if (!cfg.continuous) {
          knob.setAttribute(
            "aria-valuenow",
            Math.round(((angle - cfg.min) / (cfg.max - cfg.min)) * 100),
          );
        }
      };

      const onMove = (e) => {
        if (!dragging) return;
        const dy = startY - e.clientY;
        angle = clamp(startAngle + dy * 1.4, cfg.min, cfg.max);
        render();
      };
      const onUp = () => {
        if (!dragging) return;
        dragging = false;
        if (cfg.detents || cfg.steps) {
          const list = cfg.detents || cfg.steps;
          const span = (cfg.max - cfg.min) / (list.length - 1);
          angle = cfg.min + Math.round((angle - cfg.min) / span) * span;
        }
        render();
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };
      knob.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        dragging = true;
        startY = e.clientY;
        startAngle = angle;
        knob.classList.add("is-turning");
        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerup", onUp);
      });
      knob.addEventListener("pointerup", () => knob.classList.remove("is-turning"));
      knob.addEventListener("keydown", (e) => {
        const inc = e.key === "ArrowUp" || e.key === "ArrowRight";
        const dec = e.key === "ArrowDown" || e.key === "ArrowLeft";
        if (!inc && !dec) return;
        e.preventDefault();
        const dir = inc ? 1 : -1;
        if (cfg.detents) {
          const span = (cfg.max - cfg.min) / (cfg.detents.length - 1);
          const idx = clamp(Math.round((angle - cfg.min) / span), 0, cfg.detents.length - 1);
          angle = cfg.min + clamp(idx + dir, 0, cfg.detents.length - 1) * span;
        } else if (cfg.steps) {
          const span = (cfg.max - cfg.min) / (cfg.steps.length - 1);
          const idx = clamp(Math.round((angle - cfg.min) / span), 0, cfg.steps.length - 1);
          angle = cfg.min + clamp(idx + dir, 0, cfg.steps.length - 1) * span;
        } else {
          angle = clamp(angle + dir * STEP, cfg.min, cfg.max);
        }
        render();
      });
      knob.style.cursor = "ns-resize";
      knob.style.touchAction = "none";
      render();
    });
  });
}

// ===========================================================================
// LINEAR — drag a thumb along a track (sliders, faders, scrubber, crossfader)
// ===========================================================================
const LINEAR = [
  {
    track: ".slider-track",
    thumb: ".slider-thumb",
    fill: ".slider-fill",
    value: ".slider-value",
    axis: "x",
  },
  { track: ".fader-h-track", thumb: ".fader-h-thumb", fill: ".fader-h-fill", axis: "x" },
  { track: ".scrubber-track", thumb: ".scrubber-thumb", fill: ".scrubber-fill", axis: "x" },
  { track: ".crossfader-track", thumb: ".crossfader-thumb", axis: "x", center: true },
  {
    track: ".fader-v-track",
    thumb: ".fader-v-thumb",
    fill: ".fader-v-fill",
    value: ".fader-v-value",
    axis: "y",
    fmt: (p) => (p >= 0.85 ? `+${Math.round((p - 0.85) * 40)}` : `${Math.round((p - 0.85) * 40)}`),
  },
  {
    track: ".dual-range-track",
    thumb: ".dual-range-thumb",
    fill: ".dual-range-fill",
    axis: "x",
    dual: true,
  },
];

function initLinear(container, signal) {
  LINEAR.forEach((cfg) => {
    container.querySelectorAll(cfg.track).forEach((track) => {
      if (!once(track, "linear")) return;
      const thumbs = [...track.querySelectorAll(cfg.thumb)];
      const fill = cfg.fill ? track.querySelector(cfg.fill) : null;
      const valEl = cfg.value
        ? track.parentElement?.querySelector(cfg.value) || container.querySelector(cfg.value)
        : null;
      if (!thumbs.length) return;

      const pctFromEvent = (e) => {
        const r = track.getBoundingClientRect();
        const p =
          cfg.axis === "x" ? (e.clientX - r.left) / r.width : 1 - (e.clientY - r.top) / r.height;
        return clamp(p, 0, 1);
      };
      const setThumb = (thumb, p) => {
        if (cfg.axis === "x") thumb.style.left = `${p * 100}%`;
        else thumb.style.bottom = `${p * 100}%`;
      };
      const renderFill = () => {
        if (!fill) return;
        if (cfg.dual) {
          const ps = thumbs.map((t) => parseFloat(t.style.left) || 0).sort((a, b) => a - b);
          fill.style.left = `${ps[0]}%`;
          fill.style.width = `${ps[1] - ps[0]}%`;
        } else if (cfg.axis === "x") {
          fill.style.width = `${parseFloat(thumbs[0].style.left) || 0}%`;
        } else {
          fill.style.height = `${parseFloat(thumbs[0].style.bottom) || 0}%`;
        }
      };
      const updateValue = (p) => {
        if (!valEl) return;
        const out = cfg.fmt ? cfg.fmt(p) : `${Math.round(p * 100)}`;
        valEl.textContent = out;
        signal?.(out);
      };

      const drag = (thumb) => (downEvt) => {
        downEvt.preventDefault();
        thumb.style.cursor = "grabbing";
        track.classList.add("is-sliding");
        const move = (e) => {
          const p = pctFromEvent(e);
          setThumb(thumb, p);
          renderFill();
          updateValue(p);
          thumb.setAttribute("aria-valuenow", Math.round(p * 100));
        };
        const up = () => {
          thumb.style.cursor = "grab";
          track.classList.remove("is-sliding");
          window.removeEventListener("pointermove", move);
          window.removeEventListener("pointerup", up);
        };
        window.addEventListener("pointermove", move);
        window.addEventListener("pointerup", up);
        move(downEvt);
      };

      thumbs.forEach((thumb) => {
        thumb.setAttribute("tabindex", "0");
        thumb.setAttribute("role", "slider");
        thumb.setAttribute("aria-valuemin", "0");
        thumb.setAttribute("aria-valuemax", "100");
        thumb.setAttribute("aria-valuenow", "0");
        thumb.style.touchAction = "none";
        thumb.addEventListener("pointerdown", drag(thumb));
        thumb.addEventListener("keydown", (e) => {
          const inc = e.key === "ArrowRight" || e.key === "ArrowUp";
          const dec = e.key === "ArrowLeft" || e.key === "ArrowDown";
          const toMin = e.key === "Home";
          const toMax = e.key === "End";
          if (!inc && !dec && !toMin && !toMax) return;
          e.preventDefault();
          const cur =
            cfg.axis === "x"
              ? (parseFloat(thumb.style.left) || 0) / 100
              : (parseFloat(thumb.style.bottom) || 0) / 100;
          const p = toMin ? 0 : toMax ? 1 : clamp(cur + (inc ? 0.05 : -0.05), 0, 1);
          setThumb(thumb, p);
          renderFill();
          updateValue(p);
          thumb.setAttribute("aria-valuenow", Math.round(p * 100));
        });
      });
      // click on the track jumps the nearest thumb
      track.style.touchAction = "none";
      track.addEventListener("pointerdown", (e) => {
        if (thumbs.includes(e.target) || e.target.closest(cfg.thumb)) return;
        const p = pctFromEvent(e);
        const nearest = thumbs.reduce((a, b) => {
          const pa = (parseFloat(a.style.left || a.style.bottom) || 0) / 100;
          const pb = (parseFloat(b.style.left || b.style.bottom) || 0) / 100;
          return Math.abs(pa - p) < Math.abs(pb - p) ? a : b;
        });
        drag(nearest)(e);
      });
    });
  });
}

// ===========================================================================
// GAUGE — needles sway idly and can be nudged by hover
// ===========================================================================
function initGauges(container) {
  const gauges = [
    { needle: ".gauge-full-needle", min: -120, max: 120, base: 30 },
    { needle: ".gauge-semi-needle", min: -60, max: 60, base: 0 },
  ];
  gauges.forEach((cfg) => {
    container.querySelectorAll(cfg.needle).forEach((needle) => {
      if (!once(needle, "gauge")) return;
      if (REDUCE_MOTION) return;
      const phase = Math.random() * Math.PI * 2;
      addTicker((t) => {
        const s = Math.sin(t * 0.0011 + phase) * 0.6 + Math.sin(t * 0.0037 + phase) * 0.25;
        const a = clamp(cfg.base + s * (cfg.max - cfg.base) * 0.7, cfg.min, cfg.max);
        needle.style.transform = `rotate(${a}deg)`;
      });
    });
  });
}

// ===========================================================================
// METER — idle ambient motion for bar/segment displays (the "alive" screens)
// ===========================================================================
const METER_BARS = [
  { bar: ".vu-bar", prop: "height", min: 20, max: 95 },
  { bar: ".eq-band", prop: "height", min: 12, max: 95 },
  { bar: ".signal-bar", prop: "height", min: 15, max: 100 },
  { bar: ".level-fill", prop: "width", min: 20, max: 92 },
];

function initMeters(container) {
  if (REDUCE_MOTION) return;
  METER_BARS.forEach((cfg) => {
    const bars = [...container.querySelectorAll(cfg.bar)];
    if (!bars.length) return;
    if (bars.some((b) => !once(b, "meter"))) return;
    const state = bars.map((b, i) => ({
      cur: parseFloat(b.style[cfg.prop]) || (cfg.min + cfg.max) / 2,
      tgt: cfg.min + Math.random() * (cfg.max - cfg.min),
      phase: i * 0.6,
    }));
    addTicker((t) => {
      bars.forEach((bar, i) => {
        const s = state[i];
        // wandering target with a musical-ish pulse
        const pulse = (Math.sin(t * 0.004 + s.phase) * 0.5 + 0.5) * (cfg.max - cfg.min);
        s.tgt = cfg.min + pulse * (0.6 + Math.random() * 0.4) * 0.5 + (cfg.max - cfg.min) * 0.2;
        s.cur += (s.tgt - s.cur) * 0.12;
        bar.style[cfg.prop] = cfg.prop === "opacity" ? s.cur.toFixed(2) : `${s.cur.toFixed(1)}%`;
      });
    });
  });
}

// ===========================================================================
// SELECT-ONE — pick a single item within a group
// ===========================================================================
const SELECT_GROUPS = [
  { group: ".segmented", item: ".segmented-item", active: "active" },
  { group: ".tab-bar", item: ".tab-item", active: "active" },
  { group: ".rack-panel", item: ".rack-slot", active: "active" },
  {
    group: "[data-radio-group]",
    item: ".radio-wrap",
    active: "selected",
    marker: ".radio-dot-outer",
  },
  { group: ".color-bar-picker", item: ".color-bar-swatch", active: "selected" },
  { group: ".film-strip", item: ".film-frame", active: "selected" },
  { group: ".media-grid", item: ".media-thumb", active: "selected" },
  { group: ".menu-list", item: ".menu-item", active: "active" },
  { group: ".menu-grid", item: ".menu-grid-item", active: "active" },
  { group: ".pagination", item: ".page-btn", active: "active", skipArrows: true },
];

function initSelectGroups(container, signal) {
  SELECT_GROUPS.forEach((cfg) => {
    container.querySelectorAll(cfg.group).forEach((group) => {
      if (!once(group, "selectone")) return;
      const items = [...group.querySelectorAll(cfg.item)];
      items.forEach((item) => {
        item.addEventListener("click", () => {
          if (cfg.skipArrows && !/^\d+$/.test(item.textContent.trim())) return;
          items.forEach((other) => {
            const t = cfg.marker ? other.querySelector(cfg.marker) : other;
            t?.classList.remove(cfg.active);
          });
          const t = cfg.marker ? item.querySelector(cfg.marker) : item;
          t?.classList.add(cfg.active);
          signal?.(item.textContent.trim());
        });
      });
    });
  });
}

// ===========================================================================
// MOMENTARY — press feedback for buttons (keyboard + ripple sheen)
// ===========================================================================
const MOMENTARY =
  ".push-btn,.gel-btn,.icon-btn,.keypad-btn,.clear-btn,.fn-btn,.rubber-btn,.clickwheel-btn," +
  ".transport-btn,.rocker-btn,.d-pad-btn,.page-btn";

function initMomentary(container) {
  container.querySelectorAll(MOMENTARY).forEach((btn) => {
    if (!once(btn, "momentary")) return;
    const press = () => {
      btn.classList.add("is-pressed");
      setTimeout(() => btn.classList.remove("is-pressed"), 120);
    };
    btn.addEventListener("pointerdown", press);
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") press();
    });
  });
}

// ===========================================================================
// TOGGLES & friends (kept from the original engine, lightly hardened)
// ===========================================================================
function initToggles(container) {
  container.querySelectorAll("[data-toggle]").forEach((el) => {
    if (!once(el, "toggle")) return;
    el.addEventListener("click", () => {
      const track = el.querySelector(".toggle-track, .slide-track");
      if (track) track.classList.toggle("on");
      const label = el.querySelector(".toggle-label, .slide-label");
      if (label && label.dataset.on) {
        const on = track?.classList.contains("on");
        label.textContent = on ? label.dataset.on : label.dataset.off || label.textContent;
      }
    });
  });
}
function initPowerToggle(container) {
  container.querySelectorAll("[data-power-toggle]").forEach((el) => {
    if (!once(el, "power")) return;
    el.addEventListener("click", () => el.classList.toggle("on"));
  });
}
function initDipSwitches(container) {
  container.querySelectorAll("[data-dip]").forEach((el) => {
    if (!once(el, "dip")) return;
    el.addEventListener("click", () => el.classList.toggle("on"));
  });
}
function initCheckboxes(container) {
  container.querySelectorAll("[data-checkbox]").forEach((el) => {
    if (!once(el, "check")) return;
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const box = el.querySelector(".led-check-box");
      if (box) box.classList.toggle("checked");
    });
  });
}
function initRadioButtons(container) {
  container.querySelectorAll("[data-radio-group]").forEach((group) => {
    if (!once(group, "radio")) return;
    group.querySelectorAll(".radio-wrap").forEach((radio) => {
      radio.addEventListener("click", () => {
        group.querySelectorAll(".radio-dot-outer").forEach((d) => d.classList.remove("selected"));
        radio.querySelector(".radio-dot-outer")?.classList.add("selected");
      });
    });
  });
}
function initRecButton(container) {
  container.querySelectorAll(".rec-btn").forEach((btn) => {
    if (!once(btn, "rec")) return;
    btn.addEventListener("click", () => {
      btn.classList.toggle("recording");
      const label = container.querySelector(".rec-label, [data-rec-label]");
      if (label) label.textContent = btn.classList.contains("recording") ? "RECORDING" : "STANDBY";
    });
  });
}
function initSteppers(container, signal) {
  container.querySelectorAll(".stepper").forEach((stepper) => {
    if (!once(stepper, "stepper")) return;
    const val = stepper.querySelector(".stepper-value, .stepper-val, [data-stepper-val]");
    if (!val) return;
    const set = (d) => {
      val.textContent = parseInt(val.textContent) + d;
      signal?.(val.textContent);
    };
    stepper.querySelectorAll("[data-stepper-inc], .stepper-btn").forEach((btn) => {
      const inc =
        btn.matches("[data-stepper-dec]") || /^[−-]$/.test(btn.textContent.trim()) ? -1 : 1;
      btn.addEventListener("click", () => set(inc));
    });
  });
}
function initRocker(container, signal) {
  container.querySelectorAll(".rocker").forEach((rocker) => {
    if (!once(rocker, "rocker")) return;
    rocker.querySelectorAll(".rocker-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const sib = rocker.parentElement?.querySelector("[data-rocker-val]");
        if (sib) {
          sib.textContent =
            parseInt(sib.textContent || "0") + (btn.classList.contains("plus") ? 1 : -1);
          signal?.(sib.textContent);
        }
      });
    });
  });
}
function initRackSlots(container) {
  container.querySelectorAll(".rack-panel").forEach((panel) => {
    if (!once(panel, "rack")) return;
    panel.querySelectorAll(".rack-slot").forEach((slot) => {
      slot.addEventListener("click", () => {
        panel.querySelectorAll(".rack-slot").forEach((s) => s.classList.remove("active"));
        slot.classList.add("active");
      });
    });
  });
}
function initSelects(container) {
  container.querySelectorAll(".select-wrap").forEach((wrap) => {
    if (!once(wrap, "select")) return;
    const trigger = wrap.querySelector(".select-trigger");
    // some specs ship an inline onclick on the trigger; only bind if absent
    if (trigger && !trigger.getAttribute("onclick")) {
      trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        wrap.classList.toggle("open");
      });
    }
    wrap.querySelectorAll(".select-option").forEach((opt) => {
      opt.addEventListener("click", () => {
        const triggerText = wrap.querySelector(".select-trigger span:first-child");
        wrap.querySelectorAll(".select-option").forEach((o) => o.classList.remove("selected"));
        opt.classList.add("selected");
        if (triggerText) triggerText.textContent = opt.textContent;
        wrap.classList.remove("open");
      });
    });
  });
  if (once(document.body, "selectOutside")) {
    document.addEventListener("click", (e) => {
      document.querySelectorAll(".select-wrap.open").forEach((wrap) => {
        if (!wrap.contains(e.target)) wrap.classList.remove("open");
      });
    });
  }
}
function initChips(container) {
  container.querySelectorAll(".chip").forEach((chip) => {
    if (!once(chip, "chip")) return;
    if (chip.closest(".status-chips")) return; // status chips are read-only
    chip.addEventListener("click", () => chip.classList.toggle("active"));
  });
}

// ===========================================================================
// CANVAS visualisers
// ===========================================================================
function initCanvasHistogram(container) {
  const canvas = container.querySelector("canvas[data-histogram], #histCanvas, .histogram-canvas");
  if (!canvas || !once(canvas, "hist")) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width,
    h = canvas.height;
  const seed = Math.random() * 10;
  ctx.fillStyle = "#0a0a0a";
  ctx.fillRect(0, 0, w, h);
  for (let x = 0; x < w; x++) {
    const v =
      Math.pow(Math.sin(x * 0.05 + seed) * 0.5 + 0.5, 0.8) * h * (0.6 + Math.random() * 0.4);
    const g = ctx.createLinearGradient(0, h, 0, h - v);
    g.addColorStop(0, "rgba(245,166,35,0.1)");
    g.addColorStop(1, "rgba(245,166,35,0.6)");
    ctx.fillStyle = g;
    ctx.fillRect(x, h - v, 1, v);
  }
}
function initCanvasWaveform(container) {
  const canvas = container.querySelector("canvas[data-waveform], #waveCanvas, .waveform-canvas");
  if (!canvas || !once(canvas, "wave")) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width,
    h = canvas.height;
  ctx.fillStyle = "#0a0a0a";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "rgba(102,255,102,0.6)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = 0; x < w; x++) {
    const y =
      h / 2 +
      Math.sin(x * 0.08) * (h * 0.3) +
      Math.sin(x * 0.03) * (h * 0.15) +
      (Math.random() - 0.5) * 8;
    x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.stroke();
}
function initCanvasOscilloscope(container) {
  const canvas = container.querySelector("canvas[data-oscilloscope], #oscCanvas");
  if (!canvas || !once(canvas, "osc")) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width,
    h = canvas.height;
  if (REDUCE_MOTION) {
    ctx.fillStyle = "#0e0c0a";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(102,255,102,0.8)";
    ctx.beginPath();
    for (let x = 0; x < w; x++) {
      const y = h / 2 + Math.sin(x * 0.06) * (h * 0.3);
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    return;
  }
  addTicker((time) => {
    ctx.fillStyle = "rgba(14,12,10,0.3)";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(102,255,102,0.8)";
    ctx.lineWidth = 1.5;
    ctx.shadowColor = "rgba(102,255,102,0.4)";
    ctx.shadowBlur = 4;
    ctx.beginPath();
    const t = time * 0.003;
    for (let x = 0; x < w; x++) {
      const y =
        h / 2 + Math.sin(x * 0.06 + t) * (h * 0.3) + Math.sin(x * 0.15 + t * 1.5) * (h * 0.1);
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;
  });
}

// ===========================================================================
// IRIS / SHUTTER (kept from original)
// ===========================================================================
function initIris(container) {
  container.querySelectorAll("[data-iris]").forEach((el) => {
    if (!once(el, "iris")) return;
    el.addEventListener("click", () => {
      const blades = el.querySelector(".iris-blades");
      if (!blades) return;
      const isOpen = blades.classList.contains("open");
      blades.classList.toggle("open", !isOpen);
      blades.classList.toggle("closed", isOpen);
      const wrap = el.closest(".iris-wrap") || el.closest(".component-block");
      const fstop = wrap?.querySelector("[data-iris-fstop]");
      if (fstop) fstop.textContent = isOpen ? "f/16" : "f/1.4";
    });
  });
}
function initShutter(container) {
  container.querySelectorAll("[data-shutter]").forEach((el) => {
    if (!once(el, "shutter")) return;
    el.addEventListener("click", () => {
      const doors = el.querySelector(".shutter-doors");
      if (!doors) return;
      const isOpen = doors.classList.contains("open");
      doors.classList.toggle("open", !isOpen);
      doors.classList.toggle("closed", isOpen);
      const wrap = el.closest(".iris-wrap") || el.closest(".component-block");
      const label = wrap?.querySelector("[data-shutter-label]");
      if (label) label.textContent = isOpen ? "CLOSED" : "OPEN";
    });
  });
}

// ===========================================================================
// Master init — scans a container and wires everything
// ===========================================================================
export function initAll(container) {
  if (!container) return;
  clearTickers();
  const signal = emit(container.closest(".playground") || container);

  // touch controls
  initRotary(container, signal);
  initLinear(container, signal);
  initSteppers(container, signal);
  initRocker(container, signal);
  initMomentary(container);

  // toggles & selection
  initToggles(container);
  initPowerToggle(container);
  initDipSwitches(container);
  initCheckboxes(container);
  initRadioButtons(container);
  initRecButton(container);
  initSelectGroups(container, signal);
  initRackSlots(container);
  initSelects(container);
  initChips(container);

  // living displays
  initGauges(container);
  initMeters(container);
  initCanvasHistogram(container);
  initCanvasWaveform(container);
  initCanvasOscilloscope(container);

  // optical mechanisms
  initIris(container);
  initShutter(container);
}

// alias for forward-looking call sites
export const mountAll = initAll;
