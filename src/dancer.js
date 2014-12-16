// Creates and returns a new dancer object that can step
var Dancer = function(top, left, timeBetweenSteps){
  this.$node = $('<span class="dancer"></span>');
  this.top = top;
  this.left = left;
  this.timeBetweenSteps = timeBetweenSteps;
  Dancer.prototype.step.call(this);
  Dancer.prototype.setPosition.call(this, top, left);
};

Dancer.prototype.step = function(){
  // the basic dancer doesn't do anything interesting at all on each step,
  // it just schedules the next step
  setTimeout(Dancer.prototype.step.bind(this), this.timeBetweenSteps);
};
//dancer.step();

Dancer.prototype.setPosition = function(top, left){
  // Use css top and left properties to position our <span> tag
  // where it belongs on the page. See http://api.jquery.com/css/
  //
  this.top = top;
  this.left = left;

  var styleSettings = {
    top: this.top,
    left: this.left
  };
  this.$node.css(styleSettings);
};

// now that we have defined the dancer object, we can start setting up important parts of it by calling the methods we wrote
// this one sets the position to some random default point within the body
//dancer.setPosition(top, left);
