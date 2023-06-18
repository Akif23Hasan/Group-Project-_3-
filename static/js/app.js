// Update the file path to the local JSON file
const url = "http://127.0.0.1:5000/data";

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
});

// Fetch the latest news headlines and summaries for the selected stock
function fetchNews(stock) {
  const apiKey = "Paste The API_Key From The api_keys.py file";
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
      const articles = data.data.slice(0, 6); // Get the latest 6 articles

      // Display the news headlines, summaries, and URLs
      const newsTable = d3.select("#news-table");
      newsTable.html(""); // Clear previous content
      newsTable.style("border-collapse", "collapse"); // Add border-collapse style

      const tableHeader = newsTable.append("tr");
      tableHeader.append("th").text("Headline");
      tableHeader.append("th").text("Summary");
      tableHeader.append("th").text("Link");

      articles.forEach(article => {
        const headline = article.title;
        const summary = article.description;
        const url = article.url;

        const tableRow = newsTable.append("tr");
        tableRow.append("td").text(headline);
        tableRow.append("td").text(summary);
        tableRow.append("td").html(`<a href="${url}" target="_blank">Read Article</a>`);
      });
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
  d3.json(url).then((data) => {
    // Set a variable for the sample names
    let names = data.names;

    // Filter stock symbols to only include "AAPL", "AMZN", "NFLX", "GOOG", "GOOGL", and "FB"
    let filteredNames = names.filter((Stock_symbol) =>
      ["AAPL", "AMZN", "NFLX", "GOOG", "GOOGL", "FB"].includes(Stock_symbol)
    );

    // Add filtered stocks to dropdown menu and log the value of stock symbol for each iteration of the loop
    filteredNames.forEach((Stock_symbol) => {
      console.log(Stock_symbol);
      dropdownMenu.append("option").text(Stock_symbol).property("value", Stock_symbol);
    });

    // Set the first sample from the list and log the value of starting stock
    let startingstock = filteredNames[0];
    console.log(startingstock);

    // Build the initial plots
    // t_test_bar(startingstock);
    // trade_bar(startingstock);
    pieChart(startingstock);
    barChart(startingstock);

    // Fetch news for the initial stock
    fetchNews(startingstock);
  });
}

// Function that builds the line chart
function barChart(stock) {
  // Use D3 to retrieve all of the data
  d3.json(url).then((data) => {
    // Retrieve all sample data
    let stockData = data.metadata;
    // Filter based on the value of the stock
    let value = stockData.filter(result => result.Stock_symbol == stock)[0];
    // Get the opening and closing price
    let { start_price, end_price, pct_change } = value;
    // Log the data to the console
    console.log(start_price, end_price, pct_change);

    // Set up the trace for the bar chart
    let trace1 = {
      x: ['Opening', 'Closing'],
      y: [start_price, end_price],
      type: "bar",
      marker: {
        color: ["#B3C100", "#CED2CC"] // Earth tone colors for bars
      },
      name: "Price"
    };

    // Set up the trace for the pct_change line chart with trendline
    let trace2 = {
      x: ['Opening', 'Closing'],
      y: [pct_change],
      type: "scatter",
      mode: "lines+markers",
      yaxis: 'y2',
      name: "Percent Change",
      line: {
        shape: 'spline',
        color: "#23282D" // Earth tone color for the line
      }
    };

    // Setup the layout
    let layout = {
      title: "Stock Opening and Closing Prices",
      xaxis: {
        title: "Date",
        ticktext: ['Opening', 'Closing'],
        tickvals: [0, 1]
      },
      yaxis: {
        title: "Price"
      },
      yaxis2: {
        title: "Percent Change",
        overlaying: 'y',
        side: 'right'
      }
    };

    // Call Plotly to plot the bar chart with the pct_change line chart
    Plotly.newPlot("bar", [trace1, trace2], layout);
  });
}

// Function that builds the pie chart
function pieChart(stock) {
  // Use D3 to retrieve all of the data
  d3.json(url).then((data) => {
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
        colors: ["#4CB5F5", "#1F3F49", "#D32D41", "#6AB187"] // Earth tone colors for pie slices
      }
    };

    // Setup the layout
    let layout = {
      title: "Trade Dollar Volume by GICS Sector"
    };

    // Call Plotly to plot the pie chart
    Plotly.newPlot("pie", [trace], layout);
  });
}

// Function that updates dashboard when sample is changed
function optionChanged(value) {
  // Log the new value
  console.log(value);
  // Call all functions
  // t_test_bar(value);
  // trade_bar(value);
  pieChart(value);
  barChart(value);
  // Fetch news for the selected stock
  fetchNews(value);
}

// Call the initialize function
init();







////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Graham's Code////Graham's Code////Graham's Code////Graham's Code////Graham's Code////Graham's Code////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Graham's Code////Graham's Code////Graham's Code////Graham's Code////Graham's Code////Graham's Code////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // Creating the function to design the Bubble Chart using two variables passed from Option Changed function
// function demo_Box(subject_id, data_set) {

//   // Filtering the id data to match select data received and assigning it to a variable
//   var meta_data = data_set.metadata.filter(row => row.id == subject_id);

//   // Selecting the sample_metadata from the HTML and then displaying the data by calling the demodata_Display function
//   // and adjusting the text size
//   d3.select("#sample-metadata").html(demodata_Display(meta_data[0]))
//                                .style("font-size","70%");
// }

// // Creating the function to extract the key and value paid from the passed meta_data returning it to 
// // it to the demo_Box function for displaying 
// function demodata_Display(meta_data) {
//   var string_data = "";
//   Object.entries(meta_data).forEach(([key,value]) => {
//       string_data += `<br>${key}:${value}</br>`;

//   });
//   return string_data;
// }

// // Creating the initiation function
// function init() {
  
//   // Creating a selector to select the first instance in the data
//   let selector = d3.select("#selDataset");
  
//   // Using D3 to read the URL and then jsonify the data for processing
//   d3.json(URL).then((data) => {
      
//       // Assigning the data to a variable to be passed to all functions called
//       data_set = data;
    
//       // Displaying the data_set for review
//       console.log(data_set)

//       // Assigning the name to the subject_id that will be passed to all functions called 
//       let name = [];

//       if (data_set == 'Apple') {
//         name = "AAPL";
//       }
//       else if (data_set == 'Facebook(Meta)') {
//         name = "FB";
//       }
//       else if (data_set == 'Amazon') {
//         name = "AMZN";
//       }
//       else if (data_set == 'Google (COOG)') {
//         name = "GOOG";
//       }
//       else if (data_set == 'Google (GOOGL)') {
//         name = "GOOGL";
//       }
//       else if (data_set == 'Netflix') {
//         name = "NFLX";
//       }
            
//       const subject_ids = data.name;
      
//       console.log(subject_ids);
//       // // Displaying data in selector function
//       // subject_ids.forEach(id => {
//       //     selector.append("option")
//       //             .attr("value", id)
//       //             .text(id);
//       // });
//       // // Calling the Option Changed function as identified in HTML passing through the subject_id data name 
//       // optionChanged(subject_ids[0]); 
//   })    
// }


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // Creating the Option Changed function
// function optionChanged(subject_id) {
    
//   // Calling the Bar Chart function passing through the subject_id Name and JSON data_set
//   bar_Chart(subject_id, data_set);
  
//   // Calling the Bubble Chart function passing through the subject_id Name and JSON data_set
//   bubble_Chart(subject_id, data_set);
  
//   // Calling the Demo Chart function passing through the subject_id Name and JSON data_set
//   demo_Box(subject_id, data_set);

//   // Calling the Demo Chart function passing through the subject_id Name and JSON data_set
//   gauge_Chart(subject_id, data_set);
  
// }

// // Calling the init function that initialises the display
// init();


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Graham's Code////Graham's Code////Graham's Code////Graham's Code////Graham's Code////Graham's Code////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // Function called by DOM changes
// function getData() {
//   let dropdownMenu = d3.select("#selDataset");
//   // Assign the value of the dropdown menu option to a variable
//   let dataset = dropdownMenu.property("value");
//   // Initialize an empty array for the country's data
//   let data = [];

//   if (dataset == 'AAPL') {
//     data = AAPL;
//   }
//   else if (dataset == 'AMZN') {
//     data = AMZN;
//   }
//   else if (dataset == 'NFLX') {
//     data = NFLX;
//   }
//   else if (dataset == 'GOOG') {
//     data = GOOG;
//   }
//   else if (dataset == 'GOOGL') {
//     data = GOOGL;
//   }
//   else if (dataset == 'FB') {
//     data = FB;
//   }
//   // Call function to update the charts
//   updatePlotly(data);
// }

// // Update the restyled plots' values
// function updatePlotly(newdata) {
//   Plotly.restyle("pie", "values", [newdata]);

//   let lineUpdate = {
//     y: [newdata]
//   };

//   Plotly.update("line", lineUpdate);
// }

