//Variables
var xCol = 4;
var yCol = 3;
var rCol = 5;
var key;
var rLeScale;
var uniqueS;

var s;
var sArray = [];
var uniqueS = [];

//SVG

//var svg = d3.select("#visualization").append("svg")
//	.attr("width", width + margin.left + margin.right)
//	.attr("height", height + margin.top + margin.bottom)
//	.append("g")
//	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

VisDock.init("body", 1050, 800); 
var viewport = VisDock.getViewport();
Panel.x = margin.left;
Panel.y = margin.top;
Panel.setTransform();
var svg = viewport;

function get_round_number(num) {
	return Math.floor(num / Math.pow(10, (num).toString().length - 1)) * Math.pow(10, (num).toString().length - 1);	
}        

//Call CSV
d3.csv("bubble_cars_30_g1.csv", function(data) {
// d3.csv("<%= '#{root_path}/intuitive/show.csv' %>", function(data) {
	dataset = data;
	key = d3.keys(dataset[0]);

	// var xMap = data.map(function(d){
	//	return +d[key[xCol]];
	// });

	//For non-integer
	var xMap = data.map(function(d) {
		return d[key[xCol]];
	});

	var yMap = data.map(function(d) {
		return +d[key[yCol]];
	});

	var rMap = data.map(function(d) {
		return +d[key[rCol]];
	});

	// //Console
	// console.log(key);
	// console.log(xMap);
	// console.log(yMap);
	// console.log(rMap);

	//Scale
	var rScale = d3.scale.linear()
		.domain(d3.extent(rMap))
	// .range([5, 50]);
	.range([5, 30]);

	// var xScale = d3.scale.linear()
	//	.domain([d3.min(xMap)/1.1, d3.max(xMap)*1.1])
	//	.range([0,width]);

  var xScale = d3.scale.linear()
    .domain([d3.min(dataset, function(d, i){return +d[key[xCol]]})*0.8, Math.ceil(d3.max(dataset, function(d, i) {
      return +d[key[xCol]];
    }) * 1.1)])
    .range([0, width]);

	var yScale = d3.scale.linear()
		.domain([d3.min(yMap) / 1.1, d3.max(yMap) * 1.1])
		.range([height, 0]);

	//Axis
	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom");

	var yAxis = d3.svg.axis()
		.scale(yScale)
		.ticks(5)
		.orient("left");

	svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(0, " + height + ")")
		.call(xAxis);
		// .selectAll("text")
 	// 	  .style("text-anchor", "end")
 	// 	  .attr("dx", "-.8em")
  // 		.attr("dy", ".15em")
		// 	.attr("transform", function(d){
  //       return "rotate(-45)"
  //     });

	svg.append("text")
		.attr("transform", "translate(" + width / 2 + "," + height / 0.85 + ")")
		.style("text-anchor", "middle")
		.text(key[xCol]);

	svg.append("g")
		.attr("class", "axis")
		.call(yAxis)
		.append("text")
		.attr("transform", "translate(" + (-margin.left) / 1.3 + "," + height / 2 + ") rotate(-90)")
		.attr("text-anchor", "middle")
		.text(key[yCol]);
 
  svg.append("text")
    .attr("x", (width / 2))             
    .attr("y", (height / -18))
    .attr("text-anchor", "middle")  
    .style("font-size", "20px")
    .text("Price, Horsepower, and Weight ");
	//Plot
	svg.selectAll(".dot").data(dataset).enter()
		.append("circle")
	// .attr("cx", function(d, i){
	//		return xScale(+d[key[xCol]]);
	// })
		.attr("cx", function(d, i) {
			return xScale(d[key[xCol]]); 
			// + xScale.rangeBand() / 2;
		})
		.attr("cy", function(d, i) {
			return yScale(+d[key[yCol]]);
		})
		.attr("r", function(d, i) {
			return rScale(+d[key[rCol]]);
		})
		.attr("fill", function(d, i) {
			return color(dataset[i][key[0]]);
		})
		.attr("opacity", 0.7)
		.on("mouseover", function(d, i) {
			d3.select(label[0][i]).style("visibility", "visible");
			start_time = +new Date();
		})
		.on("mouseout", function(d, i) {
			d3.select(label[0][i]).style("visibility", "hidden");

			hovered_label = d3.select(label[0][i]).text();

		end_time = +new Date();
      timespent = end_time - start_time;
      temp_json = {"happen_at": end_time.toLocaleString(), "event_type": "mouseover", "description": "{" + "target:" + d3.select(this) + ",name:" + hovered_label + ",timespent:" + timespent +"}"};
      event_array.push(temp_json);
      record_hover(event_array, 100);
		});

	//Label(bubble)
	var label = svg.selectAll(".text").data(dataset).enter()
		.append("text")
	// .attr("x" , function(d, i){
	//		return xScale(+d[key[xCol]]) + rScale(+d[key[rCol]]);
	// })
		.attr("x", function(d, i) {
			// return xScale(d[key[xCol]]) + rScale(+d[key[rCol]]) + xScale.rangeBand() / 2;
			return xScale(+d[key[xCol]]);
		})
		.attr("y", function(d, i) {
			return yScale(+d[key[yCol]]) - rScale(+d[key[rCol]]);
		})
		.text(function(d, i) {
			return d[key[1]];
		})
		.style("visibility", "hidden");

	//Label(corner)
	var groupNames = data.map(function(d) {
		return d[key[0]];
	});

	id = d3.unique(groupNames);


	//Legend
	var legend = svg.selectAll(".legend")
		.data(id.slice())
		.enter().append("g")
		.attr("class", "legend")
		.attr("transform", function(d, i) {
			return "translate(" + margin.left + "," + i * 20 + ")";
		})
		.style("fill", function(d, i) {
			return color(id[i]);
		});

	legend.append("rect")
		.attr("x", width)
		.attr("width", 7)
		.attr("height", 7)
		.attr("opacity", 0.7);

	legend.append("text")
		.attr("x", width)
		.attr("y", 5)
		.attr("dx", 10)
		.attr("dy", 2)
		.style("text-anchor", "left")
		.style("fill", "Black")
		.text(function(d) {
			return d;
		});

	// Circle Legend
	var cLengend = [];
	cLengend.push(key[rCol]);

	var circLegend = svg.selectAll(".circLegend")
		.data(cLengend)
		.enter()
		.append("g")
		.attr("class", "legend")
		.attr("transform", function(d, i) {
			return "translate(" + margin.left + "," + i * 20 + ")";
		});

	// circLegend.append("circle")
	//	.attr("cx", width+3)
	//	.attr("cy", 16*(id.length+1))
	//	.attr("r", 4);

	circLegend.append("text")
		.attr("x", width)
		.attr("y", 13 * (id.length + 1))
		.attr("dy", "10pt")
		.style("text-anchor", "left")
		.style("fill", "Black")
		.text("Circles: " + cLengend);

	// Circle Legend Radius
	var m = d3.min(dataset, function(d, i) {
		return +dataset[i][key[rCol]];
	});

	var g = ((d3.max(dataset, function(d, i) {
		return +dataset[i][key[rCol]];
	})) - (d3.min(dataset, function(d, i) {
		return +dataset[i][key[rCol]];
	}))) / 4;

	console.log(g)
	console.log(get_round_number(parseInt(g)));

	gap = get_round_number(parseInt(g));
	min = get_round_number(parseInt(m));

	for (k = 0; k <5; k++) {
		s = Math.floor(min + gap * k);s
		console.log(min +"," + gap + "," + s)
		sArray.push(s);
	}

	$.each(sArray, function(i, el) {
		if ($.inArray(el, uniqueS) === -1) uniqueS.push(el);
	});

	// console.log(uniqueS);

	rLeScale = d3.scale.linear()
		.domain(d3.extent(uniqueS))
		.range([4, 25]);


	svg.selectAll(".dot").data(uniqueS).enter()
		.append("circle")
		// .attr("cx", width)
		// .attr("cy", 17 * (id.length + 2))
		.attr("cx", function(d, i) { return width + rLeScale(uniqueS[uniqueS.length-1]);})
		.attr("cy", 20 * (id.length + 2))
		.attr("r", function(d, i) {
			// console.log(rLeScale(d));
			return rLeScale(d);
		})
		.attr("fill", "#969696")
		.attr("stroke", "Black")
		.attr("stroke-width", 0)
		.attr("opacity", 1)
		.attr("text-anchor", "right")
		.attr("transform", function(d, i) {
			return "translate(" + margin.left + "," + (i+3) * rLeScale(d) + ")";
		});

	svg.selectAll(".text").data(uniqueS).enter().append("text")
		.attr("x", width)
		.attr("y", 20 * (id.length + 1))
		.attr("dx", function(d, i) { return 30 + rLeScale(uniqueS[uniqueS.length-1]); })
		.attr("dy", 5*sArray.length)
		.attr("transform", function(d, i) {
			return "translate(" + margin.left + "," + (i+3) * rLeScale(d) + ")";
		})
		.style("text-anchor", "left")
		.style("fill", "Black")
		.text(function(d, i) {
		// console.log(d);
			return d;
		});


});