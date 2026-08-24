const valueInput = document.getElementById("value");
const fromUnit = document.getElementById("from-unit");
const toUnit = document.getElementById("to-unit");
const errorMsg = document.getElementById("error-msg");
const resultEl = document.getElementById("result");
const btnConvert = document.getElementById("btn-convert");

const UNIT_LABEL = { C: "°C", F: "°F", K: "K" };

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

function toCelsius(value, unit) {
    if (unit === "C") return value;
    if (unit === "F") return (value - 32) * 5 / 9;
    return value - 273.15;
}

function fromCelsius(celsius, unit) {
    if (unit === "C") return celsius;
    if (unit === "F") return celsius * 9 / 5 + 32;
    return celsius + 273.15;
}

btnConvert.addEventListener("click", () => {
    errorMsg.textContent = "";
    resultEl.textContent = "";

    const raw = valueInput.value.trim();
    if (!raw) {
        flashBorder(valueInput);
        errorMsg.textContent = "Vui lòng nhập giá trị nhiệt độ!";
        return;
    }

    const value = parseFloat(raw);
    const from = fromUnit.value;
    const to = toUnit.value;

    const result = fromCelsius(toCelsius(value, from), to);
    resultEl.textContent = `${value}${UNIT_LABEL[from]} = ${result.toFixed(2)}${UNIT_LABEL[to]}`;
});
