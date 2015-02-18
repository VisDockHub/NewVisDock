VisDock
=======

What is VisDock?
----------------------------------------------------------------------------------------------------
VisDock is an interactive web-visualization framework written in JavaScript. VisDock allows visualization
creators to import various VisDock tools into their host visuailzations for exploration and annotation
purposes. An <a href="http://www.youtube.com/watch?v=jBQ4gfPtG_Q&feature=youtu.be">introduction video</a> on VisDock implementation is available on YouTube.

<img src="https://github.com/VisDockHub/NewVisDock/blob/master/Others/bundle1.png?raw=true" height = "400" width = "400" align = "mid">

Say you have built a visualization like the one shown above (<a href="http://bl.ocks.org/mbostock/4063269">original work</a> by M. Bostock). 

<br>
<br>
<img src="https://github.com/VisDockHub/NewVisDock/blob/master/Others/bundle2.png?raw=true" height = "400" width = "400" align = "mid">

```javascript
VisDock.init('body', width, height);  // VisDock Initialization
var viewport = VisDock.getViewport();
```

VisDock Toolkit and the Overview can be loaded with only two lines of codes (to learn more go to <a href="https://github.com/VisDockHub/NewVisDock/blob/master/Tutorial.md">Tutorial</a>). Be sure to populate the original elements in "viewport"

```javascript
var svg = viewport;
```

<br>
<br>
<img src="https://github.com/VisDockHub/NewVisDock/blob/master/Others/bundle4.png?raw=true" height = "400" width = "400" align = "mid"><img src="https://github.com/VisDockHub/NewVisDock/blob/master/Others/bundle5.png?raw=true" height = "400" width = "400" align = "mid">

VisDock Toolkit offers various navigation options. In the figures above, pan, zoom, rotation tools, and magnifying lenses (the box with grey-stroke) have been showcased. Up to this point, no coding effort is required at all. All you have to do is just to import VisDock libraries and initialize the VisDock. Beyond this point where selection and annotations are used, minor additional coding will be required.

<br>
<br>
<img src="https://github.com/VisDockHub/NewVisDock/blob/master/Others/bundle3.png?raw=true" height = "400" width = "400" align = "mid">

```javascript
VisDock.eventHandler = {
        getHitsPolygon: function(points, inclusive, t) {
            var shapebound = new createPolygon(points); 
            return shapebound.intersectEllipse(d3.selectAll("circle")[0], inclusive)
        },
        getHitsEllipse: function(points, inclusive, t) {
            var shapebound = new createEllipse(points); 
            return shapebound.intersectEllipse(d3.selectAll("circle")[0], inclusive)
        },
        getHitsLine: function(points, inclusive) {
            var shapebound = new createLine(points); 
            return shapebound.intersectEllipse(d3.selectAll("circle")[0], inclusive)
        },
        setColor: function(hits) {
            for (var i = 0; i < hits.length; i++) {
                VisDock.utils.addEllipseLayer(hits[i], undefined);
            }
        },
        changeColor: function(color, query, index) {
            VisDock.utils.changeColor(color, query, "fill")
        },
        changeVisibility: function(vis, query, index) {
            VisDock.utils.changeVisibility(vis, query)
        },
        removeColor: function(hits, index) {
            for (var i = 0; i < hits.length; i++) {
                hits[i].remove();
            }
        }
}
```
In order to implement selections, the user-defined selection handler must be added to your original code. In this selection handler, you may define what event occurs when users use rectangle, ellipse, lasso, or line tools. Users may use these various shapes to select objects and you, the developer, can decide what happens to the selected. For instance, in the <a href="https://github.com/VisDockHub/NewVisDock/blob/master/Tutorial.md">tutorial</a>, we show how to create clone elements to hightlight the selection.

Responsive VisDock 
----------------------------------------------------------------------------------------------------
Currently, We are working on VisDock such that it is responsive to change in the size of the window. So far the VisDock changes its size in reponse to the window size adjustment. This concept can be expanded to arrangement of the buttons or re-alignment of the menu/query box, and etc.
<br>
<img src="https://github.com/VisDockHub/NewVisDock/blob/master/Others/responsive.png?raw=true" height = "250" width = "600" align = "mid">
<br>
As shown in the figure above, the toolkit expands and shrinks as the window size changes.

Multiple viewport support
----------------------------------------------------------------------------------------------------
VisDock now supports Multiple viewport canvases. In order to import VisDock and control more than one viewport, you can initialize VisDock in the following manner:

```
var container = ["#div1", "#div2"];
var sizes = [{width: w1, height: h1}, {width: w2, height: h2}];
VisDock.init(container, sizes);
var viewport1 = VisDock.getViewport(0);
var viewport2 = VisDock.getViewport(1);
```

<img src="https://github.com/VisDockHub/NewVisDock/blob/master/Others/multi.png?raw=true" height = "400" width = "800" align = "mid">

<a href="https://github.com/VisDockHub/NewVisDock/blob/master/documentations.md">Go to VisDock Documentations</a>
------------------------------------------------------------------------------------------------------
<a href="https://github.com/VisDockHub/NewVisDock/blob/master/Tutorial.md">Go to VisDock Tutorial</a>
------------------------------------------------------------------------------------------------------
<a href="https://github.com/VisDockHub/NewVisDock/blob/master/examples.md">Go to VisDock Examples</a>
------------------------------------------------------------------------------------------------------
