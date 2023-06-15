// Create an array of each country's numbers
let AAPL = Object.values(FAANG.AAPL);
let AMZN = Object.values(FAANG.AMZN);
let NFLX = Object.values(FAANG.NFLX);
let GOOG = Object.values(FAANG.GOOG);
let GOOGL = Object.values(FAANG.GOOGL);
let FB = Object.values(FAANG.FB);

// Create an array of category labels
let labels = Object.keys(FAANG.AAPL);

// Display the default plot
function init() {
  let FAANG = [{
    values: AAPL,
    labels: labels,
    type: "pie"
  }];

  let layout = {
    height: 600,
    width: 800
  };

  Plotly.newPlot("pie", FAANG, layout);
}

// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", getData);

// Function called by DOM changes
function getData() {
  let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a letiable
  let dataset = dropdownMenu.property("value");
  // Initialize an empty array for the country's data
  let data = [];

  if (dataset == 'AAPL') {
    FAANG = AAPL;
  }
  else if (dataset == 'AMZN') {
    FAANG = AMZN;
  }
  else if (dataset == 'NFLX') {
    FAANG = NFLX;
  }
  else if (dataset == 'GOOG') {
    FAANG = GOOG;
  }
  else if (dataset == 'GOOGL') {
    FAANG = GOOGL;
  }
  else if (dataset == 'FB') {
    FAANG = FB;
  }
// Call function to update the chart
  updatePlotly(FAANG);
}

// Update the restyled plot's values
function updatePlotly(newdata) {
  Plotly.restyle("pie", "values", [newdata]);
}

init();
