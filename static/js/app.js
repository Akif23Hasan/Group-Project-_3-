// Update the file path to the local JSON file
const sector_url = "http://127.0.0.1:5000/api/v1.0/Four%20Sector%20Stocks";

// Fetch the JSON data and console log it
d3.json(sector_url).then(function(data) {
  console.log(data);
});

// Fetch the latest news headlines and summaries for the selected stock
function fetchNews(stock) {
  const apiKey = "i4C1V3RjLgFoMzPvyapdYUYR4Cif6zORLppfZVsS";
  const newsUrl = `https://api.marketaux.com/v1/news/all?symbols=${stock}&filter_entities=true&language=en&sentiment=positive&api_token=${apiKey}`;
  console.log(newsUrl);

  fetch(newsUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch news.");
      }
      return response.json();
    })
    .then(data => {
      const articles = data.data.slice(0, 5); // Get the latest 5 articles

      // Display the news headlines, summaries, and URLs
      const newsTable = d3.select("#news-table");
      newsTable.html(""); // Clear previous content
      newsTable.style("border-collapse", "collapse"); // Add border-collapse style

      const tableHeader = newsTable.append("tr");
      tableHeader.selectAll("th")
        .data([`${stock} Headline`, "Summary", "Link"])
        .enter()
        .append("th")
        .text(d => d)
        .style("border", "1px solid black")
        .style("text-align", "center");

      const tableRows = newsTable.selectAll("tr")
        .data(articles)
        .enter()
        .append("tr");

      tableRows.selectAll("td")
        .data(article => [article.title, article.description, article.url])
        .enter()
        .append("td")
        .text(d => d)
        .style("border", "1px solid black")
        .style("text-align", "center");

      tableRows.select("td:last-child")
        .html(article => `<a href="${article.url}" target="_blank">Read Article</a>`);
        
      // Add empty rows if there are fewer than 5 articles
      const emptyRowsCount = 5 - articles.length;
      if (emptyRowsCount > 0) {
        for (let i = 0; i < emptyRowsCount; i++) {
          newsTable.append("tr")
            .selectAll("td")
            .data(["", "", ""])
            .enter()
            .append("td")
            .style("border", "1px solid black")
            .style("text-align", "center");
        }
      }
    })
    .catch(error => {
      console.log(error);
      const newsTable = d3.select("#news-table");
      newsTable.html(""); // Clear previous content
      newsTable.append("tr").append("td").text("Failed to fetch news.");
    });
}

// Starting the dashboard at opening the index up
function init() {
  // Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDataset");

  // Use D3 to get sample names and populate the drop-down selector
  d3.json(sector_url).then((data) => {
    // Set a variable for the sample names
    let names = data.names;

    // Define an object to map stock symbols to company names
    let companyNames = {
      AAPL: "Apple",
      AMZN: "Amazon",
      NFLX: "Netflix",
      GOOG: "Alphabet(Class C)",
      GOOGL: "Alphabet(Class A)",
      FB: "Facebook"
    };

    // Filter stock symbols to only include "AAPL", "AMZN", "NFLX", "GOOG", "GOOGL", and "FB"
    let filteredNames = names.filter((Stock_symbol) =>
      ["AAPL", "AMZN", "NFLX", "GOOG", "GOOGL", "FB"].includes(Stock_symbol)
    );

    // Add filtered stocks to dropdown menu with company names
    filteredNames.forEach((Stock_symbol) => {
      dropdownMenu
        .append("option")
        .text(`${Stock_symbol} - ${companyNames[Stock_symbol]}`)
        .property("value", Stock_symbol);
    });

    // Set the first sample from the list
    let startingstock = filteredNames[0];

    // Build the initial plots
    t_test_bar(startingstock);
    trade_bar(startingstock);
    pieChart(startingstock);
    // barChart(startingstock);

    // Fetch curremt stock
    fetchCurrentStock(startingstock);
    // Fetch news for the initial stock
    fetchNews(startingstock);

    // Fetch image and display it
    imagelogo(startingstock);
  });
}


// // Function that builds the line chart
// function barChart(stock) {
//   // Use D3 to retrieve all of the data
//   d3.json(sector_url).then((data) => {
//     // Retrieve all sample data
//     let stockData = data.metadata;
//     // Filter based on the value of the stock
//     let value = stockData.filter(result => result.Stock_symbol == stock)[0];
//     // Get the opening and closing price
//     let { start_price, end_price, pct_change } = value;
//     // Log the data to the console
//     // console.log(start_price, end_price, pct_change);

//     // Set up the trace for the bar chart
//     let trace1 = {
//       x: ['Opening', 'Closing'],
//       y: [start_price, end_price],
//       type: "bar",
//       marker: {
//         color: ["#B3C100", "#CED2CC"] // Earth tone colors for bars
//       },
//       name: "Price"
//     };

//     // Set up the trace for the pct_change line chart with trendline
//     let trace2 = {
//       x: ['Opening', 'Closing'],
//       y: [pct_change],
//       type: "scatter",
//       mode: "lines+markers",
//       yaxis: 'y2',
//       name: "Percent Change",
//       line: {
//         shape: 'spline',
//         color: "#23282D" // Earth tone color for the line
//       }
//     };

//     // Setup the layout
//     let layout = {
//       title: `${stock} Stock Opening and Closing Prices`,
//       xaxis: {
//         title: "Date",
//         ticktext: ['Opening', 'Closing'],
//         tickvals: [0, 1]
//       },
//       yaxis: {
//         title: "Price"
//       },
//       yaxis2: {
//         title: "Percent Change",
//         overlaying: 'y',
//         side: 'right'
//       }
//     };

//     // Call Plotly to plot the bar chart with the pct_change line chart
//     Plotly.newPlot("bar", [trace1, trace2], layout);
//   });
// }

// Function that builds the pie chart
function pieChart(stock) {
  // Use D3 to retrieve all of the data
  d3.json(sector_url).then((data) => {
    // Retrieve all sample data
    let stockData = data.metadata;
    // Filter based on the value of the stock
    let selectedStock = stockData.filter(result => result.Stock_symbol === stock)[0];
    // Get the trade dollar volume of the selected stock
    let selectedStockVolume = selectedStock.trade_dollar_volume;

    // Filter out the selected stock from each GICS_Sector and calculate the total trade dollar volume for each sector
    let sectorVolumes = {};
    stockData.forEach((result) => {
      if (result.Stock_symbol !== stock) {
        let sector = result.GICS_Sector;
        if (sector in sectorVolumes) {
          sectorVolumes[sector] += result.trade_dollar_volume;
        } else {
          sectorVolumes[sector] = result.trade_dollar_volume;
        }
      }
    });

    // Add the selected stock's trade volume to the sector volumes
    sectorVolumes[`${stock} (Selected Stock)`] = selectedStockVolume;

    // Prepare data for the pie chart
    let labels = Object.keys(sectorVolumes);
    let values = Object.values(sectorVolumes);

    // Set up the trace for the pie chart
    let trace = {
      labels: labels,
      values: values,
      type: "pie",
      marker: {
        colors: ["#E2725B","#A3B18A", "#C45E2B", "#E8D6AC", "#6B6D51"]// Earth tone colors for pie slices
      }
    };

    // Setup the layout
    let layout = {
      title: `Dollar Volume traded: ${stock} vs GICS Sector during period`
    };

    // Call Plotly to plot the pie chart
    Plotly.newPlot("pie", [trace], layout);
  });
}

// Function that builds the line chart
function t_test_bar(stock) {
  
  const t_test_url = "http://127.0.0.1:5000/api/v1.0/T-Test";
  
  // Use D3 to retrieve all of the data
  d3.json(t_test_url).then((data) => {
    
    // Retrieve all sample data and Filter based on the value of the stock
    const filteredData = data.metadata.filter(result => result.Stock_symbol === stock);
    
    const sectors = filteredData.map(item => item.GICS_Sector);
    const pValues = filteredData.map(item => item.p_value);
    
    // Set up the trace for the bar chart
    let trace_p = {
      x: sectors,
      y: pValues,
      type: "bar",
      marker: {
        color: ["#E2725B","#A3B18A", "#C45E2B", "#E8D6AC", "#6B6D51" ]
      },
      name: "p-Values",
    };

    // Set up the trace for the pct_change line chart with trendline
    let trace_p2 = {
      x: sectors,
      y: new Array(sectors.length).fill(0.05),
      type: "line",
          name: "p-Value threshold",
      line: {
        color: "blue",
      },
    };

    // Setup the layout
    let layout_p = {
      title: `p-Values: ${stock} vs GICS Sector`,
      xaxis: {
        title: "GICS Sector",
        tickfont: {
          size: 10, // Adjust the font size for x-labels
        },
        automargin: true, // Automatically adjust the margin to fit the labels
        tickangle: -45, // Adjust the rotation angle for x-labels
      },
      yaxis: {
        title: "p-value",
        // range: [0, 0.1], // Set the range of y-axis, with 0.1 as the maximum value
      },
    };

    // Call Plotly to plot the bar chart with the pct_change line chart
    Plotly.newPlot("t_test_bar", [trace_p, trace_p2], layout_p);
  });
}

// Function that builds the pie chart
function trade_bar(stock) {
  // Use D3 to retrieve all of the data
  d3.json(sector_url).then((data) => {
    // Retrieve all sample data
    let stockData = data.metadata;
    // Filter based on the value of the stock
    let selectedStock = stockData.filter(result => result.Stock_symbol === stock)[0];
    // Get the trade dollar volume of the selected stock
    let selectedStockPct = selectedStock.pct_change;

    // Filter out the selected stock from each GICS_Sector and calculate the total trade dollar volume for each sector
    let sectorPct = {};
    let sectorCount = {}

    stockData.forEach((result) => {
      if (result.Stock_symbol !== stock) {
        let sector = result.GICS_Sector;
        let pctChange = result.pct_change;

        if (sector in sectorPct) {
          sectorPct[sector] += pctChange;
          sectorCount[sector] += 1;
        } else {
          sectorPct[sector] = pctChange;
          sectorCount[sector] = 1;
        }
      }
    });

    for (let sector in sectorPct) {
      sectorPct[sector] /= sectorCount[sector];
    }

    // Add the selected stock's trade volume to the sector volumes
    sectorPct[`${stock} (Selected Stock)`] = selectedStockPct;

    // Prepare data for the pie chart
    let labels = Object.keys(sectorPct);
    let values = Object.values(sectorPct);

    // Set up the trace for the pie chart
    let trace_pct = {
      x: labels,
      y: values,
      type: "bar",
      marker: {
        color: ["#E2725B","#A3B18A", "#C45E2B", "#E8D6AC", "#6B6D51" ] // Earth tone colors for pie slices
      }
    };

    // Setup the layout
    let layout_pct= {
      title: `Percentage stock movement: ${stock} vs GICS Sector during period`,
      xaxis: {
        title: "GICS Sector",
        tickfont: {
          size: 10 // Adjust the font size for x-labels
        },
        automargin: true, // Automatically adjust the margin to fit the labels
        tickangle: -45 // Adjust the rotation angle for x-labels
      },
      yaxis: {
        title: "Combined Sector percentage change"
      },
    };

    // Call Plotly to plot the pie chart
    Plotly.newPlot("trade_bar", [trace_pct], layout_pct);
  });
}

// Function to display the logo for the stock selected
function imagelogo(stock) {
  let imageUrl = "";

  if (stock === "AAPL") {
    imageUrl = "https://img.freepik.com/free-icon/mac-os_318-10374.jpg";
  } else if (stock === "AMZN") {
    imageUrl = "https://logowik.com/content/uploads/images/amazon6707.jpg";
  } else if (stock === "NFLX") {
    imageUrl = "https://loodibee.com/wp-content/uploads/Netflix-N-Symbol-logo.png";
  } else if (stock === "GOOG" || stock === "GOOGL") {
    imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png";
  } else if (stock === "FB") {
    imageUrl = "https://img.freepik.com/free-icon/facebook_318-157463.jpg";
  }

  // Display the image
  displayImage(imageUrl);

  function displayImage(url) {
    // Select the image element and update its source
    const imageElement = d3.select("#logo-image");
    imageElement.attr("src", url);
  }
}

// Fetching the daily stock 
let stockChart = null; // Variable to store the chart instance

function fetchCurrentStock(stock) {
  if (stock === "FB") stock = "Meta";
  const apiKey = "UOGKFS4PFYPO53WA";
  const alphaStockUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&outputsize=compact&apikey=${apiKey}`;

  fetch(alphaStockUrl)
  .then(response => response.json())
  .then(data => {
    const timeSeries = data['Time Series (Daily)'];
    const dates = [];
    const closingPrices = [];
    const volumes = [];

    // Loop through each daily entry in the time series
    for (const date in timeSeries) {
      const dailyData = timeSeries[date];
      const closingPrice = parseFloat(dailyData['4. close']);
      const volume = parseInt(dailyData['5. volume']);

      dates.unshift(date); // Reverse the order of dates
      closingPrices.unshift(closingPrice);
      volumes.unshift(volume);
    }

    // Destroy the existing chart if it exists
    if (stockChart) {
      stockChart.destroy();
    }

      // Create the combined graph using Chart.js
      const ctx = document.getElementById('stockChart').getContext('2d');
      stockChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: dates,
          datasets: [
            {
              label: 'Closing Price',
              data: closingPrices,
              yAxisID: 'y1',
              type: 'line',
              borderColor: "#E2725B",
              fill: false
            },
            {
              label: 'Volume',
              data: volumes,
              yAxisID: 'y2',
              backgroundColor: "#A3B18A" 
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: `${stock}: Current Closing Stock Prices (USD$) and Volume traded`,
              font: {
                size: 16
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              type: 'linear',
              display: true,
              position: 'left',
              id: 'y1',
              title: {
                display: true,
                text: 'Closing Price ($)'
              }
            },
            y2: {
              beginAtZero: true,
              type: 'linear',
              display: true,
              position: 'right',
              grid: {
                drawOnChartArea: false
              },
              title: {
                display: true,
                text: 'Volume'
              }
            }
          }
        }
      });
    })
    .catch(error => {
      console.log('Error:', error);
    });
}


// Function that updates dashboard when sample is changed
function optionChanged(value) {
  // Log the new value
  console.log(value);
  // Call all functions
  t_test_bar(value);
  trade_bar(value);
  pieChart(value);
  // barChart(value);
  //Fetch image and display it
  imagelogo(value);
  // Fetch news for the selected stock
  fetchNews(value);
  // Fetch current stock 
  fetchCurrentStock(value)
}

// Call the initialize function
init();
