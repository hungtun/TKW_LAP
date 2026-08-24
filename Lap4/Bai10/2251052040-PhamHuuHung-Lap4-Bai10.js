var slider = document.getElementById("brightness");
var photo = document.getElementById("photo");
var percent = document.getElementById("percent");

function updateBrightness() {
    var value = slider.value;
    percent.textContent = value + "%";
    photo.style.filter = "brightness(" + (value / 50) + ")";
}

slider.oninput = updateBrightness;
updateBrightness();
