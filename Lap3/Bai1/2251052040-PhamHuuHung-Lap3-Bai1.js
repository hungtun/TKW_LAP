const weightInput = document.getElementById("weight");
const heightInput = document.getElementById("height");
const errorMsg = document.getElementById("error-msg");
const resultEl = document.getElementById("result");
const btnCalc = document.getElementById("btn-calc");

// function flashBorder(input) {
//     let count = 0;
//     const interval = setInterval(() => {
//         input.classList.toggle("error");
//         count++;
//         if (count >= 6) {
//             clearInterval(interval);
//             input.classList.remove("error");
//         }
//     }, 300);
// }

function flashBorder(input){
    let count = 0;
    const interval = setInterval(()=>
    {
        input.classList.toggle("error");
        count++;
        if(count>6){
            clearInterval(interval);
            input.classList.remove("error");
        }
    },300);
}

function getBmiCategory(bmi) {
    if (bmi < 18.5) return "Thiếu cân";
    if (bmi < 25) return "Bình thường";
    if (bmi < 30) return "Thừa cân";
    return "Béo phì";
}

btnCalc.addEventListener("click", () => {
    errorMsg.textContent = "";
    resultEl.textContent = "";

    const weight = weightInput.value.trim();
    const height = heightInput.value.trim();
    let hasError = false;

    if (!weight) {
        flashBorder(weightInput);
        hasError = true;
    }

    if (!height) {
        flashBorder(heightInput);
        hasError = true;
    }

    if (hasError) {
        errorMsg.textContent = "Vui lòng nhập đầy đủ các ô bắt buộc!";
        return;
    }

    const bmi = parseFloat(weight) / (parseFloat(height) * parseFloat(height));
    resultEl.textContent = `BMI = ${bmi.toFixed(2)}: ${getBmiCategory(bmi)}`;
});
