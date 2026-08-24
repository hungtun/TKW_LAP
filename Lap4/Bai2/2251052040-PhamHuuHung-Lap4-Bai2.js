var ball = document.getElementById("ball");
var field = document.getElementById("field");
var btnPlay = document.getElementById("btn-play");
var btnStop = document.getElementById("btn-stop");

var x = 230;
var y = 280;
var dx = 3;
var dy = 3;
var timer = null;

function moveBall() {
    var maxX = field.clientWidth - ball.offsetWidth;
    var maxY = field.clientHeight - ball.offsetHeight;

    x = x + dx;
    y = y + dy;

    if (x <= 0 || x >= maxX) {
        dx = -dx;
    }

    if (y <= 0 || y >= maxY) {
        dy = -dy;
    }

    ball.style.left = x + "px";
    ball.style.top = y + "px";
}

btnPlay.onclick = function () {
    if (timer == null) {
        timer = setInterval(moveBall, 20);
    }
};

btnStop.onclick = function () {
    clearInterval(timer);
    timer = null;
};
