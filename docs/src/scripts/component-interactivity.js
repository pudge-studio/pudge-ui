// Component interactivity — extracted from pudge-ui component demos
// All functions are scoped to a container element for playground isolation.

export function initToggles(container) {
  container.querySelectorAll("[data-toggle]").forEach((el) => {
    el.addEventListener("click", () => {
      const track = el.querySelector(".toggle-track, .slide-track");
      if (track) track.classList.toggle("on");
    });
  });
}

export function initPowerToggle(container) {
  container.querySelectorAll("[data-power-toggle]").forEach((el) => {
    el.addEventListener("click", () => el.classList.toggle("on"));
  });
}

export function initDipSwitches(container) {
  container.querySelectorAll("[data-dip]").forEach((el) => {
    el.addEventListener("click", () => el.classList.toggle("on"));
  });
}

export function initCheckboxes(container) {
  container.querySelectorAll("[data-checkbox]").forEach((el) => {
    el.addEventListener("click", () => {
      const box = el.querySelector(".led-check-box");
      if (box) box.classList.toggle("checked");
    });
  });
}

export function initRadioButtons(container) {
  container.querySelectorAll("[data-radio-group]").forEach((group) => {
    group.querySelectorAll(".radio-wrap").forEach((radio) => {
      radio.addEventListener("click", () => {
        group.querySelectorAll(".radio-dot-outer").forEach((d) => d.classList.remove("selected"));
        const dot = radio.querySelector(".radio-dot-outer");
        if (dot) dot.classList.add("selected");
      });
    });
  });
}

export function initRecButton(container) {
  container.querySelectorAll(".rec-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("recording");
      const label = container.querySelector(".rec-label, [data-rec-label]");
      if (label) label.textContent = btn.classList.contains("recording") ? "RECORDING" : "STANDBY";
    });
  });
}

export function initSegmented(container) {
  container.querySelectorAll(".segmented").forEach((seg) => {
    seg.querySelectorAll(".segmented-item").forEach((item) => {
      item.addEventListener("click", () => {
        seg.querySelectorAll(".segmented-item").forEach((i) => i.classList.remove("active"));
        item.classList.add("active");
      });
    });
  });
}

export function initTabBars(container) {
  container.querySelectorAll(".tab-bar").forEach((bar) => {
    bar.querySelectorAll(".tab-item").forEach((tab) => {
      tab.addEventListener("click", () => {
        bar.querySelectorAll(".tab-item").forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
      });
    });
  });
}

export function initSteppers(container) {
  container.querySelectorAll(".stepper").forEach((stepper) => {
    const val = stepper.querySelector(".stepper-val, [data-stepper-val]");
    if (!val) return;
    stepper.querySelectorAll("[data-stepper-inc]").forEach((btn) => {
      btn.addEventListener("click", () => {
        val.textContent = parseInt(val.textContent) + 1;
      });
    });
    stepper.querySelectorAll("[data-stepper-dec]").forEach((btn) => {
      btn.addEventListener("click", () => {
        val.textContent = parseInt(val.textContent) - 1;
      });
    });
  });
}

export function initRackSlots(container) {
  container.querySelectorAll(".rack-panel").forEach((panel) => {
    panel.querySelectorAll(".rack-slot").forEach((slot) => {
      slot.addEventListener("click", () => {
        panel.querySelectorAll(".rack-slot").forEach((s) => s.classList.remove("active"));
        slot.classList.add("active");
      });
    });
  });
}

export function initSelects(container) {
  container.querySelectorAll(".select-trigger").forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const wrap = trigger.closest(".select-wrap");
      if (wrap) wrap.classList.toggle("open");
    });
  });

  container.querySelectorAll(".select-option").forEach((opt) => {
    opt.addEventListener("click", () => {
      const wrap = opt.closest(".select-wrap");
      const triggerText = wrap?.querySelector(".select-trigger span:first-child");
      wrap?.querySelectorAll(".select-option").forEach((o) => o.classList.remove("selected"));
      opt.classList.add("selected");
      if (triggerText) triggerText.textContent = opt.textContent;
      wrap?.classList.remove("open");
    });
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    container.querySelectorAll(".select-wrap.open").forEach((wrap) => {
      if (!wrap.contains(e.target)) wrap.classList.remove("open");
    });
  });
}

export function initCanvasHistogram(container) {
  const canvas = container.querySelector("canvas[data-histogram], #histCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width,
    h = canvas.height;
  ctx.fillStyle = "#0a0a0a";
  ctx.fillRect(0, 0, w, h);
  for (let x = 0; x < w; x++) {
    const v = Math.pow(Math.sin(x * 0.05) * 0.5 + 0.5, 0.8) * h * (0.6 + Math.random() * 0.4);
    const g = ctx.createLinearGradient(0, h, 0, h - v);
    g.addColorStop(0, "rgba(245,166,35,0.1)");
    g.addColorStop(1, "rgba(245,166,35,0.6)");
    ctx.fillStyle = g;
    ctx.fillRect(x, h - v, 1, v);
  }
}

export function initCanvasWaveform(container) {
  const canvas = container.querySelector("canvas[data-waveform], #waveCanvas");
  if (!canvas) return;
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

export function initCanvasOscilloscope(container) {
  const canvas = container.querySelector("canvas[data-oscilloscope], #oscCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width,
    h = canvas.height;
  function draw() {
    ctx.fillStyle = "rgba(14,12,10,0.3)";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(102,255,102,0.8)";
    ctx.lineWidth = 1.5;
    ctx.shadowColor = "rgba(102,255,102,0.4)";
    ctx.shadowBlur = 4;
    ctx.beginPath();
    const t = Date.now() * 0.003;
    for (let x = 0; x < w; x++) {
      const y =
        h / 2 + Math.sin(x * 0.06 + t) * (h * 0.3) + Math.sin(x * 0.15 + t * 1.5) * (h * 0.1);
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;
    requestAnimationFrame(draw);
  }
  draw();
}

export function initIris(container) {
  container.querySelectorAll("[data-iris]").forEach((el) => {
    el.addEventListener("click", () => {
      const blades = el.querySelector(".iris-blades");
      if (!blades) return;
      const isOpen = blades.classList.contains("open");
      blades.classList.toggle("open", !isOpen);
      blades.classList.toggle("closed", isOpen);
      const wrap = el.closest(".iris-wrap") || el.closest(".component-block");
      if (wrap) {
        const fstop = wrap.querySelector("[data-iris-fstop]");
        if (fstop) fstop.textContent = isOpen ? "f/16" : "f/1.4";
      }
    });
  });

  container.querySelectorAll("[data-iris-shutter]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const block = btn.closest(".iris-wrap") || btn.closest(".component-block");
      const irisOuter = block?.querySelector("[data-iris]");
      if (!irisOuter) return;
      const blades = irisOuter.querySelector(".iris-blades");
      const fstop = block?.querySelector("[data-iris-fstop]");
      if (!blades) return;

      blades.classList.remove("open");
      blades.classList.add("closed");
      if (fstop) fstop.textContent = "f/16";

      setTimeout(() => {
        blades.classList.remove("closed");
        blades.classList.add("open");
        if (fstop) fstop.textContent = "f/1.4";
        setTimeout(() => {
          blades.classList.remove("open");
          blades.classList.add("closed");
          if (fstop) fstop.textContent = "f/16";
        }, 400);
      }, 200);
    });
  });
}

export function initShutter(container) {
  container.querySelectorAll("[data-shutter]").forEach((el) => {
    el.addEventListener("click", () => {
      const doors = el.querySelector(".shutter-doors");
      if (!doors) return;
      const isOpen = doors.classList.contains("open");
      doors.classList.toggle("open", !isOpen);
      doors.classList.toggle("closed", isOpen);
      const wrap = el.closest(".iris-wrap") || el.closest(".component-block");
      if (wrap) {
        const label = wrap.querySelector("[data-shutter-label]");
        if (label) label.textContent = isOpen ? "CLOSED" : "OPEN";
      }
    });
  });
}

// Master init — scans container and wires everything
export function initAll(container) {
  if (!container) return;
  initToggles(container);
  initPowerToggle(container);
  initDipSwitches(container);
  initCheckboxes(container);
  initRadioButtons(container);
  initRecButton(container);
  initSegmented(container);
  initTabBars(container);
  initSteppers(container);
  initRackSlots(container);
  initSelects(container);
  initCanvasHistogram(container);
  initCanvasWaveform(container);
  initCanvasOscilloscope(container);
  initIris(container);
  initShutter(container);
}
