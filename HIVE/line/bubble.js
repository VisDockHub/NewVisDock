// SVG
var svg = d3.select("#visualization").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Get Data
d3.csv("data/pilot3/line_cars_10_g1.csv", function(data) {
// d3.csv("<%= '#{root_path}/intuitive/show.csv' %>", function(data) {
  dataset = data;

  var key = d3.keys(dataset[0]);
  //console.log(key);

  // Scaling
  //// Linear xScaring
  // var xScaling = d3.scale.linear()
  //  .domain(d3.extent(dataset, function(d, i){ return +d[key[1]]}))
  //  .range([0, width]);

  //// Ordinal xScaing
  var xScaling = d3.scale.ordinal()
    .domain(dataset.map(function(d) {
      return d[key[1]];
    }))
    .rangeRoundBands([0, width], 0.1);

  var yScaling = d3.scale.linear()
    .domain([0, Math.ceil(d3.max(dataset, function(d, i) {
      return +d[key[3]];
    }) * 1.1)])
    .range([height, 0]);

  // Axis
  var xAxis = d3.svg.axis()
    .scale(xScaling)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(yScaling)
    .orient("left")
    .ticks(5);

  svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0, " + height + ")")
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", function(d) {
      return "rotate(-45)";
    });

    svg.append("text")
    .attr("transform", "translate(" + width / 2 + "," + height / 0.85 + ")")
    .style("text-anchor", "middle")
    .text(key[1]);

  svg.append("g")
    .attr("class", "axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "translate(" + (-margin.left) / 1.3 + "," + height / 2 + ") rotate(-90)")
    .style("text-anchor", "middle")
    .text(key[3]);

  svg.append("text")
    .attr("x", (width / 2))             
    .attr("y", (height / -15))
    .attr("text-anchor", "middle")  
    .style("font-size", "20px")
    .text("Number of Car Sales by Year");

  // Labels
  var label = svg.selectAll(".text").data(dataset).enter()
    .append("text")
    .attr("x", function(d, i) {
      return xScaling(d[key[1]]) + xScaling.rangeBand() / 2 + 10;
    })
    .attr("y", function(d, i) {
      return yScaling(+d[key[3]]);
    })
    .text(function(d, i) {
      return d[key[1]];
    })
    .style("visibility", "hidden");

  // Plots 
  svg.selectAll(".dot").data(dataset).enter()
    .append("circle")
    .attr("cx", function(d, i) {
      return xScaling(d[key[1]]) + xScaling.rangeBand() / 2;
    })
    .attr("cy", function(d, i) {
      return yScaling(+d[key[3]]);
    })
    .attr("r", 3)
    .attr("fill", function(d, i) {
      return color(dataset[i][key[0]]);
    })
    .attr("stroke", function(d, i) {
      return color(dataset[i][key[0]]);
    })
    .attr("stroke-width", 0)
    .attr("opacity", 0.7)
    .on("mouseover", function(d, i) {
      // d3.select(label[0][i]).style("visibility", "visible");
      // d3.select(this).attr("stroke-width", 5);
      start_time = +new Date();
    })
    .on("mouseout", function(d, i) {
      // d3.select(label[0][i]).style("visibility", "hidden");
      // d3.select(this).attr("stroke-width", 0);

      hovered_label = d3.select(label[0][i]).text();

      end_time = +new Date();
      timespent = end_time - start_time;
      temp_json = {"happen_at": end_time.toLocaleString(), "event_type": "mouseover", "description": "{" + "target:" + d3.select(this) + ",name:" + hovered_label + ",timespent:" + timespent +"}"};
      event_array.push(temp_json);
      record_hover(event_array, 100);
    });

  // Get ID
  var names = [];
  dataset.forEach(function(d) {
    names.push(d[key[0]]);
  });

  id = d3.unique(names);
  // console.log(id);

  // Line
  var line = d3.svg.line()
    .interpolate("path")
    .x(function(d, i) {
      return xScaling(d[key[1]]) + xScaling.rangeBand() / 2;
    })
    .y(function(d, i) {
      return yScaling(+d[key[3]]);
    });

  var subData = [];

  for (var k = 0; k < id.length; k++) {

    for (var j = 0; j < dataset.length; j++) {
      // console.log(j);
      if (dataset[j][key[0]] == id[k]) {
        subData.push(dataset[j]);
        // console.log(dataset[j].Price);
      }
    }

    svg.append("svg:path")
      .attr("d", line(subData))
      .attr("fill", "none")
      // .attr("stroke", function(d, i) {
      //   return color(subData[i][key[0]]);
      // })
      .attr("stroke", function(d, i) {
        return color(subData[i][key[0]]);
      })
      .attr("stroke-width", 2)
      .attr("opacity", 0.7);

    subData = []; // Make empty subData
    }

  // Legend
  var legend = svg.selectAll(".legend")
    .data(id).enter()
    .append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) {
      return "translate(" + margin.left + "," + i * 20 + ")";
    })
    .style("fill", function(d, i) {
      return color(id[i]);
    })
    .attr("opacity", 0.7);

  legend.append("rect")
    .attr("x", width - 15)
    .attr("width", 7)
    .attr("height", 7);

  legend.append("text")
    .attr("x", width - 15)
    .attr("y", 5)
    .attr("dx", 10)
    .attr("dy", 2)
    .style("text-anchor", "left")
    .style("fill", "Black")
    .text(function(d) {
      return d;
    });

});