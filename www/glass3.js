function Vertex(xx, yy) {
  this.x = xx;
  this.y = yy;
}

function Pane(weight, vertices) {
  this.weight = weight;
  this.vertices = vertices;
}

function convexCombination(u, v, d) {
  return new Vertex(u.x * d + v.x * (1-d),
                    u.y * d + v.y * (1-d));
} 

var panes = [];


window.setup = function () {
  createCanvas(windowWidth, windowHeight);
  var initial = [];
  initial.push(new Vertex(0, 0));
  initial.push(new Vertex(windowWidth, 0));
  initial.push(new Vertex(windowWidth, windowHeight));
  initial.push(new Vertex(0, windowHeight));
  panes.push(new Pane(1.0, initial));
}

function drawSegment(u, v) {
  line(u.x, u.y, v.x, v.y);
}

function uniformlyRandomPane(p) {
  var targetWeight = random(1);
  var accumulatedWeight = 0;
  var paneIndex = 0;
  do {
    accumulatedWeight += panes[paneIndex++].weight;
  } while (accumulatedWeight < targetWeight);
  return paneIndex - 1;
}

//function dist(u, v) {
//  var dx = u.x - v.x;
//  var dy = u.y - v.y;
//  return Math.sqrt(dx * dx + dy * dy);
//}

function computePaneWeight(vertices, whichSide, edgeWeight) {
  var perimeter = 0;
  var cutPerimeter = 0;

  for (var i = 0; i < vertices.length; ++i) {
    var u = vertices[i];
    var v = vertices[(i+1) % vertices.length];
    var len = dist(u.x, u.y, v.x, v.y);
    perimeter += len;

    if (i < whichSide) {
      cutPerimeter += len;
    } else if (i === whichSide) {
      cutPerimeter += len * edgeWeight;
    }
  }

  //console.log(cutPerimeter + "/" + perimeter);
  return cutPerimeter / perimeter;
}

window.draw = function () {
  if (panes.length > 1000)
    return;

  for (var iterations = 0; iterations < 3; ++iterations) {
    var whichPane = uniformlyRandomPane(panes);
    var pane = panes[whichPane];
    var numVertices = pane.vertices.length;
    var whichVertex = int(random(numVertices));
    var whichSide = (whichVertex + int(numVertices / 2)
                        - (numVertices % 2 === 0 ? int(random(2)) : 0))
                      % numVertices;  
        
    var weight = 0.25 + random(0.5);
    var cut = convexCombination(pane.vertices[whichSide],
                                pane.vertices[(whichSide+1) % numVertices],
                                weight);
    drawSegment(pane.vertices[whichVertex], cut);

    var pane1 = [ cut ];
    for (var i = whichVertex; i != (whichSide + 1) % numVertices; i = (i+1) % numVertices) {
      pane1.push(pane.vertices[i]);
    }

    var pane2 = [ cut ];
    for (var i = (whichSide + 1) % numVertices; i != (whichVertex + 1) % numVertices; i = (i+1) % numVertices) {
      pane2.push(pane.vertices[i]);
    }

    var paneWeight = computePaneWeight(pane.vertices, whichSide, weight);
    panes[whichPane] = new Pane(pane.weight * (1 - paneWeight), pane1);
    panes.push(new Pane(pane.weight * paneWeight, pane2));
  }
}