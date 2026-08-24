const productNameInput = document.getElementById("product-name");
const productPriceInput = document.getElementById("product-price");
const productQtyInput = document.getElementById("product-qty");
const btnAdd = document.getElementById("btn-add");
const cartList = document.getElementById("cart-list");
const emptyMsg = document.getElementById("empty-msg");
const totalPriceEl = document.getElementById("total-price");

const cart = [];

function formatDots(num) {
    return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function parseDots(value) {
    return parseFloat(value.replace(/\./g, "")) || 0;
}

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

function calcTotal() {
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    totalPriceEl.textContent = `${formatDots(total)} VNĐ`;
}

function updateEmptyState() {
    emptyMsg.classList.toggle("hidden", cart.length > 0);
}

function renderCart() {
    cartList.innerHTML = "";

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.className = "cart-item";

        const info = document.createElement("div");
        info.className = "cart-item-info";
        info.innerHTML = `<strong>${item.name}</strong>${formatDots(item.price)}đ x ${item.qty}`;

        const subtotal = document.createElement("span");
        subtotal.className = "cart-item-subtotal";
        subtotal.textContent = `${formatDots(item.price * item.qty)}đ`;

        const btnDelete = document.createElement("button");
        btnDelete.type = "button";
        btnDelete.className = "btn-delete";
        btnDelete.textContent = "×";

        btnDelete.addEventListener("click", () => {
            cart.splice(index, 1);
            renderCart();
            calcTotal();
            updateEmptyState();
        });

        li.appendChild(info);
        li.appendChild(subtotal);
        li.appendChild(btnDelete);
        cartList.appendChild(li);
    });
}

productPriceInput.addEventListener("input", () => {
    productPriceInput.value = formatDots(productPriceInput.value.replace(/\D/g, ""));
});

btnAdd.addEventListener("click", () => {
    const name = productNameInput.value.trim();
    const price = productPriceInput.value.trim();
    const qty = productQtyInput.value.trim();
    let hasError = false;

    if (!name) {
        flashBorder(productNameInput);
        hasError = true;
    }
    if (!price) {
        flashBorder(productPriceInput);
        hasError = true;
    }
    if (!qty || parseInt(qty, 10) <= 0) {
        flashBorder(productQtyInput);
        hasError = true;
    }

    if (hasError) return;

    cart.push({
        name,
        price: parseDots(price),
        qty: parseInt(qty, 10)
    });

    productNameInput.value = "";
    productPriceInput.value = "";
    productQtyInput.value = "1";

    renderCart();
    calcTotal();
    updateEmptyState();
});

updateEmptyState();
