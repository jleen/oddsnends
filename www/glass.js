function Vertex(xx, yy) {
  this.x = xx;
  this.y = yy;
}

function convexCombination(u, v, d) {
  return new Vertex(u.x * d + v.x * (1-d),
                    u.y * d + v.y * (1-d));
} 

var panes = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  var initial = [];
  initial.push(new Vertex(0, 0));
  initial.push(new Vertex(windowWidth, 0));
  initial.push(new Vertex(windowWidth, windowHeight));
  initial.push(new Vertex(0, windowHeight));
  panes.push(initial);
}

function drawSegment(u, v) {
  line(u.x, u.y, v.x, v.y);
}

function draw() {
  if (panes.length > 1000) return;
  var whichPane = int(random(panes.length));
  var pane = panes[whichPane];
  var numVertices = pane.length;
  var whichVertex = int(random(numVertices));
  var whichSide = (whichVertex + int(numVertices / 2)
                      - (numVertices % 2 === 0 ? int(random(2)) : 0))
                    % numVertices;  
      
  var cut = convexCombination(pane[whichSide],
                              pane[(whichSide+1) % numVertices],
                              random(1));
  drawSegment(pane[whichVertex], cut);

  var pane1 = [ cut ];
  for (var i = whichVertex; i != (whichSide + 1) % numVertices; i = (i+1) % numVertices) {
    pane1.push(pane[i]);
  }

  var pane2 = [ cut ];
  for (var i = (whichSide + 1) % numVertices; i != (whichVertex + 1) % numVertices; i = (i+1) % numVertices) {
    pane2.push(pane[i]);
  }

  panes[whichPane] = pane1;
  panes.push(pane2);
}
