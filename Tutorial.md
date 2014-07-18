# VisDock Tutorial
- Import VisDock and related libraries: you need to import VisDock.js along with 2D.js,
IntersectionUtilities.js, and UtilitiesLibrary.js first. These library files can be found
 <a href="https://github.com/jungujchoi/VisDock/">here</a>. Of these library files, 2D.js
and IntersectionUtilies.js were created by <a href="http://www.kevlindev.com">Kevin Lindsey Software 
Development</a> and they can be liked directly to their remote URL or can be downloaded from
from <a href="http://www.kevlindev.com">www.kevindev.com</a> as well. Currently, VisDock is dependent on
d3.js library for executing of many of its functions. (For instance, d3.selectAll("...") statements were used
in a number of lines). Therefore, it is required to import the d3.js library as well. We are working on this issue
to make VisDock independent of the d3.js library.
<pre>
<code style="margin-left: 30px">&lt;script type="text/javascript" src="visdock.js"&gt;&lt;/script&gt;</code><br>
<code style="margin-left: 30px">&lt;script type="text/javascript" src="http://www.kevlindev.com/gui/2D.js" &gt;&lt;/script&gt;</code><br>
<code style="margin-left: 30px">&lt;script type="text/javascript" src="http://www.kevlindev.com/geometry/2D/intersections/IntersectionUtilities.js" &gt;&lt;/script&gt;</code><br>
<code style="margin-left: 30px">&lt;script type="text/javascript" src="UtilitiesLibrary.js"&gt;&lt;/script&gt;</code>
</pre>
<br>
- Initialize VisDock: this initialization step physically attaches the VisDock onto your visualization. 
You must pass the width and heigh of your visualization as parameters. However, at this stage,
the VisDock tools will not function correctly. VisDock Event Handler needs to be 
implemented properly first. <br>
<br>
<code style="margin-left: 30px">VisDock.init("body", width, height);</code>
<br><br>
<img src="https://github.com/VisDockHub/NewVisDock/blob/master/Tutorial/init.png?raw=true" height = "400" width = "400">
<br><br>
- Initialize viewport: this step creates an SVG frame where your host visualization will reside. In this
case, the line below makes the variable 'viewport' such become this SVG frame. <br>
<br>
<code style="margin-left: 30px">var viewport = VisDock.getViewport();</code>
<br>
<br>
- Make a visualization: you may create a visualization in 'viewport' (the SVG frame created in the previous step).
This is not very difficult a task. When you are done with your visualization, you may skip the next few
steps and go to 'Selection Handler.'
But if you wish to adopt VisDock onto a pre-made visualization, it may take a few extra steps.
We will use a visualization created with Raphael.js found on this <a href="http://raphaeljs.com/tiger.html">link</a>
and another visualization created with d3.js found on this <a href="http://bl.ocks.org/mbostock/4063530">link</a>.
<br>
<br>
<img src="https://github.com/VisDockHub/NewVisDock/blob/master/Tutorial/circlepackbefore.png?raw=true" height = "400" width = "400">
<img src="https://github.com/VisDockHub/NewVisDock/blob/master/Tutorial/forcedirected.png?raw=true" height = "300" width = "400">

<br>
<br>
- Attach the visualization onto 'viewport' (<a href="http://bl.ocks.org/mbostock/4063530">circle packet
example</a>): this step may become complex if you are using a non-SVG frame (such as Div or Raphael.js Paper).
But the underlying concept is that you need to extract all the SVG objects from the pre-made
visualization and push them onto 'viewport.' Some examples created with d3.js do not require this step
since it may only take the users to change the pre-defined svg space to 'viewport.'
For instance, in the code where the SVG frame is declared,
<pre>
<code>
var svg = d3.select("body").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
  .append("g")
    .attr("transform", "translate(2,2)");
</code>
</pre>
the users can make the viewport become this new SVG frame by changing the variable,
<pre>
<code>
var svg = viewport;
Panel.x = 2,
Panel.y = 2,
Panel.setTransform();
</code>
</pre>
Note that the transformation has to be carried out for the VisDock panel in this fashion.
<br>

- After initialization: at this stage, VisDock utilities are functional, which means users may draw shapes, pan and zoom in
 and out, make annotations (By Point and By Area) and use magnifying lenses. But until VisDock Event Handler is properly implemented, selection methods will not work correctly.
<br><br>
<img src="https://github.com/VisDockHub/NewVisDock/blob/master/Tutorial/bubblepacket.png?raw=true" height = "350" width = "400">
<img src="https://github.com/VisDockHub/NewVisDock/blob/master/Tutorial/forcedirected1.png?raw=true" height = "300" width = "400">

<br>
<br>
- Dock Anchor: the Toolkit dock can be re-located by using mouse drag and drop. If the user moves the toolkit dock to the botoom of the SVG frame, the dock will automatically rotate 90 degrees and stay lengthwise. If the dock is brought back up from the bottom, the dock will rotate 90 degrees back to its normal heightwise orientation.
<br><br>
<img src="https://github.com/VisDockHub/NewVisDock/blob/master/Tutorial/dockable.png?raw=true" height = "400" width = "400">

- Selection Handler: Selection Handler is a VisDock event handler inherent in the VisDock library. This
function is invoked when
          a selection is made by users. This handles not only the intersections of user-drawn selection shapes and the
          SVG objects of the host visualization but also other events such as 'setColor','removeColor', and 'changeColor'
          for the selected objects. We will provide the skeleton function here. 
	<br>
<pre><code>
VisDock.eventHandler = {
        getHitsPolygon: function(points, inclusive) {
        // This event is called when selections are made using Polygon, Lasso and Rectangular tools.

            return hits; 
        },
            
        getHitsEllipse: function(points, inclusive) {
        // This event is called when selections are made using made using Ellipse Tool.
            
            return hits; 
        },
            
        getHitsLine: function(points, inclusive) {
        // This event is called when selections are made using Polyline, Straightline, and Freeselection tools.
            
            return hits; 
        },
            
        setColor: function(hits) {
        // This event is called when the user wants to change the colors of the selection layers.
            
        },
            
        changeVisibility: function(vis, query) {
        // This event is called when the user wants to change the visibility of the selection layers.
            
        },
            
        removeColor: function(hits, index) {
        // This event is called when the user wants to remove the colour of the selection layers.
            
        },
        clearAnnotations: function() {
        // This event is called when the user wishes to clear the annotation array or radical Pan/zoom
        // is made
        
        }
}
</code>
</pre>  
<br>
- Cross-cutting seletions (Force Directed Layout Example): visdock.utils.js provides various functions that users
can utilize. Main elements for querying are the circular nodes in this visualizaiton. Therefore, only comparison
between SVG circle (ellipse) elements and shapes needs to be made. We will provide an example.
 + getHitsPolygon: this event will be called when the users make selections with Lasso, Polygon and
Rectangle tools.
<br>
<pre><code>
getHitsPolygon: function(points, inclusive) {
            // shapebound is a new polygon object for the polygon created by using selection tools.
            var shapebound = new createPolygon(points); 
            return shapebound.intersectPath(d3.selectAll(".node")[0], inclusive)
    },
</code></pre>
<br>
 + getHitsEllipse: similarly, this event will be called when the users make selections with Ellipse tool.
<br>
<pre><code>
getHitsEllipse: function(points, inclusive) {
            // shapebound is a new ellipse object for the ellipse created by using Ellipse tool.
            var shapebound = new createEllipse(points);
            return shapebound.intersectPath(d3.selectAll(".node")[0], inclusive)
    },
</code></pre>
<br>
 + getHitsLine: this function will be called when the users make selections with StraightLine, Polyline, and
Freeselection tools.
<br>
<pre><code>
getHitsLine: function(points, inclusive) {
            // shapebound is a new line object for the line created by using StraightLine, Polyline, and
               Freeselection tools.
            var shapebound = new createLine(points);
            return shapebound.intersectPath(d3.selectAll(".node")[0], inclusive)
    },
</code></pre>
<br>

 + setColor: this function will be called when a query is made by either making new selections or performing
binary operations between queries (common, union, or XOR). The functions are VisDock.utils.addShapeLayer's and
these functions clone the selected SVG elements. The first argument is the original SVG element, the second
is the style (VisDock provides a default style when this argument is passed as undefined), and the third is
the index.
<br>
<pre><code>
setColor: function(hits) {
            for (var i = 0; i &lt; hits.length; i++) {
                VisDock.utils.addEllipseLayer(hits[i], undefined, num - 1]);
            }
},
</code></pre>
<br>
 + changeColor: this function will be called when the users wish to change the color of a query or queries. Users may write their own sub-function to change the layer color or call a standard VisDock routine.
<br>
<pre><code>
changeColor: function(color, query, index) {
	    	VisDock.utils.changeColor(color, query, "fill")
},
</code></pre>
<br>
 + changeVisibility: this function will be called when the users wish to change the visibility of
Freeselection tools.
<pre><code>
changeVisibility: function(vis, query, index) {
	    	VisDock.utils.changeVisibility(vis, query)
},
</code></pre>
<br>
 + removeColor: this function will be called when the users wish to remove the layers for a query or queries.
<pre><code>
removeColor: function(hits, index) {
            for (var i = 0; i &lt; hits.length; i++) {
                hits[i].remove();
            }
    },
</code></pre>
 + QueryClick: this function is completely optional. The users may add this function to handle events when
a query box is clicked in the query list. For the time being, we'll leave this function out.
</code></pre>
<br>

### Circle Packet example:
The circle packet example is written in a very similar. We list here the entire code for
VisDock.eventHandler in the circle packet example.
<br>
<pre><code>
VisDock.eventHandler = {
        getHitsPolygon: function(points, inclusive, t) {
            var shapebound = new createPolygon(points); 
            return shapebound.intersectEllipse(d3.selectAll(".leaf").select("circle")[0], inclusive)
        },
        getHitsEllipse: function(points, inclusive, t) {
            var shapebound = new createEllipse(points); 
            return shapebound.intersectEllipse(d3.selectAll(".leaf").select("circle")[0], inclusive)
        },
        getHitsLine: function(points, inclusive) {
            var shapebound = new createLine(points); 
            return shapebound.intersectEllipse(d3.selectAll(".leaf").select("circle")[0], inclusive)
        },
        setColor: function(hits) {
            for (var i = 0; i &lt; hits.length; i++) {
                VisDock.utils.addEllipseLayer(hits[i]);
            }
        },
        changeColor: function(color, query, index) {
            VisDock.utils.changeColor(color, query, "fill")
        },
        changeVisibility: function(vis, query, index) {
            VisDock.utils.changeVisibility(vis, query)
        },
        removeColor: function(hits, index) {
            for (var i = 0; i &lt; hits.length; i++) {
                hits[i].remove();
            }
        }
}
</code></pre>
<br>
### Update the cloned layers:
When the host visualization is static, cloned layers created from users' selections do not need to update their position, shape or other attributes. In case the host visualization is dynamic
and interactive (for instance, the force directed layout example), the cloned layers must update their positions and transformation to stay on top of the original elements. This may sound like a difficult task, but VisDock provides a built-in function that handles this update.
<pre><code>
VisDock.updateLayers();

</code></pre>
If the SVG elements in the host visualization undergo continuous transitions (e.g. animation or force triggering), the function above can be invoked continuously to update the layers.
<pre><code>
  force.on("tick", function() {

    VisDock.updateLayers(); // This command updates VisDock Layers

    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  })
</code></pre>
<img src="https://github.com/VisDockHub/NewVisDock/blob/master/Tutorial/circlepacket2.png?raw=true" height = "350" width = "400">
<img src="https://github.com/VisDockHub/NewVisDock/blob/master/Tutorial/forcedirected2.png?raw=true" height = "300" width = "400">

### Annotation By Data Space:
VisDock supports annotations that attach themselves to an SVG element so that when the SVG element undergoes
transition, the annotation would still stay attached to the SVG element. We call this type of annotation method 
Annotation By Data Space. First, this type of annotation needs declaration for the types of SVG elements the 
annotations would be attached to.
<pre><code>
AnnotationByData.types = [".nodes"];

</code></pre>
It can be a tagName such as "polygon", "circle", "path", and etc. or a class identifier or a combination of these.
In addition, an update command for the annotations needs to be called in order to update the position of the
annotation. This can be done by placing the following command at the same place where updateLayer is invoked:
<pre><code>
AnnotationByData.update();

</code></pre>
The following figure shows the VisDock-enabled force directed layout visualization with annotations by Data Space.
<img src="https://github.com/VisDockHub/NewVisDock/blob/master/Tutorial/forcedirected3.png?raw=true" height = "300" width = "400">
### Overview Panel
The overview panel gives a glimpse of the visualization from a far-distance perspective, or in other words,
it is a miniature view of the visualization. The overview can be initialized with a siimple command after the viewport is populated with SVG elements.
<pre><code>
BirdView.init(viewport, width, height);

</code></pre>
Whether the host visualization is static or dynamic, the overview will always work. This means if SVG elements in the host visualization undergo transition, this change will happen also in the overview. The following figures show the results after the overview initialization.

<img src="https://github.com/VisDockHub/NewVisDock/blob/master/Tutorial/circlepacket3.png?raw=true" height = "350" width = "400">
<img src="https://github.com/VisDockHub/NewVisDock/blob/master/Tutorial/forcedirected4.png?raw=true" height = "300" width = "400">
### Magnifying Lenses
Magnifying Lenses are built-in features that require no initialization or set-up. These lenses allow users to zoom in on a part of the host visualization without affecting the zoom level of the whole visualization. In addition, by using the mousewheel, users can control the zooming scale of the magnifying lenses.
<img src="https://github.com/VisDockHub/NewVisDock/blob/master/Tutorial/forcedirected5.png?raw=true" height = "300" width = "400">

### Chrome compatibility
VisDock-enabled examples best run in FireFox without fewest bugs. However, running these examples in FireFox can be noticeably slower than Chrome. Therefore, we have implemented a temporary measure to get around Chrome bugs.
<pre><code>

VisDock.startChrome();
/* Lines of Codes
   ...
   ...
                 */
VisDock.finishChrome();
</code></pre>
Whenever the viewport undergoes change, whether it is as simple as adding a new SVG element or transition of some sort, these two lines need to be called before and after. For instance, the force directed layout example constantly updates position of the nodes:
<pre><code>
  force.on("tick", function() {

    VisDock.startChrome(); // Must be included before transition occurs

    VisDock.updateLayers(); // This command updates VisDock Layers
    AnnotationByData.update(); // This command updates annotations
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
    
    VisDock.finishChrome(); // Must be included after transition ends
  })
</code></pre>
Note: these lines do not need be included for FireFox users.

<a href="https://github.com/VisDockHub/NewVisDock/blob/master/documentations.md">Go to VisDock Documentations</a>
------------------------------------------------------------------------------------------------------
<a href="https://github.com/VisDockHub/NewVisDock/blob/master/examples.md">Go to VisDock Examples</a>
------------------------------------------------------------------------------------------------------
<a href="https://github.com/VisDockHub/NewVisDock/blob/master/README.md">Return to VisDock ReadMe</a>
------------------------------------------------------------------------------------------------------
