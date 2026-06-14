// ==========================================================================
// 6 Alert Investment Company — services page
// Loads investment plan data from JSON and renders cards + a modal dialog.
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("servicesGrid");
  const overlay = document.getElementById("planModal");
  const modal = overlay.querySelector(".modal");
  const closeBtn = overlay.querySelector(".modal-close");

  let lastFocused = null;

  const riskClass = {
    low: "risk-low",
    moderate: "risk-moderate",
    high: "risk-high",
  };

  fetch("data/investments.json")
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not OK");
      return response.json();
    })
    .then((plans) => renderPlans(plans))
    .catch((err) => {
      const loadingMsg = document.getElementById("loadingMsg");
      if (loadingMsg) loadingMsg.remove();
      grid.innerHTML = `<p class="error-msg">Sorry, the investment plans could not be loaded right now. Please refresh the page or contact us directly. (${err.message})</p>`;
    });

  function renderPlans(plans) {
    const loadingMsg = document.getElementById("loadingMsg");
    if (loadingMsg) loadingMsg.remove();

    grid.innerHTML = "";
    plans.forEach((plan) => {
      const card = document.createElement("article");
      card.className = "plan-card";

      card.innerHTML = `
        <p class="plan-tier">${plan.step}</p>
        <h3>${plan.name}</h3>
        <span class="risk-tag ${riskClass[plan.risk]}">${plan.riskLabel}</span>
        <dl class="plan-meta">
          <div>
            <dt>Minimum</dt>
            <dd>${plan.minInvestment}</dd>
          </div>
          <div>
            <dt>Est. Return</dt>
            <dd>${plan.returnRange.split(" ")[0]} &ndash; ${plan.returnRange.split(" ")[2]}</dd>
          </div>
        </dl>
        <p>${plan.summary}</p>
        <button type="button" class="btn btn--navy" data-plan="${plan.id}">View plan details</button>
      `;

      card.querySelector("button").addEventListener("click", (e) => openModal(plan, e.currentTarget));
      grid.appendChild(card);
    });
  }

  function openModal(plan, trigger) {
    lastFocused = trigger;

    modal.innerHTML = `
      <button type="button" class="modal-close" aria-label="Close dialog">&times;</button>
      <p class="plan-tier">${plan.step}</p>
      <h2 id="modalTitle">${plan.name}</h2>
      <span class="risk-tag ${riskClass[plan.risk]}">${plan.riskLabel}</span>
      <p>${plan.details}</p>
      <dl>
        <div>
          <dt>Minimum Investment</dt>
          <dd>${plan.minInvestment}</dd>
        </div>
        <div>
          <dt>Estimated Return</dt>
          <dd>${plan.returnRange}</dd>
        </div>
        <div>
          <dt>Term</dt>
          <dd>${plan.term}</dd>
        </div>
        <div>
          <dt>Ideal For</dt>
          <dd>${plan.idealFor}</dd>
        </div>
      </dl>
      <h3>What's included</h3>
      <ul>
        ${plan.highlights.map((item) => `<li>${item}</li>`).join("")}
      </ul>
      <a class="btn btn--gold btn--block" href="contact.html">Ask about this plan</a>
    `;

    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // Re-attach close button listener (modal content was rebuilt)
    overlay.querySelector(".modal-close").addEventListener("click", closeModal);

    // Move focus into the dialog
    overlay.querySelector(".modal-close").focus();
  }

  function closeModal() {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  // Close on overlay click (outside the modal box)
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  // Close on Escape, and trap focus inside the dialog while open
  document.addEventListener("keydown", (e) => {
    if (!overlay.classList.contains("is-open")) return;

    if (e.key === "Escape") {
      closeModal();
      return;
    }

    if (e.key === "Tab") {
      const focusable = modal.querySelectorAll(
        "a, button, input, select, textarea, [tabindex]:not([tabindex='-1'])"
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
});