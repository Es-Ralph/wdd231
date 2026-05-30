// Timestamp
document.getElementById("timestamp").value = new Date().toISOString();

// Open modal
document.querySelectorAll("[data-modal]").forEach(btn => {
  btn.addEventListener("click", () => {
    document.getElementById(btn.dataset.modal).showModal();
  });
});

// Close modal
document.querySelectorAll(".close").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.closest("dialog").close();
  });
});