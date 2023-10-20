function turtle() {
  this.rot = 0;
  this.scale = 0;
  this.x = windowWidth / 2;
  this.y = windowHeight / 2;
}

turtle.prototype.home = function() {
  this.x = windowWidth / 2;
  this.y = windowHeight / 2;
}

turtle.prototype.goNorth = function() {
  this.x += this.scale * Math.cos(this.rot);
  this.y += this.scale * Math.sin(this.rot);
}

turtle.prototype.goEast = function() {
  this.x += this.scale * Math.sin(this.rot);
  this.y -= this.scale * Math.cos(this.rot);
}

turtle.prototype.goSouth = function() {
  this.x -= this.scale * Math.cos(this.rot);
  this.y -= this.scale * Math.sin(this.rot);
}

turtle.prototype.goWest = function() {
  this.x -= this.scale * Math.sin(this.rot);
  this.y += this.scale * Math.cos(this.rot);
}

turtle.prototype.draw = function(movement) {
  var xOld = this.x; var yOld = this.y;
  movement();
  line(xOld, yOld, this.x, this.y);
}

turtle.prototype.drawNorth = function() {
  this.draw(this.goNorth.bind(this));
}

turtle.prototype.drawEast = function () {
  this.draw(this.goEast.bind(this));
}

turtle.prototype.drawSouth = function () {
  this.draw(this.goSouth.bind(this));
}

turtle.prototype.drawWest = function () {
  this.draw(this.goWest.bind(this));
}

var t;

var step = 1;
var rotStep = Math.PI / 180;
var eraseMode = 0;

window.setup = function () {
  createCanvas(windowWidth, windowHeight);
  t = new turtle();
  t.scale = 0;
  t.home();
}

function shape() {
  t.home();
  t.goSouth();
  t.goSouth();
  t.drawWest();
  t.drawWest();
  t.goNorth();
  t.drawNorth();
  t.drawNorth();
  t.drawNorth();
  t.goEast();
  t.drawEast();
  t.drawEast();
  t.drawEast();
  t.goSouth();
  t.drawSouth();
  t.drawSouth();
  t.drawSouth();
  t.goWest();
  t.drawWest();
  t.goNorth();
}

window.draw = function () {
  if (t.scale > Math.max(windowWidth, windowHeight) / 4) {
    t.scale = 0;
    t.rot = 0;
    t.home();
    eraseMode = !eraseMode;
    
    if (eraseMode) {
      stroke(255);
      strokeWeight(3);
    } else {
      stroke(0);
      strokeWeight(1);
    }
  }
    
  t.scale += step;
  t.rot += rotStep;
  shape();
}