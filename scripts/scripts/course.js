const courses = [
    { code: "WDD130", subject: "WDD", credits: 2, completed: true },
    { code: "WDD131", subject: "WDD", credits: 2, completed: true },
    { code: "WDD231", subject: "WDD", credits: 2, completed: false },
    { code: "CSE110", subject: "CSE", credits: 2, completed: true },
    { code: "CSE111", subject: "CSE", credits: 2, completed: false }
];

const courseContainer = document.querySelector("#courses");
const credits = document.querySelector("#credits");

function displayCourses(courseList) {
    courseContainer.innerHTML = "";

    courseList.forEach(course => {
        const div = document.createElement("div");
        div.classList.add("course-card");

        if (course.completed) {
            div.classList.add("completed");
        }

        div.innerHTML = course.code;
        courseContainer.appendChild(div);
    });

    const totalCredits = courseList.reduce(
        (sum, course) => sum + course.credits, 0
    );

    credits.textContent = `Total Credits: ${totalCredits}`;
}

displayCourses(courses);

document.querySelector("#all").addEventListener("click", () => {
    displayCourses(courses);
});

document.querySelector("#wdd").addEventListener("click", () => {
    displayCourses(courses.filter(course => course.subject === "WDD"));
});

document.querySelector("#cse").addEventListener("click", () => {
    displayCourses(courses.filter(course => course.subject === "CSE"));
});