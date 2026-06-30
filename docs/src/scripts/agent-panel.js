// Agent panel — the agentic analog of a code playground.
// Builds a stack-tailored prompt (and MCP call) from the live variant state,
// so a visitor can hand this exact component to their coding agent.
(function () {
  const panel = document.getElementById("build");
  if (!panel) return;

  const id = panel.dataset.compId;
  const name = panel.dataset.compName;
  const stackBtns = [...panel.querySelectorAll(".agent-stack")];
  const promptOut = panel.querySelector("[data-prompt-out]");
  const mcpOut = panel.querySelector("[data-mcp-out]");
  const copyBtn = panel.querySelector("[data-agent-copy]");

  let stack = { id: stackBtns[0]?.dataset.stack, label: stackBtns[0]?.dataset.stackLabel };

  // read the playground's active variant chips so the prompt matches what
  // the visitor is looking at
  function variants() {
    const out = {};
    document.querySelectorAll(".playground__controls [data-variant-group]").forEach((g) => {
      const active = g.querySelector(".variant-btn.is-active");
      const v = active?.dataset.variantValue;
      if (v && v !== "default") out[g.dataset.variantGroup] = v;
    });
    return out;
  }

  function variantLine() {
    const v = variants();
    const parts = [];
    if (v.size) parts.push(`size ${v.size}`);
    if (v.material) parts.push(`${v.material} material`);
    if (v.state) parts.push(`${v.state} state`);
    return parts.length ? parts.join(", ") : "default variant";
  }

  function buildPrompt() {
    return [
      `Build the "${name}" component in ${stack.label} using the pudge-ui spec.`,
      ``,
      `Variant: ${variantLine()}.`,
      ``,
      `Requirements:`,
      `- Reproduce the physical analog and the exact CSS recipe in the spec.`,
      `- Honor every rule in the Constraints section — they rule out the "close but wrong" version.`,
      `- Make it idiomatic for ${stack.label}; keep the skeuomorphic depth and motion.`,
      ``,
      `Paste the full pudge-ui spec (foundation + component) with this prompt, or fetch it`,
      `from the pudge-ui MCP server with get_component("${id}").`,
    ].join("\n");
  }

  function buildMcp() {
    return [
      `# Requires the pudge-ui MCP server:`,
      `#   npx -y @pudge-ui/mcp-server`,
      ``,
      `Use the pudge-ui MCP server.`,
      `1. Call get_component with name "${id}".`,
      `2. Build the returned spec in ${stack.label} (variant: ${variantLine()}).`,
      `3. Follow the foundation + constraints exactly.`,
    ].join("\n");
  }

  function render() {
    if (promptOut) promptOut.textContent = buildPrompt();
    if (mcpOut) mcpOut.textContent = buildMcp();
  }

  // stack selection
  stackBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      stackBtns.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      stack = { id: btn.dataset.stack, label: btn.dataset.stackLabel };
      render();
    });
  });

  // prompt / mcp tabs
  panel.querySelectorAll(".agent-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.atab;
      panel.querySelectorAll(".agent-tab").forEach((t) => t.classList.remove("is-active"));
      panel.querySelectorAll(".agent-panel__out").forEach((p) => p.classList.remove("is-active"));
      tab.classList.add("is-active");
      panel.querySelector(`[data-apanel="${target}"]`)?.classList.add("is-active");
      copyBtn.textContent = target === "mcp" ? "Copy MCP call" : "Copy prompt";
    });
  });

  // copy the visible panel
  copyBtn?.addEventListener("click", async () => {
    const active = panel.querySelector(".agent-panel__out.is-active code");
    await navigator.clipboard.writeText(active?.textContent || "");
    const original = copyBtn.textContent;
    copyBtn.textContent = "Copied!";
    copyBtn.classList.add("is-copied");
    setTimeout(() => {
      copyBtn.textContent = original;
      copyBtn.classList.remove("is-copied");
    }, 1500);
  });

  // keep the prompt in sync when the visitor changes a variant in the playground
  document.querySelectorAll(".playground__controls .variant-btn").forEach((b) => {
    b.addEventListener("click", () => requestAnimationFrame(render));
  });

  render();
})();
