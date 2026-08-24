const votes = {
    JavaScript: 0,
    Python: 0,
    Java: 0,
    "C++": 0
};

const pollItems = document.querySelectorAll(".poll-item");

function getTotalVotes() {
    return Object.values(votes).reduce((sum, v) => sum + v, 0);
}

function updatePoll() {
    const total = getTotalVotes();

    pollItems.forEach((item) => {
        const lang = item.dataset.lang;
        const count = votes[lang];
        const percent = total === 0 ? 0 : (count / total) * 100;

        const fill = item.querySelector(".poll-bar-fill");
        const stats = item.querySelector(".poll-stats");

        fill.style.width = `${percent}%`;
        stats.textContent = `${percent.toFixed(1)}% (${count} phiếu)`;
    });
}

pollItems.forEach((item) => {
    item.addEventListener("click", () => {
        votes[item.dataset.lang]++;
        updatePoll();
    });
});

updatePoll();
