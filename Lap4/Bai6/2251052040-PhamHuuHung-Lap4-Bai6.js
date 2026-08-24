var discColors = ["#1D55A0", "#ED1B24", "#663399", "#00A652", "#FF9F00", "#993300"];

function addSong() {
    var name = prompt("Nhập tên bài hát mới:");

    if (name == null || name.trim() == "") {
        return;
    }

    var colorIndex = Math.floor(Math.random() * discColors.length);

    var song = document.createElement("div");
    song.className = "song";

    song.innerHTML =
        '<div class="disc" style="background:' + discColors[colorIndex] + '" onclick="togglePlay(this)">🎧</div>' +
        '<div class="song-info">' +
        "<strong>" + name + "</strong>" +
        '<p class="status">Nhấn vào đĩa để phát</p>' +
        "</div>" +
        '<button type="button" class="btn-delete" onclick="deleteSong(this)">×</button>';

    document.getElementById("song-list").appendChild(song);
}

function deleteSong(btn) {
    var ok = confirm("Bạn có chắc chắn muốn xóa bài hát này khỏi playlist?");

    if (ok == true) {
        var song = btn.parentNode;
        song.parentNode.removeChild(song);
    }
}

function togglePlay(disc) {
    var song = disc.parentNode;
    var status = song.getElementsByClassName("status")[0];
    var allDiscs = document.getElementsByClassName("disc");

    if (disc.classList.contains("playing")) {
        disc.classList.remove("playing");
        status.textContent = "Nhấn vào đĩa để phát";
        return;
    }

    for (var i = 0; i < allDiscs.length; i++) {
        allDiscs[i].classList.remove("playing");
        allDiscs[i].parentNode.getElementsByClassName("status")[0].textContent = "Nhấn vào đĩa để phát";
    }

    disc.classList.add("playing");
    status.textContent = "Đang phát...";
}
