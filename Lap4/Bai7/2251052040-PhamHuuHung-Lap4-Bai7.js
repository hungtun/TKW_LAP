var pos = 0;
var maxPos = 3;
var timer;
var track = document.getElementById("track");
var dots = document.getElementsByClassName("dot");

function getStep() {
    var img = track.getElementsByTagName("img")[0];
    return img.offsetWidth + 12;
}

function updateCarousel() {
    var px = pos * getStep();
    track.style.transform = "translateX(-" + px + "px)";

    for (var i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }

    dots[pos].classList.add("active");
}

function moveSlide(step) {
    pos = pos + step;

    if (pos > maxPos) {
        pos = 0;
    }

    if (pos < 0) {
        pos = maxPos;
    }

    updateCarousel();
    startAuto();
}

function goPos(i) {
    pos = i;
    updateCarousel();
    startAuto();
}

function startAuto() {
    clearInterval(timer);
    timer = setInterval(function () {
        moveSlide(1);
    }, 3000);
}

startAuto();
