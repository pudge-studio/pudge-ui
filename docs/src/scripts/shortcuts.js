// Global keyboard shortcuts with chord support
(function () {
  let chordKey = null;
  let chordTimeout = null;

  function isTyping(target) {
    return (
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      target?.isContentEditable
    );
  }

  function clearChord() {
    chordKey = null;
    if (chordTimeout) clearTimeout(chordTimeout);
    chordTimeout = null;
  }

  function startChord(key) {
    chordKey = key;
    chordTimeout = setTimeout(clearChord, 500);
  }

  // Navigate helpers
  function navigateTo(href) {
    window.location.href = href;
  }

  function getComponentNav() {
    const links = document.querySelectorAll("[data-sidebar-cat] .sidebar-link");
    const hrefs = Array.from(links)
      .map((l) => l.getAttribute("href"))
      .filter(Boolean);
    const current = window.location.pathname.replace(/\/$/, "");
    const idx = hrefs.findIndex((h) => h.replace(/\/$/, "") === current);
    return { hrefs, idx };
  }

  // Shortcuts overlay
  function toggleShortcutsOverlay() {
    let overlay = document.getElementById("shortcuts-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "shortcuts-overlay";
      overlay.className = "shortcuts-overlay";
      overlay.innerHTML = `
        <div class="shortcuts-panel">
          <div class="shortcuts-panel__title">KEYBOARD SHORTCUTS</div>

          <div class="shortcuts-panel__group">
            <div class="shortcuts-panel__group-title">General</div>
            <div class="shortcut-row"><span class="shortcut-row__desc">Search</span><span class="shortcut-row__keys"><kbd>/</kbd> or <kbd>⌘K</kbd></span></div>
            <div class="shortcut-row"><span class="shortcut-row__desc">Toggle theme</span><span class="shortcut-row__keys"><kbd>t</kbd></span></div>
            <div class="shortcut-row"><span class="shortcut-row__desc">Close overlay</span><span class="shortcut-row__keys"><kbd>Esc</kbd></span></div>
            <div class="shortcut-row"><span class="shortcut-row__desc">Show shortcuts</span><span class="shortcut-row__keys"><kbd>?</kbd></span></div>
          </div>

          <div class="shortcuts-panel__group">
            <div class="shortcuts-panel__group-title">Navigation</div>
            <div class="shortcut-row"><span class="shortcut-row__desc">Go home</span><span class="shortcut-row__keys"><kbd>g</kbd> <kbd>h</kbd></span></div>
            <div class="shortcut-row"><span class="shortcut-row__desc">Go to components</span><span class="shortcut-row__keys"><kbd>g</kbd> <kbd>c</kbd></span></div>
            <div class="shortcut-row"><span class="shortcut-row__desc">Go to getting started</span><span class="shortcut-row__keys"><kbd>g</kbd> <kbd>s</kbd></span></div>
            <div class="shortcut-row"><span class="shortcut-row__desc">Go to foundation</span><span class="shortcut-row__keys"><kbd>g</kbd> <kbd>f</kbd></span></div>
          </div>

          <div class="shortcuts-panel__group">
            <div class="shortcuts-panel__group-title">Component Pages</div>
            <div class="shortcut-row"><span class="shortcut-row__desc">Next component</span><span class="shortcut-row__keys"><kbd>j</kbd></span></div>
            <div class="shortcut-row"><span class="shortcut-row__desc">Previous component</span><span class="shortcut-row__keys"><kbd>k</kbd></span></div>
            <div class="shortcut-row"><span class="shortcut-row__desc">Next variant</span><span class="shortcut-row__keys"><kbd>]</kbd></span></div>
            <div class="shortcut-row"><span class="shortcut-row__desc">Previous variant</span><span class="shortcut-row__keys"><kbd>[</kbd></span></div>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);

      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeShortcutsOverlay();
      });
    }

    overlay.classList.toggle("is-open");
  }

  function closeShortcutsOverlay() {
    const overlay = document.getElementById("shortcuts-overlay");
    overlay?.classList.remove("is-open");
  }

  document.addEventListener("keydown", (e) => {
    const target = e.target;
    const typing = isTyping(target);

    // Escape always works
    if (e.key === "Escape") {
      window.__pudgeCloseSearch?.();
      closeShortcutsOverlay();

      // Close mobile menu
      document.getElementById("site-sidebar")?.classList.remove("is-open");
      document.getElementById("mobile-overlay")?.classList.remove("is-visible");
      clearChord();
      return;
    }

    // Don't intercept when typing in inputs
    if (typing) return;

    // Cmd+K / Ctrl+K — always open search
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      window.__pudgeOpenSearch?.();
      clearChord();
      return;
    }

    // Handle chord completions
    if (chordKey === "g") {
      clearChord();
      switch (e.key) {
        case "h":
          navigateTo("/");
          return;
        case "c":
          navigateTo("/components");
          return;
        case "s":
          navigateTo("/getting-started");
          return;
        case "f":
          navigateTo("/foundation");
          return;
      }
      return;
    }

    // Single-key shortcuts
    switch (e.key) {
      case "/":
        e.preventDefault();
        window.__pudgeOpenSearch?.();
        break;
      case "t":
        window.__pudgeToggleTheme?.();
        break;
      case "?":
        toggleShortcutsOverlay();
        break;
      case "g":
        startChord("g");
        break;
      case "j": {
        const { hrefs, idx } = getComponentNav();
        if (hrefs.length > 0 && idx >= 0 && idx < hrefs.length - 1) {
          navigateTo(hrefs[idx + 1]);
        }
        break;
      }
      case "k": {
        const { hrefs, idx } = getComponentNav();
        if (hrefs.length > 0 && idx > 0) {
          navigateTo(hrefs[idx - 1]);
        }
        break;
      }
      case "]": {
        // Next variant in playground
        const activeBtn = document.querySelector(".playground__controls .variant-btn.is-active");
        const next = activeBtn?.nextElementSibling;
        if (next?.classList.contains("variant-btn")) {
          next.click();
        }
        break;
      }
      case "[": {
        // Previous variant in playground
        const activeBtn = document.querySelector(".playground__controls .variant-btn.is-active");
        const prev = activeBtn?.previousElementSibling;
        if (prev?.classList.contains("variant-btn")) {
          prev.click();
        }
        break;
      }
    }
  });
})();
