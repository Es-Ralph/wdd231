// ==========================================================================
// 6 Alert Investment Company — contact form
// Validates the inquiry form, stores the submission, and redirects to
// thankyou.html, which reads the data back out.
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;

    const fields = [
      { id: "fullName", check: (v) => v.trim().length >= 2, message: "Please enter your full name." },
      {
        id: "email",
        check: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
        message: "Please enter a valid email address.",
      },
      {
        id: "amount",
        check: (v) => v.trim() !== "" && Number(v) >= 50,
        message: "Enter a planned investment amount of at least $50.",
      },
      {
        id: "interest",
        check: (v) => v.trim() !== "",
        message: "Please choose an investment plan you're interested in.",
      },
      {
        id: "message",
        check: (v) => v.trim().length >= 10,
        message: "Please add a short message (at least 10 characters).",
      },
    ];

    fields.forEach(({ id, check, message }) => {
      const input = document.getElementById(id);
      const row = input.closest(".form-row");
      const errorEl = row.querySelector(".error-text");

      if (!check(input.value)) {
        row.classList.add("has-error");
        errorEl.textContent = message;
        isValid = false;
      } else {
        row.classList.remove("has-error");
      }
    });

    // Contact method (radio group)
    const contactMethod = form.querySelector('input[name="contactMethod"]:checked');
    const radioRow = document.getElementById("contactMethodRow");
    if (!contactMethod) {
      radioRow.classList.add("has-error");
      radioRow.querySelector(".error-text").textContent = "Please choose a preferred contact method.";
      isValid = false;
    } else {
      radioRow.classList.remove("has-error");
    }

    if (!isValid) {
      const firstError = form.querySelector(".has-error");
      if (firstError) firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    // Build a plain-language summary for the thank-you page
    const submission = {
      fullName: document.getElementById("fullName").value.trim(),
      email: document.getElementById("email").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      interest: document.getElementById("interest").value,
      amount: document.getElementById("amount").value.trim(),
      contactMethod: contactMethod.value,
      message: document.getElementById("message").value.trim(),
      updates: document.getElementById("updates").checked,
      submittedAt: new Date().toISOString(),
    };

    sessionStorage.setItem("sixAlertSubmission", JSON.stringify(submission));
    window.location.href = "thankyou.html";
  });
});