// Auto-attach copy buttons to all <pre><code> blocks site-wide
(function () {
  document.querySelectorAll("pre").forEach((pre) => {
    // Skip if already has a copy button (playground code blocks handle their own)
    if (pre.closest(".code-block") || pre.querySelector(".copy-code-btn")) return;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "copy-code-btn";
    btn.textContent = "Copy";
    btn.setAttribute("aria-label", "Copy code to clipboard");

    btn.addEventListener("click", async () => {
      const code = pre.querySelector("code")?.textContent || pre.textContent || "";
      try {
        await navigator.clipboard.writeText(code);
        btn.textContent = "Copied!";
        btn.classList.add("is-copied");
        setTimeout(() => {
          btn.textContent = "Copy";
          btn.classList.remove("is-copied");
        }, 1500);
      } catch {
        btn.textContent = "Failed";
        setTimeout(() => {
          btn.textContent = "Copy";
        }, 1500);
      }
    });

    pre.style.position = "relative";
    pre.appendChild(btn);
  });
})();
