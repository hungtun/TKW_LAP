var colors = ["#1D55A0", "#ED1B24", "#FF9F00", "#00A652", "#993300", "#663399"];
var images = [
    "../images/cpp.png",
    "../images/java.jpg",
    "../images/python.png",
    "../images/database.png",
    "../images/recursion.png"
];

function addCourse() {
    var name = prompt("Nhập tên môn học mới:");

    if (name == null || name.trim() == "") {
        return;
    }

    var colorIndex = Math.floor(Math.random() * colors.length);
    var imageIndex = Math.floor(Math.random() * images.length);

    var card = document.createElement("div");
    card.className = "course-card";

    card.innerHTML =
        '<div class="course-title" style="background:' + colors[colorIndex] + '">' +
        "<span>" + name + "</span>" +
        "</div>" +
        '<img src="' + images[imageIndex] + '" alt="' + name + '">' +
        '<a href="#" class="btn-delete" onclick="deleteCourse(this); return false;">×</a>';

    var addCard = document.getElementById("add-card");
    document.getElementById("course-grid").insertBefore(card, addCard);
}

function deleteCourse(link) {
    var ok = confirm("Bạn có chắc chắn muốn xóa môn học này?");

    if (ok == true) {
        var card = link.parentNode;
        card.parentNode.removeChild(card);
    }
}
