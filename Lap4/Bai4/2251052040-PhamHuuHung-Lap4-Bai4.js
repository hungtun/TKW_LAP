var index = 0;
var slides = document.getElementsByClassName("slide");
var nums = document.getElementsByClassName("num");
var timer;

function showSlide(i) {
    if (i < 0) {
        index = slides.length - 1;
    } else if (i >= slides.length) {
        index = 0;
    } else {
        index = i;
    }

    for (var k = 0; k < slides.length; k++) {
        slides[k].classList.remove("active");
        nums[k].classList.remove("active");
    }

    slides[index].classList.add("active");
    nums[index].classList.add("active");
}

function changeSlide(step) {
    showSlide(index + step);
    startAuto();
}

function goSlide(i) {
    showSlide(i);
    startAuto();
}

function startAuto() {
    clearInterval(timer);
    timer = setInterval(function () {
        showSlide(index + 1);
    }, 3000);
}

startAuto();
