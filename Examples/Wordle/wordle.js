
/*
*********************************************************************************
Created and Edited by Waqas Javed 01/25/2012
********************************************************************************
Small portion of the following code is taken from the Google Visualization API.
http://visapi-gadgets.googlecode.com/svn/trunk/wordcloud/doc.html
http://visapi-gadgets.googlecode.com/svn/trunk/wordcloud/wc.js
*********************************************************************************
*/

Wordle =  function(container){//alert("JFSDLJFDK")
	this.canvas = container;
	
//	****** Initialization *************************	
	this.vis_name = 2; 
	this.title = "Tag Cloud";
	this.vis = this.canvas.set(); // set for visualization
	this.tagCloud = this.canvas.set();
	this.boxes = this.canvas.set();
	this.wire = new Array();
	this.colors = ["blue", "green", "cyan", "brown", "yellow", "red", "black"];
};

Wordle.prototype.MIN_UNIT_SIZE = 25;
Wordle.prototype.MAX_UNIT_SIZE = 70;
Wordle.prototype.RANGE_UNIT_SIZE = Wordle.prototype.MAX_UNIT_SIZE - Wordle.prototype.MIN_UNIT_SIZE;

Wordle.prototype.visualize = function(visual, x, y, width, height){
	this.visual = visual;
	this.x = x; this.y = y;
	this.width = width;
	this.height = height;

	this.vis_rect = this.canvas.rect(this.x, this.y, width, height).attr({"fill": "white", "fill-opacity":0, "stroke":"black"});
	this.vis.push(this.vis_rect);
//	this.vis.push(this.tagCloud);
	
	// Add listeners
	this.addListeners(this, this.canvas, this.vis);
	this.vis.toFront();
};

Wordle.prototype.addListeners = function (visual, canvas, node){
//	var highlight;
	node.drag(function(dx, dy, x, y, event){ // move function
		this.highlight.attr({"width":(dx)*canvas.viewScale, "height":(dy)*canvas.viewScale});
		if (visual.wire.length != 0)
			visual.highlightSelectData(this.highlight);
        event.stop();
	}, function(x, y){ // drag start function
		var point = canvas.plate.viewToLocal(x,y);
		this.highlight = canvas.rect(point[0], point[1],0.0001,0.0001).attr({"fill":"white", "fill-opacity":0.2}).toFront();
		this.highlight.attr({"stroke": "red", "stroke-dasharray":"-"});
	}, function(){ // drag end function
		if (visual.wire.length!=0){
			visual.selectData(this.highlight);
			visual.tagCloud.attr({"fill": "green"});
		}
		this.highlight.remove();
	}
	);	
	
//	node.mouseover(function(){
////		make this visual active
////		if (glow == null){
////			glow = node.glow();
//			canvas.plate.updateActiveVisual(visual, true);
////		}
//	});
//	node.mouseout(function(event){
////		make this visual inactive
////		glow.remove();
////		glow = null;
//		canvas.plate.updateActiveVisual(visual, false);
//	});
};

//************************* Data Selection Code **************************

// Not completed yet!!! 
// Problem is whether to decide frequency and word as input
// OR paragraph text as input

Wordle.prototype.highlightSelectData = function(rect){
	// Local Method
	var bounds = rect.getBBox();
	for (var j=0; j<this.tagCloud.length; j++){
		var point = this.tagCloud[j].getBBox();
		if (point.x>=bounds.x && point.x+point.width<=bounds.x+bounds.width && point.y>=bounds.y && point.y+point.height<=bounds.y+bounds.height){
			this.tagCloud[j].attr({"fill":"blue"});
		}
		else
			this.tagCloud[j].attr({"fill":"green"});
	}
};

Wordle.prototype.selectData = function(rect){
	// o/p = [label1, data1, index2, data2, ...]
	var bounds = rect.getBBox();
	var selectData = new Array();
	var subdata1 = new Array(); var subdata2 = new Array();
	var temp1 = new Array(); var index1 = new Array();
	var temp2 = new Array(); var index2 = new Array();
	
	for (var j=0; j<this.tagCloud.length; j++){
		var point = this.tagCloud[j].getBBox();
		if (point.x>=bounds.x && point.x+point.width<=bounds.x+bounds.width && point.y>=bounds.y && point.y+point.height<=bounds.y+bounds.height){
			temp1[temp1.length] = this.wire[0].data[1][j]; index1[index1.length] = this.wire[0].data[0][j];
			temp2[temp2.length] = this.wire[1].data[1][j]; index2[index2.length] = this.wire[1].data[0][j];
		}
	}
	subdata1 = [index1, temp1];
	subdata2 = [index2, temp2];
	selectData = [this.wire[0].label, subdata1, this.wire[1].label, subdata2];
	
	if (temp1.length>0)
		this.visual.addOutputAnchor(selectData);
};

Wordle.prototype.highlightData = function(ishighlight, data){
	if (!ishighlight){
		this.tagCloud.attr({"fill":"green"});
//		this.highlight.remove();
		return;
	}
	
	var text = data[1][1];
	
//	TODO: Fix highlighting selection
	
//	this.vis_rect.attr({"stroke":"yellow"});
	for (var j=0; j<this.tagCloud.length; j++){
		for (var i=0; i<text.length; i++){			
			if (text[i] == this.tagCloud[j].text){
				this.tagCloud[j].attr({"fill":"blue"});
				break;
			}
		}
	}
};

//************************* Wire Snapping Code **************************

Wordle.prototype.addIt = function (wire){
	if (this.wire.length < 2){
		this.wire[this.wire.length] = wire;
		this.addData();
		return true;
	}
	return false;
};

Wordle.prototype.addData = function (){	
	if (this.wire.length < 2)
		return;
	// Add code here
	this.visualization(this.wire[0].data[1], this.wire[1].data[1]);
	this.vis.push(this.tagCloud);
};

Wordle.prototype.update = function(){
	if (this.wire.length > 1){
		this.tagCloud.remove();
		this.tagCloud = this.canvas.set();
//		this.boxes.remove();
//		this.boxes = this.canvas.set();
		this.addData();
		return true;
	}
	return false;
};

Wordle.prototype.removeData = function (wire){
	if (this.wire.length > 1){
		this.tagCloud.remove();
		this.tagCloud = this.canvas.set();
//		this.boxes.remove();
//		this.boxes = this.canvas.set();		
	}
	var index = Xplate.findArrayIndex(this.wire, wire, 0);
	this.wire.splice(index, 1);
//	this.wire = new Array();
	this.addData();
};

//******************* Wordle Visualization ****************************************

Wordle.prototype.visualization = function (x, y, width, height, wordList, frequency){
	var paper = this.canvas;//alert(paper)
	//var paper_w = this.width, paper_h = this.height;
	var paper_w = width, paper_h = height;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.cx = this.x+this.width/2;//paper_w/2;
	this.cy = this.y+this.height/2;//paper_h/2;
	//alert(this.width + " " + this.height)
	 // Compute frequency range
	  var minFreq = 999999;
	  var maxFreq = 0;
	
	  for (var k=0; k<frequency.length; k++){
		  minFreq = Math.min(minFreq, frequency[k]);
		    maxFreq = Math.max(maxFreq, frequency[k]);
	  }
	  
	  var range = maxFreq - minFreq;
	  range = Math.max(range, 1);
	  //alert("paper_x = "+paper_w + " paper_h = " + paper_h)
	  var availableBoxes = [];
	  var boundingBox = new BoundingBox(this.x, this.y, paper_w, paper_h, this.cx, this.cy);	
	  var padding = 0;
	var highlightColor = "#D1FFF0";
	 
	for (var ii = 0; ii < wordList.length; ii++) {
	    var word1 = wordList[ii];
	    var text = word1;
	    var freq = frequency[ii];
	    if (text && freq){
	    }
	    else{
	    	this.vis_rect.attr({"stroke":"red"});
	    }
	    var size = this.MIN_UNIT_SIZE + Math.round((freq - minFreq) / range * this.RANGE_UNIT_SIZE);
	    var opacity = 0.5 + ((freq - minFreq) / range * 0.8);
		var text1 = paper.text(0,0,text).attr({"text-anchor":'start',"fill":"green","font-size":size,"font":paper.getFont("Museo"), "fill-opacity":opacity,"title":"frequency of occurrence: "+freq+"\nclick to search the word"});
		//alert(text1.attr("text-anchor"))
		this.tagCloud.push(text1);
		this.addWordListeners(text1, text, opacity);
	    var w = text1.getBBox().width + padding;
	    var h = text1.getBBox().height + padding;
	  
	    if (ii == 0){
//		    	text1.attr({"x":paper_w/2,"y":this.cy/2});
	    	text1.attr({"x":this.cx-(w/2),"y":this.cy-(h/2)});
	    	// Add new boxes to the list
	//    	this.editBoxList(availableBoxes, text1, boundingBox);
	    	this.updateBoxList(availableBoxes, text1, boundingBox);
	    	// Sort the available boxes according to their distances from the center point
	    	availableBoxes.sort(function(a, b){
	    		var aDist = a.closestPoint;
	    		var bDist = b.closestPoint;
	    		if (aDist[2] == bDist[2]){
	    			return 0;
	    		}
	    		return aDist[2] < bDist[2] ? -1 : 1;
	    	});
//			paper.rect(text1.getBBox().x, text1.getBBox().y, text1.getBBox().width, text1.getBBox().height, 5).attr({"fill":highlightColor, "stroke":null}).toBack();
	    } 
	    else{   
	    	var j=0;
	    	for (j=0; j<availableBoxes.length; j++){
	    		if (w<=availableBoxes[j].width && h<=availableBoxes[j].height){
	    			break;
	    		}
	    	}	    	
	    	if (j != availableBoxes.length){
	    		boundingBox = availableBoxes[j];
	    		var posx = this.findOptimalPosition(this.cx, boundingBox.x, boundingBox.x+boundingBox.width, w);
	    		var posy = this.findOptimalPosition(this.cy, boundingBox.y, boundingBox.y+boundingBox.height, h);
	//    		if (posy < this.cy){
	    			posy = posy+size/2;
	//    		}
			posx = posx + (padding/2);
			posy = posy + (padding/2);
//alert("x = " + (posx-w/2) + " y = " + (posy-h/2))
	    		text1.attr({"x":posx-(w/2),"y":posy-(h/2)});
			//alert(text1.attr("x") + " " + (posx-w/2))
	    		// remove the used box
	    		availableBoxes.splice(j, 1);
	    		// Add new boxes to the list
	//	    	this.editBoxList(availableBoxes, text1, boundingBox);
			//alert(" x = " + availableBoxes[ii].width + " y = " + availableBoxes[ii].height)
	    		this.updateBoxList(availableBoxes, text1, boundingBox);
		    	// Sort the available boxes according to their distances from the center point
		    	availableBoxes.sort(function(a, b){
		    		var aDist = a.closestPoint;
		    		var bDist = b.closestPoint;
	//	    		var aDist = a.getClosestPoint(200, 200);
	//	    		var bDist = b.getClosestPoint(200, 200);
	
		    		if (aDist[2] == bDist[2]){
		    			return 0;
		    		}
		    		return aDist[2] < bDist[2] ? -1 : 1;
		    	});
//			    	paper.rect(text1.getBBox().x, text1.getBBox().y, text1.getBBox().width, text1.getBBox().height, 5).attr({"fill":highlightColor, "stroke":null}).toBack();
		    	
	    	}
	    	else{
	    		text1.remove();
	    	}

//alert("avail = " + boundingBox.x)
	    }
	  }
	  //for (var k=0; k< availableBoxes.length; k++){
//alert(words[k])
		  //var rect = paper.rect(availableBoxes[k].x,availableBoxes[k].y,availableBoxes[k].width,availableBoxes[k].height).attr({"fill":"#F0FFFF"});
		  //this.boxes.push(rect);
		  //rect.toBack();
	  //}
};

Wordle.prototype.addWordListeners = function (word, text, opacity){
	word.mouseover(function(evt){
		word.attr({"fill":"red","fill-opacity":1});
		document.body.style.cursor='pointer';
	}).mouseout(function(evt){
		word.attr({"fill":"green","fill-opacity":opacity});
		document.body.style.cursor='default';
	});
	word.node.onclick = function () {
	   word.attr("fill", "blue");
	   window.open("http://www.google.com/search?as_q="+text);
	};
};

Wordle.prototype.findOptimalPosition = function (center, min, max, size) {
	var pos;
	if (center < min) { 
		pos = min + (size / 2.0);
	}
	else if (center > max) { 
		pos = max - (size / 2.0);
	}
	else {
		pos = center;
		if (pos + (size / 2.0) > max) {
			pos = max - (size / 2.0);
		}
		else if (pos - (size / 2.0) < min) {
			pos = min + (size / 2.0);	    			
		}
	}
	return pos;
};

Wordle.prototype.updateBoxList = function (list, newText, currBounds){

	var textBox = newText.getBBox();
	var leftDiff = textBox.x - currBounds.x; 
	var rightDiff = currBounds.x+currBounds.width - (textBox.x+textBox.width); 
	var upDiff = textBox.y - currBounds.y; 
	var downDiff = currBounds.y+currBounds.height - (textBox.y+textBox.height); 
	
	var nwHorz = leftDiff < upDiff; 
	var neHorz = rightDiff < upDiff; 
	var swHorz = leftDiff < downDiff; 
	var seHorz = rightDiff < downDiff; 
	
	// Left box
	if (leftDiff > 0) {
		var newHeight = textBox.height + (nwHorz ? 0 : upDiff) + (swHorz ? 0 : downDiff);  
    	boundingBox = new BoundingBox(currBounds.x, currBounds.y + (nwHorz ? upDiff : 0), leftDiff, newHeight, this.cx, this.cy);
		list.push(boundingBox);
	}
	
	// Right box
	if (rightDiff > 0) { 
		var newHeight1 = textBox.height + (neHorz ? 0 : upDiff) + (seHorz ? 0 : downDiff);  
		boundingBox = new BoundingBox(textBox.x+textBox.width, currBounds.y + (neHorz ? upDiff : 0), rightDiff, newHeight1, this.cx, this.cy);
		list.push(boundingBox);
	}

	// Up box
	if (upDiff > 0) { 
		var newWidth = textBox.width + (nwHorz ? leftDiff : 0) + (neHorz ? rightDiff : 0);  
    	boundingBox = new BoundingBox(textBox.x - (nwHorz ? leftDiff : 0), currBounds.y, newWidth, upDiff, this.cx, this.cy);
		list.push(boundingBox);
	}

	// Down box
	if (downDiff > 0) { 
		var newWidth1 = textBox.width + (swHorz ? leftDiff : 0) + (seHorz ? rightDiff : 0);  
    	boundingBox = new BoundingBox(textBox.x - (swHorz ? leftDiff : 0), textBox.y+textBox.height, newWidth1, downDiff, this.cx, this.cy);
		list.push(boundingBox);
	}
};

BoundingBox = function (x, y, width, height, px, py){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.cx = x+(width/2);
	this.cy = y+(height/2);
	this.closestPoint = this.getClosestPoint(px, py);
};

BoundingBox.prototype.getClosestPoint = function (px, py){
	
//	var length = Math.sqrt((this.x-px)*(this.x-px) + (this.y-py)*(this.y-py));
	var length = 99999;
	var closestPoint = [this.x, this.y, length];
	var p = [];
	var min;
	
	// Check all four sides of the Bounding Box.
	
	p = this.getPointToLineSegmentClosestPoint(this.x, this.y, this.x+this.width, this.y, px, py);
	min = Math.sqrt(((px-p[0])*(px-p[0])) + ((py-p[1])*(py-p[1])));
	if (length > min){
		length = min;
		closestPoint = [p[0], p[1], length];
	}
	
	p = this.getPointToLineSegmentClosestPoint(this.x, this.y, this.x, this.y+this.height, px, py);
	min = Math.sqrt(((px-p[0])*(px-p[0])) + ((py-p[1])*(py-p[1])));
	if (length > min){
		length = min;
		closestPoint = [p[0], p[1], length];
	}
	
	p = this.getPointToLineSegmentClosestPoint(this.x, this.y+this.height, this.x+this.width, this.y+this.height, px, py);
	min = Math.sqrt(((px-p[0])*(px-p[0])) + ((py-p[1])*(py-p[1])));
	if (length > min){
		length = min;
		closestPoint = [p[0], p[1], length];
	}
	
	p = this.getPointToLineSegmentClosestPoint(this.x+this.width, this.y, this.x+this.width, this.y+this.height, px, py);
	min = Math.sqrt(((px-p[0])*(px-p[0])) + ((py-p[1])*(py-p[1])));
	if (length > min){
		length = min;
		closestPoint = [p[0], p[1], length];
	}
	
	return closestPoint;
};

BoundingBox.prototype.getPointToLineSegmentClosestPoint = function (ax, ay, bx, by, px, py){
//	  vector from a to b
	  var abx = bx-ax;
	  var aby = by-ay; 
	
//	  squared distance from a to b
	  var ab_square = (abx*abx) + (aby*aby);
	  
	  if(ab_square == 0){
//	    a and b are the same point
	    return [ax,ay];
	  }
	  else {
//	    vector from A to p
	    var apx = px-ax;
	    var apy = py-ay;
	    var t = ((apx*abx) + (apy*aby)) / (ab_square);
	    
	    if (t < 0.0){
//	      Before a on the line, just return a
	      return [ax,ay];
	    }
	    else if (t > 1.0){
//	      After b on the line, just return b
	      return [bx,by];
	    }
	    else {
//	      projection lines in between a and b on the line
	      return [(ax+(t*abx)), (ay+(t*aby))];
	    }
	  
	  }
};
