var titles = {
    success: "Thành công",
    warning: "Cảnh báo",
    error: "Lỗi",
    info: "Thông tin"
};

var icons = {
    success: "✅",
    warning: "⚠️",
    error: "❌",
    info: "ℹ️"
};

var messages = {
    success: [
        "Đã cập nhật hồ sơ.",
        "Lưu dữ liệu thành công.",
        "Đăng ký khóa học thành công."
    ],
    warning: [
        "Dung lượng lưu trữ sắp đầy.",
        "Mật khẩu sắp hết hạn.",
        "Bạn chưa hoàn thành bài học."
    ],
    error: [
        "Không thể kết nối máy chủ.",
        "Đăng nhập thất bại.",
        "Không tìm thấy dữ liệu."
    ],
    info: [
        "Đã có bản cập nhật mới.",
        "Khóa học mới vừa được thêm.",
        "Hệ thống sẽ bảo trì lúc 22:00."
    ]
};

function showToast(type) {
    var list = messages[type];
    var randomIndex = Math.floor(Math.random() * list.length);

    var toast = document.createElement("div");
    toast.className = "toast " + type;

    toast.innerHTML =
        '<div class="toast-icon">' + icons[type] + "</div>" +
        '<div class="toast-body">' +
        "<strong>" + titles[type] + "</strong>" +
        "<p>" + list[randomIndex] + "</p>" +
        "</div>" +
        '<button type="button" class="toast-close" onclick="closeToast(this)">×</button>';

    var box = document.getElementById("toast-box");
    box.insertBefore(toast, box.firstChild);

    setTimeout(function () {
        closeToast(toast.querySelector(".toast-close"));
    }, 4000);
}

function closeToast(btn) {
    var toast = btn.parentNode;

    if (toast.classList.contains("hide")) {
        return;
    }

    toast.classList.add("hide");

    setTimeout(function () {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 400);
}
