const taskInput = document.getElementById("task-input");
const btnAdd = document.getElementById("btn-add");
const taskList = document.getElementById("task-list");
const emptyMsg = document.getElementById("empty-msg");

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

function updateEmptyState() {
    emptyMsg.classList.toggle("hidden", taskList.children.length > 0);
}

function createTaskItem(text) {
    const li = document.createElement("li");
    li.className = "task-item";

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = text;

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const btnDone = document.createElement("button");
    btnDone.type = "button";
    btnDone.className = "btn-done";
    btnDone.textContent = "Hoàn thành";

    btnDone.addEventListener("click", () => {
        li.classList.toggle("done");
        const isDone = li.classList.contains("done");
        btnDone.textContent = isDone ? "Bỏ hoàn thành" : "Hoàn thành";
        btnDone.classList.toggle("undo", isDone);
    });

    const btnDelete = document.createElement("button");
    btnDelete.type = "button";
    btnDelete.className = "btn-delete";
    btnDelete.textContent = "Xóa";

    btnDelete.addEventListener("click", () => {
        li.remove();
        updateEmptyState();
    });

    actions.appendChild(btnDone);
    actions.appendChild(btnDelete);
    li.appendChild(span);
    li.appendChild(actions);
    return li;
}

btnAdd.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (!text) {
        flashBorder(taskInput);
        return;
    }

    taskList.appendChild(createTaskItem(text));
    taskInput.value = "";
    updateEmptyState();
});

updateEmptyState();
