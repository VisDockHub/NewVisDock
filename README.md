VisDock
=======

VisDock Libraries
----------------------------------------------------------------------------------------------------
VisDock is an interactive web-visualization framework written in JavaScript. VisDock allows visualization
creators to import various VisDock tools into their host visuailzations for exploration and annotation
purposes.

<img src="https://github.com/VisDockHub/NewVisDock/blob/master/Others/bundle1.png?raw=true" height = "400" width = "400" align = "mid">

Say you have built a visualization like the one shown above (<a href="http://bl.ocks.org/mbostock/4063269">original work</a> by M. Bostock). 

<img src="https://github.com/VisDockHub/NewVisDock/blob/master/Others/bundle2.png?raw=true" height = "400" width = "400" align = "mid">

VisDock Toolkit and the Overview can be loaded with only two lines of codes (to learn more go to <a href="https://github.com/VisDockHub/NewVisDock/blob/master/Tutorial.md">Tutorial</a>).

<img src="https://github.com/VisDockHub/NewVisDock/blob/master/Others/bundle4.png?raw=true" height = "400" width = "400" align = "mid"><img src="https://github.com/VisDockHub/NewVisDock/blob/master/Others/bundle5.png?raw=true" height = "400" width = "400" align = "mid">

VisDock Toolkit offers various navigation options. In the figure above, panning, zooming and rotating have been showcased.



### VisDock.js
VisDock.js library contains various tools: such tools include cross-cutting selection tools,
pan/zoom tool, query management tools, and annotation tools. VisDock can be imported into any SVG
rendered visualizations.

### 2D.js and IntersectionLibrary.js
These libraries provide functions to determine whether the user-drawn shapes or lines cross the
boundaries of SVG objects. These files were obtained from Kevin Lindsey Software Development
(www.kevlindev.com). Cross-cutting selections can be made between:
- Path and Polygon
- Path and Elllipse
- Path and Line
- Polygon and Polygon
- Polygon and Ellipse
- Polygon and Line
- Ellipse and Ellipse
- Ellipse and Line
- Line and Line

### visdock.utils.js
2D.js and IntersectionLibrary.js provide functions to determine the intersection of any two SVG objects. For
VisDock.js users, the type of intersection is limited to between user-drawn shapes (polygons, ellipses, and
lines) and SVG objects in the host visualization. visdock.utils.js summarizes these intersections in a
more compact form.

#### Functions for Initializations and Sub-classes
Once the users have drawn a shape using Polygon, Lasso, or Rectangle tool, the array of 
the x and y coordinates of the verticies will be passed to the VisDock event handler. This array cannot 
be used directly for the verification of intersection because the 2D.js and IntersectionUtilities.js libraries require
specific object formats. The following functions initialize path, polygon, ellipse, and line elements 
from the 
In order to check the intersection between shapes, it may require to initialize the shapes as
an SVG shape class before passing them as argument. Here are the functions that initialize such shapes.
But note that not all shapes need to be initialized. We will explain further when an object needs to be
initialized.
  - createPolygon (points): initializes a polygon object created when Lasso, Polygon, and Rectangle selections
are made.
<br>
<pre><code>var NewPolygon = new createPolygon(points)
</code></pre>
    + points: when the users use Lasso, Polygon, and Rectangle tools, VisDock stores an array of points
for the lasso, polygon, and rectangle in the array form [[x1, y1], [x2, y2], [x3, y3], ... , [xn, yn]].<br>
    + Sub-classes: its sub-classes are used to verify intersection between NewPolygon and any SVG object.
<ul>
     <li> NewPolygon.intersectPath(path, inclusive): checks the inclusive/exclusive intersection between
NewPolygon and an SVG path element.
     <li> NewPolygon.intersectPolygon(polygon, inclusive): checks the inclusive/exclusive intersection
between NewPolygon and an SVG polygon element.
     <li> NewPolygon.intersectEllipse(path, inclusive): checks the inclusive/exclusive intersection
between NewPolygon and an SVG ellipse element.
     <li> NewPolygon.intersectLine(path, inclusive): checks the inclusive/exclusive intersection
between NewPolygon and an SVG line element.
</ul>
<br>
  
  - createEllipse (points): initializes an ellipse object created when Ellipse selections are made.
<br>
<pre><code>var NewEllipse = new createEllipse(points)
</code></pre>
    + points: when the users use Ellipse tool, VisDock stores an array of points for such ellipse
in the form [cx, cy, r1, r2]. <br>
    + Sub-classes: its sub-classes are used to verify intersection between NewEllipse and any SVG object.
<ul>
     <li> NewEllipse.intersectPath(path, inclusive): checks the inclusive/exclusive intersection between
NewEllipse and an SVG path element.
     <li> NewEllipse.intersectPolygon(polygon, inclusive): checks the inclusive/exclusive intersection
between NewEllipse and an SVG polygon element.
     <li> NewEllipse.intersectEllipse(path, inclusive): checks the inclusive/exclusive intersection
between NewEllipse and an SVG ellipse element.
     <li> NewEllipse.intersectLine(path, inclusive): checks the inclusive/exclusive intersection
between NewEllipse and an SVG line element.
</ul>
<br>
    
  - createLine (points): initializes a line/polylinee object created when StraightLine, Polyline and Freeselect
selections are made.
<br>
<pre><code>var NewLine = new createLine(points)
</code></pre>
    + points: when the user uses StraightLine, Polyline, and Freeselection tools, VisDock stores an
array of points for such in the form [[x1, y1], [x2, y2], [x3, y3], ... , [xn, yn]]. Note that if the line
is a straight line, the array would contain only 2 elements.
<br>
    + Sub-classes: its sub-classes are used to verify intersection between NewLine and any SVG object.
<ul>
     <li> NewLine.intersectPath(path, inclusive): checks the inclusive/exclusive intersection between
NewLine and an SVG path element.
     <li> NewLine.intersectPolygon(polygon, inclusive): checks the inclusive/exclusive intersection
between NewNew and an SVG polygon element.
     <li> NewLine.intersectEllipse(path, inclusive): checks the inclusive/exclusive intersection
between NewLine and an SVG ellipse element.
     <li> NewLine.intersectLine(path, true): checks the inclusive intersection
between NewLine and an SVG line element (note that there cannot be any exclusive intersection between
a line and another line).
</ul>
<br> 
    
#### Other important functions:
Inside the visdock class are a few important functions that are desgined to aid proper display of the layers. 
The newly created layers have visibility and color attributes. Some of these functions can add/change these
attributes as the users desire.
  - Query attributes retrieval: the following functions return the color and visibility attributes of the
query.
    + VisDock.utils.getQueryColor(index): returns the RGB color (#0000FF) or color name (blue) of the query. The
input argument is the index of the query.<br>
    + VisDock.utils.getQueryVisibility(index): returns the visibility of the query layers.
    
  - Layer management: the following functions create layers for the queried objects.

    + VisDock.utils.addPathLayer(path, style, index): creates an SVG path layer on top of the SVG path element
passed as argument. Its 'path data' attribute would be the same but its color and visibility attributes are
governed by the Query Manager or user-defined style argument. Its 'class' attribute will be "VisDockPathLayer."
<br>
    + VisDock.utils.addPolygonLayer(polygon, style, index): creates an SVG polygon layer on top of the SVG polygon element
passed as argument. Its 'points' attribute would be the same but its color and visibility attributes are
governed by the Query Manager or user-defined style argument. Its 'class' attribute will be "VisDockPolygonLayer." 
<br>
    + VisDock.utils.addEllipseLayer(ellipse, style, index): creates an SVG ellipse layer on top of the SVG ellipse element
passed as argument. Its radii and center cooridinates attributes would be the same but its color and visibility
attributes are governed by the Query Manager or user-defined style argument. Its 'class' attribute will be "VisDockEllipseLayer."
<br>
    + VisDock.utils.addLineLayer(line, style, index): creates an SVG line/polyline layer on top of the SVG line/polyline
elemtnt passed as argument. Its 'points' attribute would be the same but its color and visibility attributes
are governed by the Query Manager or user-defined style argument. Its 'class' attribute will be "VisDockLineLayer."
<br>
    + VisDock.utils.addTextLayer(label, style, index): creates an SVG label layer on top of the SVG label
elemtnt passed as argument. Its 'style' attribute and text would be the same but its color and visibility
attributes are governed by the Query Manager or user-defined style argument. Its 'class' attribute will be "VisDockTextLayer."

  - Update for Dynamic Visualizations: if the under-lying host visualizatioin is dynamic in nature, i.e. its 
SVG elements chaing position, shape or other attributes over time, the VisDock frame needs to keep up with this 
change. 

    + AnnotationByData.update(): regular annotations may become obsolete because their reference position is fixed to x, y coordinates. However, annotations By Space Data can be updated with this command which will subsequently re-locate
the annotation reference to the new reference (i.e. new location of the SVG element to which the annotation is attached). This command can be invoked continuously for smooth transition.
    + VisDock.updateLayers(): when the under-lying host visualization changes, the cloned SVG elements need to be updated in the manner that reflects the change in the original SVG elements. This command updates the shape, position and other attributes of the cloned elements (may be invoked continously).

<a href="https://github.com/VisDockHub/NewVisDock/blob/master/Tutorial.md">Go to VisDock Tutorials</a>
------------------------------------------------------------------------------------------------------
<a href="https://github.com/VisDockHub/NewVisDock/blob/master/examples.md">Go to VisDock Examples</a>
------------------------------------------------------------------------------------------------------
