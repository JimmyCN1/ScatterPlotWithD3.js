request = new XMLHttpRequest();
request.open(
  "GET",
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json",
  true
);
request.send();
request.onload = () => {
  json = JSON.parse(request.responseText);
  console.log(json);

  const margin = 70;
  const w = 1000 - margin * 2;
  const h = 450;

  var parseYear = d3.timeParse("%Y");
  // const parseTime = d3.timeParse("%M:%S");

  // format the data
  json.forEach(function(d) {
    d.Year = parseYear(d.Year);
    // d.Time = parseTime(d.Time);
  });

  // define x and y scales
  const xScale = d3
    .scaleTime()
    .domain([d3.min(json, d => d.Year), d3.max(json, d => d.Year)])
    .range([0, w]);

  console.log(d3.max(json, d => d.Year));

  // const parsedTime = d3.timeParse("%Y");
  // const formatTime = d3.timeFormat("%M:%S");
  // json.forEach(d => (d.parsedTime = parsedTime(d.Year)));

  console.log(json);

  const yScale = d3
    .scaleLinear()
    .domain([d3.min(json, d => d.Seconds), d3.max(json, d => d.Seconds)])
    .range([h, 0]);

  console.log(json[0].Seconds);
  console.log(d3.max(json, d => d.Seconds));
  console.log(d3.min(json, d => d.Seconds));

  // define svg plot area
  let svg = d3
    .select("main")
    .append("svg")
    .attr("width", w + margin + margin)
    .attr("height", h + margin + margin)
    .append("g")
    .attr("transform", "translate(" + margin + "," + margin + ")")
    .style("background-color", "blue");

  // add x-axis
  svg
    .append("g")
    .attr("transform", `translate(0, ${h})`)
    .call(d3.axisBottom(xScale));
  // .tickFormat(d3.format("d"));

  // add y-axis
  svg.append("g").call(d3.axisLeft(yScale));
};
