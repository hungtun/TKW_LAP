const kwhInput = document.getElementById("kwh");
const errorMsg = document.getElementById("error-msg");
const resultEl = document.getElementById("result");
const btnCalc = document.getElementById("btn-calc");

const TIERS = [
    { limit: 50, price: 1800 },
    { limit: 100, price: 2000 },
    { limit: 200, price: 2500 },
    { limit: Infinity, price: 3000 }
];

function formatDots(num) {
    return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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

function calcElectricity(kwh) {
    let total = 0;
    let remaining = kwh;
    let prevLimit = 0;

    for (const tier of TIERS) {
        const tierKwh = Math.min(remaining, tier.limit - prevLimit);
        if (tierKwh <= 0) break;
        total += tierKwh * tier.price;
        remaining -= tierKwh;
        prevLimit = tier.limit;
    }

    return total;
}

btnCalc.addEventListener("click", () => {
    errorMsg.textContent = "";
    resultEl.textContent = "";

    const raw = kwhInput.value.trim();
    if (!raw) {
        flashBorder(kwhInput);
        errorMsg.textContent = "Vui lòng nhập số điện đã dùng!";
        return;
    }

    const kwh = parseFloat(raw);
    const cost = calcElectricity(kwh);
    resultEl.textContent = `Tiền điện: ${formatDots(cost)} VNĐ`;
});
