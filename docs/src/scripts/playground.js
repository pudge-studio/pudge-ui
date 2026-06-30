// Playground — variant switching and component interactivity init
(function () {
  const stage = document.getElementById("playground-stage");
  if (!stage) return;

  import("./component-interactivity.js").then(({ initAll }) => {
    initAll(stage);
  });

  // Fade the affordance hint once the visitor starts interacting
  const markInteracted = () => stage.setAttribute("data-interacted", "1");
  stage.addEventListener("pointerdown", markInteracted, { once: true });

  // Variant switcher
  document.querySelectorAll(".playground__controls [data-variant-group]").forEach((group) => {
    const groupName = group.dataset.variantGroup;
    const buttons = group.querySelectorAll(".variant-btn");
    // Target the actual component element (first child inside the demo container),
    // not the container div itself. CSS classes like .xs, .rubber, .active
    // need to be on the component element.
    const container = stage.querySelector("[data-demo-element]");
    const demoEl = container?.firstElementChild || container;

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");

        if (!demoEl) return;

        const value = btn.dataset.variantValue || "";

        if (groupName === "size") {
          demoEl.className = demoEl.className.replace(/\b(xs|sm|md|lg|xl)\b/g, "").trim();
          if (value && value !== "md") {
            demoEl.classList.add(value);
          }
        } else if (groupName === "material") {
          demoEl.className = demoEl.className
            .replace(/\bvariant-\w+\b/g, "")
            .replace(/\b(rubber|glossy|chrome|glass|metal)\b/g, "")
            .trim();
          if (value && value !== "default") {
            demoEl.classList.add(value);
          }
        } else if (groupName === "state") {
          demoEl.className = demoEl.className
            .replace(/\b(active|disabled|error|pressed|recording|on|checked)\b/g, "")
            .trim();
          if (value && value !== "default") {
            demoEl.classList.add(value);
            if (value === "disabled") {
              demoEl.setAttribute("disabled", "");
            } else {
              demoEl.removeAttribute("disabled");
            }
          } else {
            demoEl.removeAttribute("disabled");
          }
        }

        // Reinit interactivity after class change
        import("./component-interactivity.js").then(({ initAll }) => {
          initAll(stage);
        });
      });
    });
  });

  // Code block tabs
  document.querySelectorAll(".code-block").forEach((block) => {
    const tabs = block.querySelectorAll(".code-block__tab");
    const panels = block.querySelectorAll(".code-block__panel");

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = tab.dataset.tab;
        tabs.forEach((t) => t.classList.remove("is-active"));
        panels.forEach((p) => p.classList.remove("is-active"));
        tab.classList.add("is-active");
        const targetPanel = block.querySelector(`[data-panel="${target}"]`);
        targetPanel?.classList.add("is-active");
      });
    });

    const copyBtn = block.querySelector(".code-block__copy");
    copyBtn?.addEventListener("click", async () => {
      const activePanel = block.querySelector(".code-block__panel.is-active");
      const code = activePanel?.querySelector("code")?.textContent || "";
      await navigator.clipboard.writeText(code);
      copyBtn.textContent = "Copied!";
      copyBtn.classList.add("is-copied");
      setTimeout(() => {
        copyBtn.textContent = "Copy";
        copyBtn.classList.remove("is-copied");
      }, 1500);
    });
  });

  // Copy HTML button
  const copyHtmlBtn = document.querySelector("[data-copy-html]");
  if (copyHtmlBtn) {
    copyHtmlBtn.addEventListener("click", async () => {
      const htmlData = document.getElementById("demo-html-data");
      if (htmlData) {
        await navigator.clipboard.writeText(JSON.parse(htmlData.textContent || '""'));
        copyHtmlBtn.textContent = "Copied!";
        copyHtmlBtn.classList.add("is-copied");
        setTimeout(() => {
          copyHtmlBtn.textContent = "Copy HTML";
          copyHtmlBtn.classList.remove("is-copied");
        }, 1500);
      }
    });
  }

  // Copy for LLM
  const copyLlmBtn = document.querySelector("[data-copy-llm]");
  if (copyLlmBtn) {
    copyLlmBtn.addEventListener("click", async () => {
      const foundationEl = document.getElementById("foundation-data");
      const specEl = document.getElementById("spec-data");
      if (foundationEl && specEl) {
        const foundation = JSON.parse(foundationEl.textContent || "{}").content || "";
        const specData = JSON.parse(specEl.textContent || "{}");
        const text = [
          "=== PUDGE-UI FOUNDATION ===",
          foundation,
          "",
          `=== COMPONENT SPEC: ${specData.name} ===`,
          specData.spec,
        ].join("\n");
        await navigator.clipboard.writeText(text);
        copyLlmBtn.textContent = "Copied!";
        copyLlmBtn.classList.add("is-copied");
        setTimeout(() => {
          copyLlmBtn.textContent = "Copy spec for LLM";
          copyLlmBtn.classList.remove("is-copied");
        }, 1500);
      }
    });
  }
})();
