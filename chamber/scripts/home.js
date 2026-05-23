// NAV MENU
const menu = document.querySelector("#menu");
const nav = document.querySelector("nav");

menu.addEventListener("click", () => {
    nav.classList.toggle("open");
});

// FOOTER
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// WEATHER (REPLACE YOUR API KEY)
const apiKey = "230e0f6bbeadda92bf26322d83c8e2c1";
const url = `https://api.openweathermap.org/data/2.5/forecast?q=Accra&units=metric&appid=${apiKey}`;

async function getWeather() {
    const response = await fetch(url);
    const data = await response.json();

    document.getElementById("temp").textContent =
        `Temp: ${data.list[0].main.temp}°C`;

    document.getElementById("desc").textContent =
        data.list[0].weather[0].description;

    const forecast = document.getElementById("forecast");

    for (let i = 8; i <= 24; i += 8) {
        let p = document.createElement("p");
        p.textContent = `Day ${i/8}: ${data.list[i].main.temp}°C`;
        forecast.appendChild(p);
    }
}

getWeather();

// SPOTLIGHT
async function getSpotlights() {
    const response = await fetch("data/members.json");
    const members = await response.json();

    const filtered = members.filter(m =>
        m.membership === 2 || m.membership === 3
    );

    const random = filtered.sort(() => 0.5 - Math.random()).slice(0, 3);

    const container = document.getElementById("spotlights");

    random.forEach(m => {
        const div = document.createElement("div");

        div.innerHTML = `
            <h3>${m.name}</h3>
            <img src="images/${m.image}" alt="${m.name}" loading="lazy">
            <p>${m.phone}</p>
            <p>${m.address}</p>
            <p>Membership: ${m.membership}</p>
        `;

        container.appendChild(div);
    });
}

getSpotlights();