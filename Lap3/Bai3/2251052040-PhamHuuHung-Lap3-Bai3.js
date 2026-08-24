const amountInput = document.getElementById("amount");
const termInput = document.getElementById("term");
const rateInput = document.getElementById("rate");
const errorMsg = document.getElementById("error-msg");
const resultEl = document.getElementById("result");
const btnCalc = document.getElementById("btn-calc");

function formatDots(value) {
    const digits = value.replace(/\D/g, "");
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function parseDots(value) {
    return parseFloat(value.replace(/\./g, "")) || 0;
}

function formatVNCurrency(num) {
    const parts = num.toFixed(2).split(".");
    const intPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `${intPart},${parts[1]} VNĐ`;
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

amountInput.addEventListener("input", () => {
    amountInput.value = formatDots(amountInput.value);
});

btnCalc.addEventListener("click", () => {
    errorMsg.textContent = "";
    resultEl.textContent = "";

    const amount = amountInput.value.trim();
    const term = termInput.value.trim();
    const rate = rateInput.value.trim();
    let hasError = false;

    if (!amount) {
        flashBorder(amountInput);
        hasError = true;
    }
    if (!term) {
        flashBorder(termInput);
        hasError = true;
    }
    if (!rate) {
        flashBorder(rateInput);
        hasError = true;
    }

    if (hasError) {
        errorMsg.textContent = "Vui lòng nhập đầy đủ các ô bắt buộc!";
        return;
    }

    const interest = (parseFloat(term) * parseFloat(rate) * parseDots(amount)) / (12 * 100);
    resultEl.textContent = `Tiền lãi: ${formatVNCurrency(interest)}`;
});
