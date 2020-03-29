let url = "https://api.covid19india.org/data.json";

// daily  cases
let xl = [];
let yl = [];
Plotly.d3.json(url, function(figure) {
  let data = figure.cases_time_series;
  for (var i = 0; i < data.length; i++) {
    xl.push(data[i]["date"]);
    yl.push(data[i]["dailyconfirmed"]);
  }
  let trace = {
    x: xl,
    y: yl,
    mode: "lines+markers",
    type: "scatter"
  };
  let layout = {
    title: "Daily confirmed cases",
    yaxis: { title: "confirmed cases" }
  };
  Plotly.plot(document.getElementById("dailyconfirmed"), [trace], layout);
});

// daily death

let x2 = [];
let y2 = [];
Plotly.d3.json(url, function(figure) {
  let data = figure.cases_time_series;
  for (var i = 0; i < data.length; i++) {
    x2.push(data[i]["date"]);
    y2.push(data[i]["dailydeceased"]);
  }
  let trace = {
    x: x2,
    y: y2,
    mode: "lines+markers",
    type: "scatter"
  };
  let layout = {
    title: "Daily confirmed deaths",
    yaxis: { title: "Deaths" }
  };
  Plotly.plot(document.getElementById("dailydeceased"), [trace], layout);
});

// daily recovered

let x3 = [];
let y3 = [];
Plotly.d3.json(url, function(figure) {
  let data = figure.cases_time_series;
  for (var i = 0; i < data.length; i++) {
    x3.push(data[i]["date"]);
    y3.push(data[i]["dailyrecovered"]);
  }
  let trace = {
    x: x3,
    y: y3,
    mode: "lines+markers",
    type: "scatter"
  };
  let layout = {
    title: "Daily recovered",
    yaxis: { title: "recovered" }
  };
  Plotly.plot(document.getElementById("dailyrecovered"), [trace], layout);
});

// total

let x4 = [];
let y4 = [];
let y5 = [];
let y6 = [];
Plotly.d3.json(url, function(figure) {
  let data = figure.cases_time_series;
  for (var i = 0; i < data.length; i++) {
    x4.push(data[i]["date"]);
    y4.push(data[i]["totalconfirmed"]);
    y5.push(data[i]["totaldeceased"]);
    y6.push(data[i]["totalrecovered"]);
  }
  let totalconfirmed = {
    x: x4,
    y: y4,
    name: "confirmed",
    mode: "lines+markers",
    type: "scatter"
  };
  let totalrecovered = {
    x: x4,
    y: y6,
    name: "recovered",
    mode: "lines+markers",
    type: "scatter"
  };
  let totaldeceased = {
    x: x4,
    y: y5,
    name: "deceased",
    mode: "lines+markers",
    type: "scatter"
  };
  let layout = {
    title: "Total covid-19 cases",
    yaxis: { title: "counts" }
  };
  Plotly.plot(
    document.getElementById("totalconfirmed"),
    [totalconfirmed, totaldeceased, totalrecovered],
    layout
  );
});
