const year = new Date().getFullYear();

document.querySelector("#copyright").innerHTML =
`© ${year} Rapheal Akwasi Agyapong | Ghana`;

document.querySelector("#lastModified").innerHTML =
`Last Modified: ${document.lastModified}`;