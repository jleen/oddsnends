function turtle() {
  this.rot = 0;
  this.scale = 0;
  this.home();
}

turtle.prototype.home = function() {
  this.x = windowWidth / 2;
  this.y = windowHeight / 2;
}

turtle.prototype.step = function() {
  this.x += this.scale * Math.cos(this.rot);
  this.y += this.scale * Math.sin(this.rot);
}

turtle.prototype.sideStep = function() {
  this.x += this.scale * Math.sin(this.rot);
  this.y -= this.scale * Math.cos(this.rot);
}

turtle.prototype.draw = function(movement) {
  var xOld = this.x; var yOld = this.y;
  movement();
  line(xOld, yOld, this.x, this.y);
}

turtle.prototype.drawStep = function() {
  this.draw(this.step);
}

turtle.prototype.sideStepDraw = function () {
  this.draw(this.sideStep);
}
