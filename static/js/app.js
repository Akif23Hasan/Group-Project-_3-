// Create an array of each country's numbers
let apple = Object.values(data.apple);
let facebook = Object.values(data.facebook);
let amazon = Object.values(data.amazon);
let google = Object.values(data.google);
let netflix = Object.values(data.netflix);
let snp500 = Object.values(data.snp500);

// Create an array of category labels
let labels = Object.keys(data.apple);


// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", getData);

// Function called by DOM changes
function getData() {
  let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a letiable
  let dataset = dropdownMenu.property("value");
  // Initialize an empty array for the country's data
  let data = [];

  if (dataset == 'apple') {
      data = apple;
  }
  else if (dataset == 'facebook') {
      data = facebook;
  }
  else if (dataset == 'google') {
      data = google;
  }
  else if (dataset == 'amazon') {
    data = amazon;
  }
  else if (dataset == 'netflix') {
      data = netflix;
  }
  else if (dataset == 'snp500') {
    data = snp500;
  }
// Call function to update the chart
  updatePlotly(data);
}

// Call the initialize function
init();
