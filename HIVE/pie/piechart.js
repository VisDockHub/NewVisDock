VisDock.init("#visualization", 1000, 800);
var viewport = VisDock.getViewport();
var radius = Math.min(width, height) / 2;


// var color = d3.scale.category10();

var origin_translate_x = (width + margin.left + margin.right)/2.7;
var origin_translate_y = (height + margin.top + margin.bottom)/2;
var svg = viewport//.attr("transform", "translate(" + origin_translate_x + "," + origin_translate_y + ")");
Panel.x = origin_translate_x
Panel.y = origin_translate_y
Panel.setTransform();
// var svg = d3.select("#visualization").append("svg")
//   .attr("width", width + margin.left + margin.right)
//   .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//   .attr("transform", "translate(" + origin_translate_x + "," + origin_translate_y + ")"); //default center value


d3.csv("pie_cars_10_g1.csv", function(data) {
// d3.csv("<%= '#{root_path}/intuitive/show.csv' %>", function(data) {
  var keys = d3.keys(data[0]);

  var firstcolumn = keys[0];

  data.forEach(function(d, i) {
    d[keys[1]] = +d[keys[1]];

  });

  var sum = 0;

  data.forEach(function(d, i) {
    sum = sum + d[keys[1]];
    // console.log(sum);
  });
  // console.log(sum);

  var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

  var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) {
      return d[keys[1]];
    });

  svg.append("text")
    .attr("x", (width / 20))             
    .attr("y", (height / -1.7))
    .attr("text-anchor", "middle")  
    .style("font-size", "20px")
    .text("Sales in 2012 by Car Types");

  var g = svg.selectAll(".arc")
    .data(pie(data))
    .enter().append("g")
    .attr("class", "arc");

  g.append("path")
    .attr("d", arc)
    .style("stroke", 1)
    .style("fill", function(d, i) {
      return color(i);
    })
    .attr("opacity", 0.7)
    .on("mouseover", function(d) {
      // var percentage = (100 * (d.data[keys[1]] / sum));      
      // showToolTip(" " + d.data[keys[1]] + "<br/>" + percentage.toFixed(2) + "%", d3.mouse(this)[0] + origin_translate_x, d3.mouse(this)[1] + origin_translate_y - 25, true);
      start_time = +new Date();
    })
  // .on("mousemove", function(d) {
  //     tooltipDivID.css({top:d.y+d3.mouse(this)[1],left:d.x+d3.mouse(this)[0]+50});
  // })
    .on("mouseout", function(d) {
      // showToolTip(" ", 0, 0, false);

      hovered_label = d.data[keys[0]];

      //end_time = +new Date();
      //timespent = end_time - start_time;
      //temp_json = {"happen_at": end_time.toLocaleString(), "event_type": "mouseover", "description": "{" + "target:" + d3.select(this) + ",name:" + hovered_label + ",timespent:" + timespent +"}"};
      //event_array.push(temp_json);
      //record_hover(event_array, 100);
    });

  var pos = d3.svg.arc().innerRadius(radius).outerRadius(radius + 12); 

  g.append("svg:text")
    .attr("transform", function(d) {
      return "translate(" + pos.centroid(d) + ")";
    })
    .attr("dy", ".35em")
    .style("text-anchor", "middle")
    .style("font", "bold 12px Arial")
    .text(function(d, i) {
      var percentage = (100 * (d.data[keys[1]] / sum));
      // console.log(percentage);
      return d.data[keys[0]];
    });

  var names = [];

  data.forEach(function(d) {
    names.push(d[keys[0]]);
  });

  id = d3.unique(names);

  // color2 = d3.scale.category10();
  // console.log(id);

  // Legend
  // console.log(id);
  // var legend = svg.selectAll(".legend")
  //   .data(id).enter()
  //   .append("g")
  //   .attr("class", "legend")
  // // .attr("width", radius * 2)
  // // .attr("height", radius * 2)
  //   .attr("transform", function(d, i) {
  //     return "translate(" + margin.left + "," + i * 20 + ")";
  //   })
  //   .style("fill", function(d, i) {
  //     return color2(id[i]);
  //   })
  //   .attr("opacity", 0.7);

  // legend.append("rect")
  //   .attr("x", 150)
  //   .attr("y", -radius)
  //   .attr("width", 7)
  //   .attr("height", 7);

  // legend.append("text")
  //   .attr("x", 150)
  //   .attr("y", -radius + 5)
  //   .attr("dx", 10)
  //   .attr("dy", 2)
  //   .text(function(d) {
  //     return d;
  //   })
  //   .style("fill", "Black");

});

function showToolTip(pMessage, pX, pY, pShow) {
  if (typeof(tooltipDivID) == "undefined") {
    tooltipDivID = $("<div id= 'tooltip' ></div>");
    $("body").append(tooltipDivID);
  }
  if (!pShow) {
    tooltipDivID.hide();
    return;
  } //MT.tooltipDivID.empty().append(pMessage);
  tooltipDivID.html(pMessage);
  tooltipDivID.css({
    top: pY,
    left: pX
  });
  tooltipDivID.show();
}