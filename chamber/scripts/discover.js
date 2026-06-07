import { places } from "../data/places.mjs";

const cardsContainer = document.querySelector("#cards");
const visitMessage = document.querySelector("#visitMessage");

/* =========================
   VISIT MESSAGE LOGIC
========================= */

const now = Date.now();
const lastVisit = localStorage.getItem("lastVisit");

let message = "";

if (!lastVisit) {
  message = "Welcome! Let us know if you have any questions.";
} else {
  const diffTime = now - Number(lastVisit);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 1) {
    message = "Back so soon! Awesome!";
  } else if (diffDays === 1) {
    message = "You last visited 1 day ago.";
  } else {
    message = `You last visited ${diffDays} days ago.`;
  }
}

visitMessage.textContent = message;
localStorage.setItem("lastVisit", now);

/* =========================
   BUILD CARDS (ALL PLACES)
========================= */

places.forEach((place) => {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <h2>${place.name}</h2>

    <figure>
      <img 
        src="${place.image}" 
        alt="${place.name}" 
        loading="lazy"
      >
    </figure>

    <address>${place.address}</address>

    <p>${place.description}</p>

    <button>Learn More</button>
  `;

  cardsContainer.appendChild(card);
});