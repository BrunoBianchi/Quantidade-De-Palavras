fetch("./resultado.json")
  .then((response) => response.json())
  .then((jsonData) => {
    const entries = Object.entries(jsonData[0]);

    const sortedEntries = entries.sort((a, b) => b[1].qnt - a[1].qnt);

    const words = sortedEntries.slice(0, 30).map((entry) => entry[0]);
    const frequencies = sortedEntries.map((entry) => entry[1].qnt);

    const ctx = document.getElementById("wordFrequencyChart").getContext("2d");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: words,
        datasets: [
          {
            label: "Word Frequency",
            data: frequencies,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            ticks: {
              autoSkip: false, 
              maxRotation: 45, 
              minRotation: 45,
            },
          },
          y: {
            beginAtZero: true,
            stepSize: 1,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  })
  .catch((error) => console.error("Error fetching JSON:", error));
