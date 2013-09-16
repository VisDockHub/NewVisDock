var margin = {top: 40, right: 300, bottom: 60, left: 80};
var width = 950 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

//color blinedness friendly
d3.scale.categoryBlindFree = function() {
    return d3.scale.ordinal().range(d3_categoryBlindFree);
  };
  var d3_categoryBlindFree = ["#313695", "#a50026", "#4575b4", "#d73027", "#74add1", "#f46d43", "#abd9e9", "#fdae61", "#e0f3f8", "#fee090"];
var color = d3.scale.categoryBlindFree();

// returns unique values from an array
d3.unique = function(array) {
  return d3.scale.ordinal().domain(array).domain();
};

// returns translation matrix [x,y]
function get_translate_matrix(element) {
  matrix = d3.transform(d3.select(element).attr("transform")).translate;
  return  matrix;
}