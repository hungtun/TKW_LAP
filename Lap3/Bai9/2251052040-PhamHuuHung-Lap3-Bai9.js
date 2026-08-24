const contactNameInput = document.getElementById("contact-name");
const contactPhoneInput = document.getElementById("contact-phone");
const searchInput = document.getElementById("search-input");
const btnAdd = document.getElementById("btn-add");
const contactList = document.getElementById("contact-list");
const emptyMsg = document.getElementById("empty-msg");
const noResultMsg = document.getElementById("no-result-msg");

const contacts = [];

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
    emptyMsg.classList.toggle("hidden", contacts.length > 0);
}

function filterContacts() {
    const keyword = searchInput.value.trim().toLowerCase();
    const items = contactList.querySelectorAll(".contact-item");
    let visibleCount = 0;

    items.forEach((item, index) => {
        const match = contacts[index].name.toLowerCase().includes(keyword);
        item.classList.toggle("hidden", !match);
        if (match) visibleCount++;
    });

    if (contacts.length > 0 && keyword && visibleCount === 0) {
        noResultMsg.classList.remove("hidden");
    } else {
        noResultMsg.classList.add("hidden");
    }
}

function renderContacts() {
    contactList.innerHTML = "";

    contacts.forEach((contact, index) => {
        const li = document.createElement("li");
        li.className = "contact-item";

        const info = document.createElement("div");
        info.className = "contact-info";
        info.innerHTML = `<strong>${contact.name}</strong><span>${contact.phone}</span>`;

        const btnDelete = document.createElement("button");
        btnDelete.type = "button";
        btnDelete.className = "btn-delete";
        btnDelete.textContent = "×";

        btnDelete.addEventListener("click", () => {
            contacts.splice(index, 1);
            renderContacts();
            updateEmptyState();
            filterContacts();
        });

        li.appendChild(info);
        li.appendChild(btnDelete);
        contactList.appendChild(li);
    });

    filterContacts();
}

btnAdd.addEventListener("click", () => {
    const name = contactNameInput.value.trim();
    const phone = contactPhoneInput.value.trim();
    let hasError = false;

    if (!name) {
        flashBorder(contactNameInput);
        hasError = true;
    }
    if (!phone) {
        flashBorder(contactPhoneInput);
        hasError = true;
    }

    if (hasError) return;

    contacts.push({ name, phone });
    contactNameInput.value = "";
    contactPhoneInput.value = "";

    renderContacts();
    updateEmptyState();
});

searchInput.addEventListener("input", filterContacts);

updateEmptyState();
