const RATES = { USD: 24000, EUR: 26000, AUD: 16000 };

const amountInput = document.getElementById("amount");
const currencySelect = document.getElementById("currency");
const errorMsg = document.getElementById("error-msg");
const resultEl = document.getElementById("result");
const btnConvert = document.getElementById("btn-convert");

function formatDots(value) {
    const digits = value.replace(/\D/g, "");
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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

amountInput.addEventListener("input", () => {
    const cursor = amountInput.selectionStart;
    const oldLen = amountInput.value.length;
    amountInput.value = formatDots(amountInput.value);
    const newLen = amountInput.value.length;
    amountInput.setSelectionRange(cursor + (newLen - oldLen), cursor + (newLen - oldLen));
});

btnConvert.addEventListener("click", () => {
    errorMsg.textContent = "";
    resultEl.textContent = "";

    const raw = amountInput.value.trim();
    if (!raw) {
        flashBorder(amountInput);
        errorMsg.textContent = "Vui lòng nhập số tiền cần đổi!";
        return;
    }

    const amount = parseDots(raw);
    const currency = currencySelect.value;
    const converted = amount / RATES[currency];

    resultEl.textContent = `${formatDots(String(amount))}VNĐ = ${converted.toFixed(2)}${currency}`;
});
