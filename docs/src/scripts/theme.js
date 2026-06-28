// Theme toggle persistence
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeIcon = document.querySelector("[data-theme-icon]");

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("pudge-theme", theme);
  if (themeIcon) themeIcon.textContent = theme === "light" ? "●" : "◐";
}

// Init from current state
setTheme(document.documentElement.dataset.theme || "dark");

themeToggle?.addEventListener("click", () => {
  setTheme(document.documentElement.dataset.theme === "light" ? "dark" : "light");
});

// Export for use by shortcuts
window.__pudgeToggleTheme = () => {
  setTheme(document.documentElement.dataset.theme === "light" ? "dark" : "light");
};
