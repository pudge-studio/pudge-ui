// Enhanced search with fuzzy matching, keyboard navigation, recent searches
(function () {
  const backdrop = document.getElementById("search-backdrop");
  const input = document.getElementById("search-input");
  const resultsEl = document.getElementById("search-results");
  const dataEl = document.getElementById("site-search-data");
  if (!backdrop || !input || !resultsEl || !dataEl) return;

  const items = JSON.parse(dataEl.textContent || "[]");
  let focusedIndex = -1;
  let currentResults = [];

  // Simple scoring: title match = 3, type match = 2, text match = 1
  function score(item, query) {
    const q = query.toLowerCase();
    let s = 0;
    if (item.title.toLowerCase().includes(q)) s += 3;
    if (item.type.toLowerCase().includes(q)) s += 2;
    if (item.text.toLowerCase().includes(q)) s += 1;
    // Bonus for starts-with on title
    if (item.title.toLowerCase().startsWith(q)) s += 2;
    return s;
  }

  function search(query) {
    const q = query.trim();
    if (!q) {
      // Show recent or first 10
      const recent = getRecent();
      if (recent.length > 0) {
        return {
          results: recent.map((r) => items.find((i) => i.href === r)).filter(Boolean),
          isRecent: true,
        };
      }
      return { results: items.slice(0, 10), isRecent: false };
    }
    const scored = items
      .map((item) => ({ item, score: score(item, q) }))
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 15)
      .map((s) => s.item);
    return { results: scored, isRecent: false };
  }

  function getRecent() {
    try {
      return JSON.parse(localStorage.getItem("pudge-search-recent") || "[]");
    } catch {
      return [];
    }
  }

  function addRecent(href) {
    const recent = getRecent().filter((r) => r !== href);
    recent.unshift(href);
    localStorage.setItem("pudge-search-recent", JSON.stringify(recent.slice(0, 5)));
  }

  // Group results by type
  function groupResults(results) {
    const groups = {};
    const order = ["Guide", "Foundation", "Directory"];
    for (const r of results) {
      const type = order.includes(r.type) ? r.type : "Component";
      if (!groups[type]) groups[type] = [];
      groups[type].push(r);
    }
    return groups;
  }

  function render(query) {
    const { results, isRecent } = search(query);
    currentResults = results;
    focusedIndex = -1;

    if (results.length === 0) {
      resultsEl.innerHTML = "";
      return;
    }

    const groups = groupResults(results);
    let html = "";

    if (isRecent) {
      html += '<div class="search-recent__title">Recent</div>';
    }

    for (const [type, items] of Object.entries(groups)) {
      if (!isRecent) {
        html += `<div class="search-group__label">${type}</div>`;
      }
      for (const item of items) {
        const idx = currentResults.indexOf(item);
        html += `
          <a class="search-result" href="${item.href}" data-search-idx="${idx}">
            <span class="search-result__badge">${item.type}</span>
            <span class="search-result__title">${item.title}</span>
          </a>`;
      }
    }

    resultsEl.innerHTML = html;
  }

  function setFocus(idx) {
    const links = resultsEl.querySelectorAll(".search-result");
    links.forEach((l) => l.classList.remove("is-focused"));
    focusedIndex = Math.max(-1, Math.min(idx, links.length - 1));
    if (focusedIndex >= 0 && links[focusedIndex]) {
      links[focusedIndex].classList.add("is-focused");
      links[focusedIndex].scrollIntoView({ block: "nearest" });
    }
  }

  // Open / Close
  window.__pudgeOpenSearch = function () {
    backdrop.classList.add("is-open");
    render(input.value);
    requestAnimationFrame(() => input.focus());
  };

  window.__pudgeCloseSearch = function () {
    backdrop.classList.remove("is-open");
    input.value = "";
    focusedIndex = -1;
  };

  function isSearchOpen() {
    return backdrop.classList.contains("is-open");
  }

  document.querySelectorAll("[data-open-search]").forEach((el) => {
    el.addEventListener("click", window.__pudgeOpenSearch);
  });

  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) window.__pudgeCloseSearch();
  });

  input.addEventListener("input", () => render(input.value));

  input.addEventListener("keydown", (e) => {
    const links = resultsEl.querySelectorAll(".search-result");
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocus(focusedIndex + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocus(focusedIndex - 1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (focusedIndex >= 0 && links[focusedIndex]) {
        const href = links[focusedIndex].getAttribute("href");
        if (href) {
          addRecent(href);
          window.location.href = href;
        }
      }
    } else if (e.key === "Escape") {
      window.__pudgeCloseSearch();
    }
  });

  // Click on result
  resultsEl.addEventListener("click", (e) => {
    const link = e.target.closest(".search-result");
    if (link) {
      const href = link.getAttribute("href");
      if (href) addRecent(href);
    }
  });

  // Hover to focus
  resultsEl.addEventListener("mouseover", (e) => {
    const link = e.target.closest(".search-result");
    if (link) {
      const idx = parseInt(link.dataset.searchIdx || "-1");
      if (idx >= 0) setFocus(idx);
    }
  });
})();
