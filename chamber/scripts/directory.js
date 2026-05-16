const membersContainer = document.querySelector("#members");

async function getMembers() {
    const response = await fetch("data/members.json");
    const data = await response.json();
    displayMembers(data);
}

function displayMembers(members) {
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

document.querySelector("#grid").addEventListener("click", () => {
    membersContainer.className = "grid";
});

document.querySelector("#list").addEventListener("click", () => {
    membersContainer.className = "list";
});

document.querySelector("#year").textContent =
`© ${new Date().getFullYear()}`;

document.querySelector("#lastModified").textContent =
`Last Modified: ${document.lastModified}`;