var totalSeconds = 5 * 60;
var timer = null;

var timeEl = document.getElementById("time");
var statusEl = document.getElementById("status");
var btnStart = document.getElementById("btn-start");
var btnPause = document.getElementById("btn-pause");
var btnReset = document.getElementById("btn-reset");

function formatTime(seconds) {
    var m = Math.floor(seconds / 60);
    var s = seconds % 60;

    if (m < 10) {
        m = "0" + m;
    }

    if (s < 10) {
        s = "0" + s;
    }

    return m + ":" + s;
}

function showTime() {
    timeEl.textContent = formatTime(totalSeconds);

    if (totalSeconds <= 10 && totalSeconds > 0) {
        timeEl.classList.add("warning");
    } else {
        timeEl.classList.remove("warning");
    }
}

function tick() {
    if (totalSeconds <= 0) {
        clearInterval(timer);
        timer = null;
        statusEl.textContent = "Hết giờ!";
        btnStart.disabled = true;
        timeEl.classList.remove("warning");
        return;
    }

    totalSeconds = totalSeconds - 1;
    showTime();

    if (totalSeconds == 0) {
        clearInterval(timer);
        timer = null;
        statusEl.textContent = "Hết giờ!";
        btnStart.disabled = true;
        timeEl.classList.remove("warning");
    }
}

btnStart.onclick = function () {
    if (btnStart.disabled) {
        return;
    }

    if (timer == null && totalSeconds > 0) {
        timer = setInterval(tick, 1000);
        statusEl.textContent = "Đang đếm ngược...";
    }
};

btnPause.onclick = function () {
    if (timer != null) {
        clearInterval(timer);
        timer = null;
        statusEl.textContent = "Đã tạm dừng";
    }
};

btnReset.onclick = function () {
    clearInterval(timer);
    timer = null;
    totalSeconds = 5 * 60;
    btnStart.disabled = false;
    statusEl.textContent = "Nhấn Start để bắt đầu";
    showTime();
};

showTime();
