function toggleFaq(item) {
    var isOpen = item.classList.contains("open");
    var items = document.getElementsByClassName("faq-item");

    for (var i = 0; i < items.length; i++) {
        items[i].classList.remove("open");
    }

    if (isOpen == false) {
        item.classList.add("open");
    }
}
