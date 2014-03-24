function createPolygon(points) {
	var shapebound = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
	var strpoints = [];

	for (var i = 0; i < points.length; i++) {
		if (i != points.length - 1) {
			strpoints = [strpoints + (points[i][0]) + "," + (points[i][1]) + " "];
		} else {
			strpoints = [strpoints + (points[i][0]) + "," + (points[i][1]) + " "];
		}
	}
	strpoints = [strpoints + (points[0][0]) + "," + (points[0][1])];
	shapebound.setAttributeNS(null, "points", strpoints);

	var vector_points = [];
	for (var j = 0; j < points.length; j++) {
		vector_points[j] = new Point2D(points[j][0], points[j][1])
	}

	this.shapebound = shapebound;
	this.points = points;
	this.strpoints = strpoints;
	this.shapebound2D = new Polygon(shapebound);
	this.vector_points = vector_points;
}

createPolygon.prototype.intersectPath = function(shape, inclusive) {
	var hits = [];
	for ( u = 0; u < shape.length; u++) {
		var path = shape[u]//[0]
		if (path.getAttributeNS(null, "class") == "VisDockPathLayer") {
			
			//return [];
		}
		//var shapebound2D = this.shapebound2D;

		var shapebound2D = this.shapebound2D;
		var shapebound = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
		var TMat = path.getCTM().inverse();
		var tpoints = [];
		var strpoints = "";
		for (var i = 0; i < this.points.length; i++){
			tpoints[0] = (this.points[i][0]+Panel.x) * TMat.a + (this.points[i][1]+Panel.y) * TMat.c + TMat.e;
			tpoints[1] = (this.points[i][0]+Panel.x) * TMat.b + (this.points[i][1]+Panel.y) * TMat.d + TMat.f; 
			strpoints = [strpoints + (tpoints[0]) + "," + (tpoints[1]) + " "]
		}
		tpoints[0] = (this.points[0][0]+Panel.x) * TMat.a + (this.points[0][1]+Panel.y) * TMat.c + TMat.e;
		tpoints[1] = (this.points[0][0]+Panel.x) * TMat.b + (this.points[0][1]+Panel.y) * TMat.d + TMat.f;
		//vector_points[j] = new Point2D(tpoints[0], tpoints[1])
		strpoints = [strpoints + (tpoints[0]) + "," + (tpoints[1])]		
		
		shapebound.setAttributeNS(null, "points", strpoints);			
		var shapebound2D = new Polygon(shapebound);				
		
		/*if (path.getAttributeNS(null, "transform") != ""){
			var t = path.getAttributeNS(null, "transform").split("(")[1].split(")")[0].split(",");
			var tx = parseFloat(t[0]);
			var ty = parseFloat(t[1]);

			var shapebound = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
			var strpoints = [];

			for (var i = 0; i < this.points.length; i++) {
				if (i != points.length - 1) {
					strpoints = [strpoints + (this.points[i][0]-tx) + "," + (this.points[i][1]-ty) + " "];
				} else {
					strpoints = [strpoints + (this.points[i][0]-tx) + "," + (this.points[i][1]-ty) + " "];
				}
			}
			strpoints = [strpoints + (this.points[0][0]-tx) + "," + (this.points[0][1]-ty)];
			shapebound.setAttributeNS(null, "points", strpoints);			
			var shapebound2D = new Polygon(shapebound);
		}
		*/
		/*for (var i = 0; i < this.shapebound2D.handles.length; i++){
			this.shapebound2D.handles[i].point.x -= tx;
			this.shapebound2D.handles[i].point.y -= ty;
		}*/
		
		var P = new Path(path);
		var s = path.getAttributeNS(null, "d")
		var s = path.getAttributeNS(null, "d").split(/[MLHVCSQTAZmlhvcsqtaz ]/i)
		var i = 0;
		var j = 0;
		while (i == 0){
			if (path.getAttributeNS(null, "d") != "" && s[j] != undefined) {
				if (s[j].split(",").length == 2){
					var x = parseFloat(s[j].split(",")[0]); 
					var y = parseFloat(s[j].split(",")[1]);
					i = 1;
				} else {
					j++;
				}
			} else {
				var x = -1;
				var y = -1;
				i = 1;
			}
			
		} 
		
		//var xy = s[0]		
		
		var rel = ["M", "L", "H", "V", "C", "S", "Q", "T", "A", "Z", "m", "l", "h", "v", "c", "s", "q", "t", "a", "z",
		 " ", ","];
		//var x = "";
		//var y = "";
		/*while (i < 2) {

			if (i == 0) {
				if (rel.indexOf(s[j]) == -1) {
					x = x + s[j].toString();
				} else {
					if (j != 0) {
						i++;
					}
				}
			} else if (i == 1) {
				if (rel.indexOf(s[j]) == -1) {
					y = y + s[j].toString();
				} else {
					i++;
				}
			}
			j++
		}*/
		
		var pt = new Point2D(x, y);
		if (shapebound2D.pointInPolygon(pt)) {
			//alert("JFSKDL")
			if (inclusive == false) {
				var result = Intersection.intersectPathShape(P, shapebound2D);
				if (result.status != "Intersection") {
					hits.push(path)
					/*viewport.append("circle")
						.attr("r", 4)
						.attr("cx", result.points[0].x)
						.attr("cy", result.points[0].y)
						.style("fill", "blue")

					viewport.append("circle")
						.attr("r", 4)
						.attr("cx", result.points[1].x)
						.attr("cy", result.points[1].y)
						.style("fill", "blue")*/
					//return 1;
				}
			} else {
				hits.push(path)
					/*viewport.append("circle")
						.attr("r", 4)
						.attr("cx", result.points[0].x)
						.attr("cy", result.points[0].y)
						.style("fill", "blue")

					viewport.append("circle")
						.attr("r", 4)
						.attr("cx", result.points[1].x)
						.attr("cy", result.points[1].y)
						.style("fill", "blue")*/				
			}
		} else {
			var result = Intersection.intersectPathShape(P, shapebound2D);

			if (result.status == "Intersection") {
				hits.push(path)
					/*viewport.append("circle")
						.attr("r", 4)
						.attr("cx", result.points[0].x)
						.attr("cy", result.points[0].y)
						.style("fill", "blue")

					viewport.append("circle")
						.attr("r", 4)
						.attr("cx", result.points[1].x)
						.attr("cy", result.points[1].y)
						.style("fill", "blue")*/				
				
			}
		}
	}
	//this.shapebound2D = shapebound2D;
	return hits;
};

createPolygon.prototype.intersectPolygon = function(shape, inclusive) {
	var hits = [];
	for (var u = 0; u < shape.length; u++) {
		var polygon = shape[u]//[0];
		var strpoints = "";
		var vector_points2 = [];

		var TMat = polygon.getCTM().inverse();
		var vector_points = []
		var tpoints = [];
			
		for (var i = 0; i < this.points.length; i++){
			tpoints[0] = (this.points[i][0]+Panel.x) * TMat.a + (this.points[i][1]+Panel.y) * TMat.c + TMat.e;
			tpoints[1] = (this.points[i][0]+Panel.x) * TMat.b + (this.points[i][1]+Panel.y) * TMat.d + TMat.f;
			vector_points[i] = new Point2D(tpoints[0], tpoints[1]); 
			strpoints = [strpoints + (tpoints[0]) + "," + (tpoints[1]) + " "]
		}
		tpoints[0] = (this.points[0][0]+Panel.x) * TMat.a + (this.points[0][1]+Panel.y) * TMat.c + TMat.e;
		tpoints[1] = (this.points[0][0]+Panel.x) * TMat.b + (this.points[0][1]+Panel.y) * TMat.d + TMat.f;
		vector_points[i] = new Point2D(tpoints[0], tpoints[1]);				
		strpoints = [strpoints + (tpoints[0]) + "," + (tpoints[1]) + " "]
		
		if (polygon.tagName == "rect"){
			
			var px = parseFloat(polygon.getAttributeNS(null, "x"))
			var py = parseFloat(polygon.getAttributeNS(null, "y"))
			if (isNaN(px)){
				px = 0;
			}
			if (isNaN(py)){
				py = 0;
			}
			var height = parseFloat(polygon.getAttributeNS(null, "height"))
			var width = parseFloat(polygon.getAttributeNS(null, "width"))

			//var shapebound2D = this.shapebound2D;
			var shapebound = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
			
			shapebound.setAttributeNS(null, "points", strpoints);			
			var shapebound2D = new Polygon(shapebound);		

			var boundsvg = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
			var newpoints = px.toString() + "," + py.toString() + " " + (px+width).toString() + "," + py.toString() + " " 
				+ (px+width).toString() + "," + (py+height).toString() + " " + px.toString() + "," + (py+height).toString();
			boundsvg.setAttributeNS(null, "points", newpoints)	
			var bound = new Polygon(boundsvg);
						
			vector_points2[0] = new Point2D(px, py)
			vector_points2[1] = new Point2D(px+width, py)
			vector_points2[2] = new Point2D(px+width, py+height)
			vector_points2[3] = new Point2D(px, py+height)
			var p_x = px;
			var p_y = py; 
		} else {
			var bound = new Polygon(polygon);
			var points2 = polygon.getAttributeNS(null, "points").split(" ")
			for (var j = 0; j < points2.length; j++) {
				var pxy = points2[j].split(",");
				var px = parseInt(pxy[0]);
				var py = parseInt(pxy[1]);
				vector_points2[j] = new Point2D(px, py)
			}
			var pxy = points2[0].split(",");
			var p_x = pxy[0];
			var p_y = pxy[1];
		}
		var p = new Point2D(p_x, p_y);
		var p2 = new Point2D(tpoints[0], tpoints[1])

		if (inclusive != true) {
			var result = Intersection.intersectPolygonPolygon(vector_points, vector_points2)
			if (result.status == "Intersection") {
				//return 0;
			} else {
				if (shapebound2D.pointInPolygon(p) || bound.pointInPolygon(p2)) {
					if (polygon.getAttributeNS(null, "class") != "VisDockPolygonLayer")
					hits.push(polygon)
					//return 1;
				}

			}
		} else {
			var result = Intersection.intersectPolygonPolygon(vector_points, vector_points2)
			if (shapebound2D.pointInPolygon(p) || bound.pointInPolygon(p2) || result.status == "Intersection") {
				if (polygon.getAttributeNS(null, "class") != "VisDockPolygonLayer")
				hits.push(polygon)
				//return 1;
			}

		}
	}
	return hits;
};

createPolygon.prototype.intersectEllipse = function(shape, inclusive) {
	var hits = [];
	for ( i = 0; i < shape.length; i++) {
		var ellipse = shape[i]//[0];
		
		var shapebound = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
		var TMat = ellipse.getCTM().inverse();
		
		var tpoints = [];
		var vector_points = [];
		var strpoints = "";
		for (var j = 0; j < this.points.length; j++){
			tpoints[0] = (this.points[j][0]+Panel.x) * TMat.a + (this.points[j][1]+Panel.y) * TMat.c + TMat.e;
			tpoints[1] = (this.points[j][0]+Panel.x) * TMat.b + (this.points[j][1]+Panel.y) * TMat.d + TMat.f;
			vector_points[j] = new Point2D(tpoints[0], tpoints[1])
			strpoints = [strpoints + (tpoints[0]) + "," + (tpoints[1]) + " "]
		}
		tpoints[0] = (this.points[0][0]+Panel.x) * TMat.a + (this.points[0][1]+Panel.y) * TMat.c + TMat.e;
		tpoints[1] = (this.points[0][0]+Panel.x) * TMat.b + (this.points[0][1]+Panel.y) * TMat.d + TMat.f;
		vector_points[j] = new Point2D(tpoints[0], tpoints[1])
		strpoints = [strpoints + (tpoints[0]) + "," + (tpoints[1])]
		
		shapebound.setAttributeNS(null, "points", strpoints);
		var shapebound2D = new Polygon(shapebound);
				
		var cx = ellipse.getAttributeNS(null, "cx");
		if (cx == ""){
			cx = 0;
		}
		var cy = ellipse.getAttributeNS(null, "cy");
		if (cy == ""){
			cy = 0;
		}
		
		var c = new Point2D(cx, cy);
		if (ellipse.tagName == "circle") {
			var rx = ellipse.getAttributeNS(null, "r");
			var ry = rx;
		} else if (ellipse.tagName == "ellipse") {
			var rx = ellipse.getAttributeNS(null, "rx");
			var ry = ellipse.getAttributeNS(null, "ry");
		}
		if (inclusive != true) {
			var result = Intersection.intersectEllipsePolygon(c, rx, ry, vector_points)
			if (result.status == "Intersection") {
				//return 0;
			} else {
				if (shapebound2D.pointInPolygon(c) || Math.pow((cx - vector_points[0].x) / rx, 2) + Math.pow((cy - vector_points[0].y) / ry, 2) <= 1) {
					hits.push(ellipse)
					//return 1;
				}
			}

		} else {
			var result = Intersection.intersectEllipsePolygon(c, rx, ry, vector_points)
			if (result.status == "Intersection" || shapebound2D.pointInPolygon(c) || Math.pow((cx - this.vector_points[0].x) / rx, 2) + Math.pow((cy - vector_points[0].y) / ry, 2) <= 1) {
				hits.push(ellipse)
				//return 1;
			}

		}
		//return 0;
	}
	return hits;
};

createPolygon.prototype.intersectLine = function(shape, inclusive) {
	var hits = [];
	for ( u = 0; u < shape.length; u++) {
		var line = shape[u]//[0];
		if (line.tagName == "polyline") {
			var points = line.getAttributeNS(null, "points").split(" ")
			for (var j = 0; j < points.length - 1; j++) {
				var pxy = points[j].split(",");
				var px = parseFloat(pxy[0]);
				var py = parseFloat(pxy[1]);
				var pxy2 = points[j + 1].split(",");
				var px2 = parseFloat(pxy2[0]);
				var py2 = parseFloat(pxy2[1]);

				var tpoints = [];
				var TMat = line.getCTM()//.inverse();
				
				tpoints[0] = x1 * TMat.a + y1 * TMat.c + TMat.e - Panel.x;
				tpoints[1] = x1 * TMat.b + y1 * TMat.d + TMat.f - Panel.y;			
				tpoints[2] = x2 * TMat.a + y2 * TMat.c + TMat.e - Panel.x;
				tpoints[3] = x2 * TMat.b + y2 * TMat.d + TMat.f - Panel.y;		

				var p1 = new Point2D(tpoints[0], tpoints[1]);
				var p2 = new Point2D(tpoints[2], tpoints[2]);
				var result = Intersection.intersectLinePolygon(p1, p2, this.vector_points);

				if (inclusive) {
					if (result.status == "Intersection" || this.shapebound2D.pointInPolygon(p1) || this.shapebound2D.pointInPolygon(p2)) {
						hits.push(line)
						//return 1;
					}
				} else {
					if (this.shapebound2D.pointInPolygon(p1) && this.shapebound2D.pointInPolygon(p2)) {
						hits.push(line)
						//return 1;
					}
				}
				//if (result.status == "Intersection" && inclusive != true) {

				//return 0;
				//}

			}
		} else if (line.tagName == "line") {
			
			var tpoints = [];
			var TMat = line.getCTM()//.inverse();
			
			var x1 = line.getAttributeNS(null, "x1");
			var y1 = line.getAttributeNS(null, "y1");
			var x2 = line.getAttributeNS(null, "x2");
			var y2 = line.getAttributeNS(null, "y2");
			
			/*tpoints[0] = (x1-1*Panel.x) * TMat.a + (y1-1*Panel.y) * TMat.c + TMat.e;
			tpoints[1] = (x1-1*Panel.x) * TMat.b + (y1-1*Panel.y) * TMat.d + TMat.f;			
			tpoints[2] = (x2-1*Panel.x) * TMat.a + (y2-1*Panel.y) * TMat.c + TMat.e;
			tpoints[3] = (x2-1*Panel.x) * TMat.b + (y2-1*Panel.y) * TMat.d + TMat.f;*/

			tpoints[0] = (x1-0*Panel.x) * TMat.a + (y1-0*Panel.y) * TMat.c + TMat.e - Panel.x;
			tpoints[1] = (x1-0*Panel.x) * TMat.b + (y1-0*Panel.y) * TMat.d + TMat.f - Panel.y;			
			tpoints[2] = (x2-0*Panel.x) * TMat.a + (y2-0*Panel.y) * TMat.c + TMat.e - Panel.x;
			tpoints[3] = (x2-0*Panel.x) * TMat.b + (y2-0*Panel.y) * TMat.d + TMat.f - Panel.y;						
		
			//var p1 = new Point2D(x1, y1)
			//var p2 = new Point2D(x2, y2)			
			var p1 = new Point2D(tpoints[0], tpoints[1])
			var p2 = new Point2D(tpoints[2], tpoints[3])
			var result = Intersection.intersectLinePolygon(p1, p2, this.vector_points);
			//alert(result.status)
			if (inclusive) {
				if (result.status == "Intersection" || this.shapebound2D.pointInPolygon(p1) || this.shapebound2D.pointInPolygon(p2)) {
					hits.push(line)
					//return 1;
				}

			} else {
				if (this.shapebound2D.pointInPolygon(p1) && this.shapebound2D.pointInPolygon(p2)) {
					hits.push(line)
					//return 1;
				}
			}
		}
	}
	return hits;
};

function createEllipse(points) {
	var ellipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");

	var ecx = points[0];
	var ecy = points[1];
	var rx = points[2];
	var ry = points[3];

	ellipse.setAttributeNS(null, "cx", ecx)
	ellipse.setAttributeNS(null, "cy", ecy)
	ellipse.setAttributeNS(null, "rx", rx)
	ellipse.setAttributeNS(null, "ry", ry)

	this.ellipse = ellipse;
	this.points = points;
	this.ellipse2D = new Ellipse(ellipse)
}

createEllipse.prototype.intersectPath = function(shape, inclusive) {
	var hits = [];
	for ( u = 0; u < shape.length; u++) {
		var path = shape[u]//[0]
		var P = new Path(path);
		var s = path.getAttributeNS(null, "d").split(/[MLHVCSQTAZmlhvcsqtaz ]/i)
	
		while (i == 0){
			if (path.getAttributeNS(null, "d") != "" && s[j] != undefined){
				if (s[j].split(",").length == 2){
					var x = parseFloat(s[j].split(",")[0]);
					var y = parseFloat(s[j].split(",")[1]);
					i = 1;
				} else {
					j++;
				}
			} else {
				var x = -1;
				var y = -1;
				i = 1;
			}
		} 

		var rel = ["M", "L", "H", "V", "C", "S", "Q", "T", "A", "Z", "m", "l", "h", "v", "c", "s", "q", "t", "a", "z", " ", ","];
		var i = 0;
		var j = 0;
		//var x = "";
		//var y = "";

		/*while (i < 2) {

			if (i == 0) {
				if (rel.indexOf(s[j]) == -1) {
					x = x + s[j].toString();
				} else {
					if (j != 0) {
						i++;
					}
				}
			} else if (i == 1) {
				if (rel.indexOf(s[j]) == -1) {
					y = y + s[j].toString();
				} else {
					i++;
				}
				
			}
			j++
		}*/
		var TMat = path.getCTM().inverse();
		var tpoints = [];
		//var cx = this.points[0];
		//var cy = this.points[1];
		tpoints[0] = (this.points[0]+Panel.x) * TMat.a + (this.points[1]+Panel.y) * TMat.c + TMat.e;
		tpoints[1] = (this.points[0]+Panel.x) * TMat.b + (this.points[1]+Panel.y) * TMat.d + TMat.f; 
		
		//var rx = this.points[2];
		//var ry = this.points[3];
		tpoints[2] = (this.points[0]+this.points[2]+Panel.x) * TMat.a +
		 (this.points[1]+this.points[3]+Panel.y) * TMat.c + TMat.e - tpoints[0];
		tpoints[3] = (this.points[0]+this.points[2]+Panel.x) * TMat.b +
		 (this.points[1]+this.points[3]+Panel.y) * TMat.d + TMat.f - tpoints[1]; 		
		//x = xy[0];
		//y = -1;
		//x = parseFloat(xy[0]);
		//y = parseFloat(xy[1]);
		var cx = tpoints[0];
		var cy = tpoints[1];
		var rx = tpoints[2];
		var ry = tpoints[3];
		var ellipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
		ellipse.setAttributeNS(null, "cx", cx)
		ellipse.setAttributeNS(null, "cy", cy)
		ellipse.setAttributeNS(null, "rx", rx)
		ellipse.setAttributeNS(null, "ry", ry)
		var ellipse2D = new Ellipse(ellipse);
		/*
		if (path.getAttributeNS(null, "transform") != ""){
			var t = path.getAttributeNS(null, "transform").split("(")[1].split(")")[0].split(",");
			var tx = parseFloat(t[0]);
			var ty = parseFloat(t[1]);

			var ellipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");

			var ecx = this.points[0] - tx;
			var ecy = this.points[1] - ty;
			var rx = this.points[2];
			var ry = this.points[3];

			ellipse.setAttributeNS(null, "cx", ecx)
			ellipse.setAttributeNS(null, "cy", ecy)
			ellipse.setAttributeNS(null, "rx", rx)
			ellipse.setAttributeNS(null, "ry", ry)
			
			var ellipse2D = new Ellipse(ellipse);
		}*/

		if (inclusive == true) {
			var result = Intersection.intersectPathShape(P, ellipse2D)
			if (result.status == "Intersection" || Math.pow((cx - x) / rx, 2) + Math.pow((cy - y) / ry, 2) <= 1) {
				hits.push(path)
				//return 1;
			}
		} else {
			if (result.status != "Intersection" && Math.pow((cx - x) / rx, 2) + Math.pow((cy - y) / ry, 2) <= 1) {
				hits.push(path)
			}
		}
	}
	return hits;
};
createEllipse.prototype.intersectPolygon = function(shape, inclusive) {
	var hits = [];
	for ( u = 0; u < shape.length; u++) {
		var polygon = shape[u]//[0]
		var vector_points = [];

		if (polygon.tagName == "rect"){
			var px = parseFloat(polygon.getAttributeNS(null, "x"))
			var py = parseFloat(polygon.getAttributeNS(null, "y"))
			if (isNaN(px)) px = 0;
			if (isNaN(py)) py = 0;
			var height = parseFloat(polygon.getAttributeNS(null, "height"))
			var width = parseFloat(polygon.getAttributeNS(null, "width"))
			
			var boundsvg = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
			var newpoints = px.toString() + "," + py.toString() + " " + (px+width).toString() + "," + py.toString() + " " 
				+ (px+width).toString() + "," + (py+height).toString() + " " + px.toString() + "," + (py+height).toString();
			boundsvg.setAttributeNS(null, "points", newpoints)	
			var bound = new Polygon(boundsvg);
						
			vector_points[0] = new Point2D(px, py)
			vector_points[1] = new Point2D(px+width, py)
			vector_points[2] = new Point2D(px+width, py+height)
			vector_points[3] = new Point2D(px, py+height)
			var p_x = px;
			var p_y = py; 
		}else{
			var points = polygon.getAttributeNS(null, "points").split(" ")
			for (var j = 0; j < points.length; j++) {
				var pxy = points[j].split(",");
				var px = parseInt(pxy[0]);
				var py = parseInt(pxy[1]);
				vector_points[j] = new Point2D(px, py)
			}
			var bound = new Polygon(polygon)
		}
		
		var TMat = polygon.getCTM().inverse();
		var tpoints = [];
		
		var cx = this.points[0];
		var cy = this.points[1];
		tpoints[0] = (cx+Panel.x) * TMat.a + (cy+Panel.y) * TMat.c + TMat.e;
		tpoints[1] = (cx+Panel.x) * TMat.b + (cy+Panel.y) * TMat.d + TMat.f;
		var c = new Point2D(cx, cy);
		var rx = this.points[2];
		var ry = this.points[3];
		tpoints[2] = (cx-rx+Panel.x) * TMat.a + (cy+Panel.y) * TMat.c + TMat.e;
		tpoints[3] = (cx+Panel.x) * TMat.b + (cy-ry+Panel.y) * TMat.d + TMat.f;
		cx = tpoints[0];
		cy = tpoints[1];
		rx = tpoints[0] - tpoints[2];
		ry = tpoints[1] - tpoints[3];
		
		if (inclusive != true) {
			var result = Intersection.intersectEllipsePolygon(c, rx, ry, vector_points)
			if (result.status != "Intersection") {
				if (bound.pointInPolygon(c) || Math.pow((cx - vector_points[0].x) / rx, 2) + Math.pow((cy - vector_points[0].y) / ry, 2) <= 1) {
					hits.push(polygon)
				}
				//return 0;
			}
		} else {
			var result = Intersection.intersectEllipsePolygon(c, rx, ry, vector_points)
			if (result.status == "Intersection" || bound.pointInPolygon(c) || Math.pow((cx - vector_points[0].x) / rx, 2) + Math.pow((cy - vector_points[0].y) / ry, 2) <= 1) {
				hits.push(polygon)
				//return 1;
			}
		}

	}
	return hits;
};

createEllipse.prototype.intersectEllipse = function(shape, inclusive) {
	var hits = [];
	for ( u = 0; u < shape.length; u++) {
		var ellipse = shape[u]//[0];
		var ecx = ellipse.getAttributeNS(null, "cx");
		if (ecx == "") ecx = 0;
		var ecy = ellipse.getAttributeNS(null, "cy");
		if (ecy == "") ecy = 0;
		if (ellipse.tagName == "circle") {
			var rx = ellipse.getAttributeNS(null, "r");
			var ry = rx;
		} else if (ellipse.tagName == "ellipse") {
			var rx = ellipse.getAttributeNS(null, "rx");
			var ry = ellipse.getAttributeNS(null, "ry");
		}

		var ec = new Point2D(ecx, ecy);
		
		var TMat = ellipse.getCTM().inverse();
		
		
		var cx = (this.points[0]+Panel.x) * TMat.a + (this.points[1]+Panel.y) * TMat.c + TMat.e;//this.points[0];
		var cy = (this.points[0]+Panel.x) * TMat.b + (this.points[1]+Panel.y) * TMat.d + TMat.f;//this.points[1];
		var r1 = this.points[2] * TMat.a;
		var r2 = this.points[3] * TMat.d;
		var c = new Point2D(cx, cy);

		if (inclusive != true) {
			var result = Intersection.intersectEllipseEllipse(c, r1, r2, ec, rx, ry)
			if (result.status != "Intersection") {
				if (Math.pow((cx - ecx) / rx, 2) + Math.pow((cy - ecy) / ry, 2) <= 1 || Math.pow((cx - ecx) / r1, 2) + Math.pow((cy - ecy) / r2, 2) <= 1) {
					hits.push(ellipse)
				}

			}
		} else {
			var result = Intersection.intersectEllipseEllipse(c, r1, r2, ec, rx, ry)
			if (result.status == "Intersection" || Math.pow((cx - ecx) / rx, 2) + Math.pow((cy - ecy) / ry, 2) <= 1 || Math.pow((cx - ecx) / r1, 2) + Math.pow((cy - ecy) / r2, 2) <= 1) {
				hits.push(ellipse)
				//return 1;
			}
		}

	}
	return hits;
};

createEllipse.prototype.intersectLine = function(shape, inclusive) {
	var hits = [];
	for ( u = 0; u < shape.length; u++) {
		var line = shape[u]//[0];
		var cx = this.points[0];
		var cy = this.points[1];
		var c = new Point2D(cx, cy);
		var rx = this.points[2];
		var ry = this.points[3];

		if (line.tagName == "polyline") {
			var strpoints = line.getAttributeNS(null, "points").split(" ")
			var points = []
			var count = 0;
			for (var v = 0; v < strpoints.length; v++){
				if (strpoints[v] != ""){
					points[count] = []
					points[count][0] = parseFloat(strpoints[v].split(",")[0])
					points[count][1] = parseFloat(strpoints[v].split(",")[1])
				}
			}
				
			for (var j = 0; j < points.length - 1; j++) {
				
				var TMat = line.getCTM()//.inverse();
			
				var x1 = (points[j][0]) * TMat.a + (points[j][1]) * TMat.c + TMat.e - Panel.x;
				var y1 = (points[j][0]) * TMat.b + (points[j][1]) * TMat.d + TMat.f - Panel.y;			
				var x2 = (points[j+1][0]) * TMat.a + (points[j+1][1]) * TMat.c + TMat.e - Panel.x;
				var y2 = (points[j+1][0]) * TMat.b + (points[j+1][1]) * TMat.d + TMat.f - Panel.y;				
				
				var a1 = new Point2D(x1, y1);
				var a2 = new Point2D(x2, y2);
				if (inclusive) {
					var result = Intersection.intersectEllipseLine(c, this.points[2], this.points[3], a1, a2)
					if (result.status == "Intersection" || Math.pow((cx - x1) / rx, 2) + Math.pow((cy - y1) / ry, 2) <= 1) {
						hits.push(line)
						//return 1;
					}
				} else {
					if (result.status != "Intersection") {
						if (Math.pow((cx - x1) / rx, 2) + Math.pow((cy - y1) / ry, 2) <= 1) {
							hits.push(line)
							//return 1;
						}
						//return 0;
					}

				}

			}
		} else if (line.tagName == "line") {
			
			var TMat = line.getCTM()//.inverse();
			
			var points = [];
			points[0] = [];
			points[1] = [];
			
			points[0][0] = parseFloat(line.getAttributeNS(null, "x1"));
			points[0][1] = parseFloat(line.getAttributeNS(null, "y1"));
			points[1][0] = parseFloat(line.getAttributeNS(null, "x2"));
			points[1][1] = parseFloat(line.getAttributeNS(null, "y2"));
			
			var x1 = (points[0][0]) * TMat.a + (points[0][1]) * TMat.c + TMat.e - Panel.x;
			var y1 = (points[0][0]) * TMat.b + (points[0][1]) * TMat.d + TMat.f - Panel.y;			
			var x2 = (points[1][0]) * TMat.a + (points[1][1]) * TMat.c + TMat.e - Panel.x;
			var y2 = (points[1][0]) * TMat.b + (points[1][1]) * TMat.d + TMat.f - Panel.y;		
				
			var a1 = new Point2D(x1, y1);
			var a2 = new Point2D(x2, y2);			
			
			//var a1 = new Point2D(points[0][0], points[0][1]);
			//var a2 = new Point2D(points[1][0], points[1][1]);
			var result = Intersection.intersectEllipseLine(c, this.points[2], this.points[3], a1, a2)
			if (inclusive) {
				if (result.status == "Intersection" || Math.pow((cx - x1) / rx, 2) + Math.pow((cy - y1) / ry, 2) <= 1) {
					hits.push(line)
				}
			} else {
				if (result.status != "Intersection") {
					if (Math.pow((cx - x1) / rx, 2) + Math.pow((cy - y1) / ry, 2) <= 1) {
						return 1;
					}
				}
			}
		}
	}
	return hits;
};

function createLine(points) {
	if (points.length == 2) {
		var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		var x1 = points[0][0];
		var y1 = points[0][1];
		var x2 = points[1][0];
		var y2 = points[1][1];
		line.setAttributeNS(null, "x1", x1);
		line.setAttributeNS(null, "y1", y1);
		line.setAttributeNS(null, "x2", x2);
		line.setAttributeNS(null, "y2", y2);
	} else if (points.length > 2) {
		var line = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
		var strpoints = [];

		for (var i = 0; i < points.length; i++) {
			if (i != points.length - 1) {
				strpoints = [strpoints + (points[i][0]) + "," + (points[i][1]) + " "];
			} else {
				strpoints = [strpoints + (points[i][0]) + "," + (points[i][1]) + " "];
			}
		}
		strpoints = [strpoints + (points[0][0]) + "," + (points[0][1])];
		line.setAttributeNS(null, "points", strpoints);
	}
	this.line = line;
	this.points = points;
}

createLine.prototype.intersectPath = function(shape, inclusive) {
	var hits = [];
	for ( u = 0; u < shape.length; u++) {
		var path = shape[u]//[0]
		var P = new Path(path)
		if (this.points.length > 2 || this.line.tagName == "polyline") {
			for (var j = 0; j < this.points.length - 1; j++) {
				var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
				line.setAttributeNS(null, "x1", this.points[j][0])
				line.setAttributeNS(null, "y1", this.points[j][1])
				line.setAttributeNS(null, "x2", this.points[j+1][0])
				line.setAttributeNS(null, "y2", this.points[j+1][1])
				var L = new Line(line);
				var result = Intersection.intersectPathShape(P, L);
				if (result.status == "Intersection") {
					hits.push(path)
					//return 1;
				}
			}
		} else {
			var L = new Line(this.line);
			var result = Intersection.intersectPathShape(P, L);
			if (result.status == "Intersection") {
				hits.push(path)
				//return 1;
			}
		}
	}
	return hits;
};

createLine.prototype.intersectPolygon = function(shape, inclusive, t) {
	var hits = [];
	for ( u = 0; u < shape.length; u++) {
		var polygon = shape[u]//[0];
		var shapebound = new Polygon(polygon)
		var p1, p2;

		var vector_points = [];
		var points = polygon.getAttributeNS(null, "points").split(" ")
		for (var j = 0; j < points.length; j++) {
			var pxy = points[j].split(",");
			var px = parseInt(pxy[0]);
			var py = parseInt(pxy[1]);
			vector_points[j] = new Point2D(px, py)
		}

		for (var j = 0; j < this.points.length - 1; j++) {
			p1 = new Point2D(this.points[j][0], this.points[j][1])
			p2 = new Point2D(this.points[j+1][0], this.points[j+1][1])

			var result = Intersection.intersectLinePolygon(p1, p2, vector_points);
			if (result.status == "Intersection" || shapebound.pointInPolygon(p1) || shapebound.pointInPolygon(p2)) {
				hits.push(polygon)
				//return 1;
			}

		}
	}
	return hits;
};

createLine.prototype.intersectEllipse = function(shape, inclusive, t) {
	var hits = [];
	for ( u = 0; u < shape.length; u++) {
		var ellipse = shape[u]//[0]
		var cx = ellipse.getAttributeNS(null, "cx");
		if (cx == "") cx = 0;
		var cy = ellipse.getAttributeNS(null, "cy");
		if (cy == "") cy = 0;
		var c = new Point2D(cx, cy)
		if (ellipse.tagName == "circle") {// Circle
			var rx = ellipse.getAttributeNS(null, "r");
			var ry = rx;
		} else if (ellipse.tagName == "ellipse") {// Ellipse
			var rx = ellipse.getAttributeNS(null, "rx");
			var ry = ellipse.getAttributeNS(null, "ry");
		}
		if (this.points.length > 2) {
			for (var j = 0; j < this.points.length - 1; j++) {
				var a1 = new Point2D(this.points[j][0], this.points[j][1]);
				var a2 = new Point2D(this.points[j+1][0], this.points[j+1][1]);
				var result = Intersection.intersectEllipseLine(c, rx, ry, a1, a2)
				if (result.status == "Intersection") {
					hits.push(ellipse)
					//return 1;
				}
			}
		} else {
			var a1 = new Point2D(this.points[0][0], this.points[0][1]);
			var a2 = new Point2D(this.points[1][0], this.points[1][1]);
			var result = Intersection.intersectEllipseLine(c, rx, ry, a1, a2)
			if (result.status == "Intersection") {
				hits.push(ellipse)
				//return 1;
			}
		}
	}
	return hits;
};

createLine.prototype.intersectLine = function(shape, inclusive, t) {
	var hits = [];
	for ( u = 0; u < shape.length; u++) {
		var line = shape[u]//[0];
		if (line.tagName == "polyline") {
			var vector_points = [];

			var points = line.getAttributeNS(null, "points").split(" ")
			for (var j = 0; j < points.length - 1; j++) {
				var pxy = points[j].split(",");
				var pxy2 = points[j + 1].split(",")
				var px = parseInt(pxy[0]);
				var px2 = parseInt(pxy2[0]);
				var py = parseInt(pxy[1]);
				var py2 = parseInt(pxy2[1]);

				var TMat = line.getCTM()//.inverse();
			
				var x1 = (px) * TMat.a + (py) * TMat.c + TMat.e - Panel.x;
				var y1 = (px) * TMat.b + (py) * TMat.d + TMat.f - Panel.y;			
				var x2 = (px2) * TMat.a + (py2) * TMat.c + TMat.e - Panel.x;
				var y2 = (px2) * TMat.b + (py2) * TMat.d + TMat.f - Panel.y;				
				
				var P1 = new Point2D(x1, y1);
				var P2 = new Point2D(x2, y2);	

				//var P1 = new Point2D(px, py)
				//var P2 = new Point2D(px2, py2)
				for (var j = 0; j < this.points.length - 1; j++) {
					var p1 = new Point2D(this.points[j][0], this.points[j][1])
					var p2 = new Point2D(this.points[j+1][0], this.points[j+1][1])

					var result = Intersection.intersectLineLine(p1, p2, P1, P2);
					//alert(result.status)
					if (result.status == "Intersection") {
						hits.push(line)
						//return 1;
					}
				}
			}
		} else if (line.tagName == "line") {
			//var pxy = points[0].split(",");
			//var pxy2 = points[1].split(",")
			var px = parseFloat(line.getAttributeNS(null, "x1"))//(pxy[0]);
			var px2 = parseFloat(line.getAttributeNS(null, "x2"))//(pxy2[0]);
			var py = parseFloat(line.getAttributeNS(null, "y1"))//(pxy[1]);
			var py2 = parseFloat(line.getAttributeNS(null, "y2"))//(pxy2[1]);

			var TMat = line.getCTM()//.inverse();

			var x1 = (px) * TMat.a + (py) * TMat.c + TMat.e - Panel.x;
			var y1 = (px) * TMat.b + (py) * TMat.d + TMat.f - Panel.y;			
			var x2 = (px2) * TMat.a + (py2) * TMat.c + TMat.e - Panel.x;
			var y2 = (px2) * TMat.b + (py2) * TMat.d + TMat.f - Panel.y;
				
			var P1 = new Point2D(x1, y1);
			var P2 = new Point2D(x2, y2);

			//var P1 = new Point2D(px, py)
			//var P2 = new Point2D(px2, py2)
			for (var j = 0; j < this.points.length - 1; j++) {
				p1 = new Point2D(this.points[j][0], this.points[j][1])
				p2 = new Point2D(this.points[j+1][0], this.points[j+1][1])

				var result = Intersection.intersectLineLine(p1, p2, P1, P2);
				//alert(result.status)
				if (result.status == "Intersection") {
					hits.push(line)
					//return 1;
				}
			}
		}
	}
	return hits;
};
/*
 VisDock.utils.addPolygonLayer = function(polygon){
 if (QueryManager.layers[num-1] == undefined){
 QueryManager.layers[num-1] = [];
 QueryManager.colors[num-1] = [];
 QueryManager.visibility[num-1] = [];
 }

 var points = polygon.getAttributeNS(null,"polygon");

 var C = viewport.append("polygon")
 .attr("points", points)
 .attr("style", "opacity:" + VisDock.opacity + "; fill:" + VisDock.color[num-1]);

 QueryManager.layers[num-1].push(C);
 if (QueryManager.colors[num-1].length == 0){
 QueryManager.colors[num-1] = VisDock.color[num-1];
 QueryManager.visibility[num-1] = VisDock.opacity;
 }
 }

 VisDock.utils.addEllipseLayer = function(ellipse){
 if (QueryManager.layers[num-1] == undefined){
 QueryManager.layers[num-1] = [];
 QueryManager.colors[num-1] = [];
 QueryManager.visibility[num-1] = [];
 }

 var cx = parseFloat(ellipse.getAttributeNS(null,"cx"));
 var cy = parseFloat(ellipse.getAttributeNS(null,"cy"));
 if (ellipse.tagName == "ellipse"){
 var rx = parseFloat(ellipse.getAttributeNS(null,"rx"));
 var ry = parseFloat(ellipse.getAttributeNS(null,"ry"));
 } else {
 var rx = parseFloat(ellipse.getAttributeNS(null,"r"));
 var ry = ry;
 }

 var C = viewport.append("circle")
 .attr("cx", cx)
 .attr("cy", cy)
 .attr("rx", rx)
 .attr("ry", ry)
 .attr("style", "opacity:" + VisDock.opacity + "; fill:" + VisDock.color[num-1]);

 QueryManager.layers[num-1].push(C);
 if (QueryManager.colors[num-1].length == 0){
 QueryManager.colors[num-1] = VisDock.color[num-1];
 QueryManager.visibility[num-1] = VisDock.opacity;
 }
 }

 VisDock.utils.addPathLayer = function(path){
 if (QueryManager.layers[num-1] == undefined){
 QueryManager.layers[num-1] = [];
 QueryManager.colors[num-1] = [];
 QueryManager.visibility[num-1] = [];
 }
 var d = path.getAttributeNS(null,"d");
 var P = viewport.append("path")
 .attr("d",d)
 .attr("fill", VisDock.color[num-1])
 .attr("opacity", VisDock.opacity)
 .attr("stroke-width",1)
 //.attr("transform","translate("+t[0]+","+t[1]+")")

 QueryManager.layers[num-1].push(P);
 if (QueryManager.colors[num-1].length == 0){
 QueryManager.colors[num-1] = VisDock.color[num-1];
 QueryManager.visibility[num-1] = VisDock.opacity;
 }
 }

 VisDock.utils.getQueryVisibility = function(index){
 return QueryManager.visibility[index];
 }

 VisDock.utils.getQueryColor = function(index){
 return QueryManager.colors[index];
 }
 */

