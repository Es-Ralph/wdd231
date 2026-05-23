const membersContainer = document.querySelector("#members");

// FETCH DATA
async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) throw new Error("Data failed to load");

        const members = await response.json();
        displayMembers(members);

    } catch (error) {
        console.error(error);
        membersContainer.innerHTML = "<p>Failed to load members.</p>";
    }
}

// DISPLAY DATA
function displayMembers(members) {
    membersContainer.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("section");
        card.classList.add("card");

        card.innerHTML = `
            <img src="images/${member.image}" 
                 alt="${member.name}" 
                 loading="lazy" 
                 width="200" height="200">

            <h3>${member.name}</h3>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>

            <p>
                Website: 
                <a href="${member.website}" 
                   target="_blank" 
                   rel="noopener noreferrer">
                   Visit Website
                </a>
            </p>
        `;

        membersContainer.appendChild(card);
    });
}

getMembers();


// VIEW TOGGLE
document.querySelector("#grid").addEventListener("click", () => {
    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");
});

document.querySelector("#list").addEventListener("click", () => {
    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");
});


// MOBILE MENU
const menuButton = document.querySelector("#menu");
const nav = document.querySelector("nav");

menuButton.addEventListener("click", () => {
    nav.classList.toggle("open");
});


// FOOTER
document.querySelector("#year").textContent =
`© ${new Date().getFullYear()}`;

document.querySelector("#lastModified").textContent =
`Last Modified: ${document.lastModified}`;