const subjectNameInput = document.getElementById("subject-name");
const creditsInput = document.getElementById("credits");
const gradeInput = document.getElementById("grade");
const btnAdd = document.getElementById("btn-add");
const subjectList = document.getElementById("subject-list");
const gpaValue = document.getElementById("gpa-value");
const emptyMsg = document.getElementById("empty-msg");

const subjects = [];

function flashBorder(input) {
    let count = 0;
    const interval = setInterval(() => {
        input.classList.toggle("error");
        count++;
        if (count >= 6) {
            clearInterval(interval);
            input.classList.remove("error");
        }
    }, 300);
}

function formatGPA(gpa) {
    return gpa.toFixed(2).replace(".", ",");
}

function calcGPA() {
    if (subjects.length === 0) {
        gpaValue.textContent = "—";
        return;
    }

    let totalCredits = 0;
    let weightedSum = 0;

    for (const s of subjects) {
        totalCredits += s.credits;
        weightedSum += s.grade * s.credits;
    }

    gpaValue.textContent = formatGPA(weightedSum / totalCredits);
}

function updateEmptyState() {
    emptyMsg.classList.toggle("hidden", subjects.length > 0);
}

function renderList() {
    subjectList.innerHTML = "";

    subjects.forEach((subject, index) => {
        const li = document.createElement("li");
        li.className = "subject-item";

        const info = document.createElement("span");
        info.textContent = `${subject.name} (${subject.credits} tín chỉ - Điểm ${subject.grade})`;

        const btnDelete = document.createElement("button");
        btnDelete.type = "button";
        btnDelete.className = "btn-delete";
        btnDelete.textContent = "Xóa";

        btnDelete.addEventListener("click", () => {
            subjects.splice(index, 1);
            renderList();
            calcGPA();
            updateEmptyState();
        });

        li.appendChild(info);
        li.appendChild(btnDelete);
        subjectList.appendChild(li);
    });
}

btnAdd.addEventListener("click", () => {
    const name = subjectNameInput.value.trim();
    const credits = creditsInput.value.trim();
    const grade = gradeInput.value.trim();
    let hasError = false;

    if (!name) {
        flashBorder(subjectNameInput);
        hasError = true;
    }

    const creditsNum = parseInt(credits, 10);
    if (!credits || !Number.isInteger(creditsNum) || creditsNum <= 0) {
        flashBorder(creditsInput);
        hasError = true;
    }

    const gradeNum = parseFloat(grade);
    if (!grade || gradeNum < 0 || gradeNum > 10) {
        flashBorder(gradeInput);
        hasError = true;
    }

    if (hasError) return;

    subjects.push({ name, credits: creditsNum, grade: gradeNum });
    subjectNameInput.value = "";
    creditsInput.value = "";
    gradeInput.value = "";

    renderList();
    calcGPA();
    updateEmptyState();
});

updateEmptyState();
