const membersContainer = document.querySelector("#members");

async function getMembers() {
    try {
        const response = await fetch("data/members.json");
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error("Error loading members:", error);
    }
}

function displayMembers(members) {
    membersContainer.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("section");

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;

        membersContainer.appendChild(card);
    });
}

getMembers();

// View toggles
document.querySelector("#grid").addEventListener("click", () => {
    membersContainer.className = "grid";
});

document.querySelector("#list").addEventListener("click", () => {
    membersContainer.className = "list";
});

// Footer info
document.querySelector("#year").textContent =
`© ${new Date().getFullYear()}`;

document.querySelector("#lastModified").textContent =
`Last Modified: ${document.lastModified}`;