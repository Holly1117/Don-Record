const readerList = getReaderList();

console.log(readerList)

let config = {
    type: "doughnut",
    data: {
        labels: readerList,
        datasets: [{
            data: [39.9, 27.4, 22.3],
            backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(255, 159, 64)",
                "rgb(240, 240, 240)",
            ]
        }],
    },
    options: {
        responsive: false
    }
};

// チャートの生成
window.addEventListener("load", function() {
    let ctx = document.getElementById("deckChart").getContext("2d");
    deckChart = new Chart(ctx, config);
}, false);