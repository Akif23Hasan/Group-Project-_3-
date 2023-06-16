// Create an array of each country's numbers
let AAPL = Object.values(FAANG.AAPL);
let AMZN = Object.values(FAANG.AMZN);
let NFLX = Object.values(FAANG.NFLX);
let GOOG = Object.values(FAANG.GOOG);
let GOOGL = Object.values(FAANG.GOOGL);
let FB = Object.values(FAANG.FB);

// Create an array of category labels
let labels = Object.keys(FAANG.AAPL);

// Display the default plots
function init() {
  let pieData = [{
    values: AAPL,
    labels: labels,
    type: "pie"
  }];

  let lineData = [{
    x: labels,
    y: AAPL,
    type: "line"
  }];

  let layout = {
    height: 600,
    width: 500
  };

  Plotly.newPlot("pie", pieData, layout);
  Plotly.newPlot("line", lineData, layout);
}

// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", getData);

// Function called by DOM changes
function getData() {
  let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  let dataset = dropdownMenu.property("value");
  // Initialize an empty array for the country's data
  let data = [];

  if (dataset == 'AAPL') {
    data = AAPL;
  }
  else if (dataset == 'AMZN') {
    data = AMZN;
  }
  else if (dataset == 'NFLX') {
    data = NFLX;
  }
  else if (dataset == 'GOOG') {
    data = GOOG;
  }
  else if (dataset == 'GOOGL') {
    data = GOOGL;
  }
  else if (dataset == 'FB') {
    data = FB;
  }
  // Call function to update the charts
  updatePlotly(data);
}

// Update the restyled plots' values
function updatePlotly(newdata) {
  Plotly.restyle("pie", "values", [newdata]);

  let lineUpdate = {
    y: [newdata]
  };

  Plotly.update("line", lineUpdate);
}

init();
