// Creates and returns a new dancer object that can step
var Dancer = function(top, left, timeBetweenSteps){
  this.$node = $('<span class="dancer"></span>');
  this.top = top;
  this.left = left;
  this.timeBetweenSteps = timeBetweenSteps;
  this.canExplode = false;
  Dancer.prototype.step.call(this);
  Dancer.prototype.setPosition.call(this, top, left);
  this.$node.on('implode', this.implode.bind(this));
  this.$node.on('explode', this.explode.bind(this));
};

Dancer.prototype.step = function(){
  // the basic dancer doesn't do anything interesting at all on each step,
  // it just schedules the next step
  setTimeout(this.step.bind(this), this.timeBetweenSteps);
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

Dancer.prototype.implode = function() {
  this.setPosition(window.innerHeight / 2, window.innerWidth / 2);
  this.canExplode = true;
};

Dancer.prototype.explode = function() {
  console.log(this.canExplode);

  if (this.canExplode) {
    var left = Math.round(Math.random() * window.innerWidth / 2) - 100;
    var top = Math.round(Math.random() * window.innerHeight / 2) - 100;

    if (Math.round(Math.random())) {
      left *= -1;
    }
    if (Math.round(Math.random())) {
      top *= -1;
    }

    console.log('top:' + top + '|left:' + left );
    var trans = this.$node.css('transition');
    this.$node.css({'transition' : 'all .2s cubic-bezier(0.0, 0.0, 0.6, 1.0)'});
    this.setPosition(this.top + top, this.left + left);
    this.canExplode = false;
    setTimeout(function() {
      this.$node.css({'transition' : trans});
    }.bind(this), 500);
  }

};

// now that we have defined the dancer object, we can start setting up important parts of it by calling the methods we wrote
// this one sets the position to some random default point within the body
//dancer.setPosition(top, left);
