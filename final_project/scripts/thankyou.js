// ==========================================================================
// 6 Alert Investment Company — thank-you page
// Reads the most recent form submission from sessionStorage and displays it.
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  const summary = document.getElementById("summaryList");
  const nameSpan = document.getElementById("submitterName");
  const fallback = document.getElementById("noSubmission");

  const raw = sessionStorage.getItem("sixAlertSubmission");

  if (!raw) {
    summary.hidden = true;
    fallback.hidden = false;
    const nameWrap = document.getElementById("submitterNameWrap");
    if (nameWrap) nameWrap.hidden = true;
    const msgHeading = document.querySelector('main h3');
    if (msgHeading) msgHeading.hidden = true;
    return;
  }

  const data = JSON.parse(raw);

  if (nameSpan) {
    nameSpan.textContent = data.fullName.split(" ")[0] || data.fullName;
  }

  const submittedDate = new Date(data.submittedAt);
  const formattedDate = submittedDate.toLocaleString(undefined, {
    dateStyle: "long",
    timeStyle: "short",
  });

  const rows = [
    { label: "Full name", value: data.fullName },
    { label: "Email", value: data.email },
    { label: "Phone", value: data.phone || "Not provided" },
    { label: "Plan of interest", value: data.interest },
    { label: "Planned investment", value: `$${Number(data.amount).toLocaleString()}` },
    { label: "Preferred contact method", value: data.contactMethod },
    { label: "Updates subscription", value: data.updates ? "Subscribed" : "Not subscribed" },
    { label: "Submitted", value: formattedDate },
  ];

  summary.innerHTML = rows
    .map(
      (row) => `
        <div>
          <dt>${row.label}</dt>
          <dd>${row.value}</dd>
        </div>`
    )
    .join("");

  const messageBlock = document.getElementById("submittedMessage");
  if (messageBlock) messageBlock.textContent = data.message;
});