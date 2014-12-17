var CongaDancer = function(top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps);
  this.direction = Math.round(Math.random() * 360);
  this.stepSize = 60;
  this.following = undefined;
  this.followedBy = undefined;
  this.sideStep = 1;
  this.$node.addClass('conga-dancer');
  var img = Math.round(Math.random() * 4);
  img = img === 0 ? 'congaS1.gif' : img === 1 ? 'congaS2.gif' : img === 2 ? 'congaS3.gif' : 'congaS4.gif';
  this.$node.html('<img src="images/' + img + '" loop=infinite>');
  this.$node.css({'border' : 'none'});
  this.$node.on('beat', this.step.bind(this));
  this.$node.on('beat4', this.step4.bind(this));
  this.$node.off('implode');
  this.$node.off('explode');
};

CongaDancer.prototype = Object.create(Dancer.prototype);
CongaDancer.prototype.constructor = CongaDancer;
CongaDancer.prototype.planStep = Dancer.prototype.step;
CongaDancer.prototype.step = function (newTop, newLeft, newDirection, sideStep) {
  this.$node.css({'transition' : 'all ' +
                                 congaBeatEmitter.timeBetweenSteps / 2 + 'ms ' +
                                 'linear'
  });

  var topDirection, leftDirection;
  var oldTop = this.top, oldLeft = this.left, oldDir = this.direction;

  if (!this.following) {
    if (this.top < 60 || this.top > window.innerHeight - 60) {
      this.direction *= -1;
    }
    if (this.left < 60 || this.left > window.innerWidth - 60) {
      this.direction = 180 - this.direction;
    }
    this.direction += Math.round(Math.random() * 40 - 20);
    topDirection = this.stepSize * Math.sin(this.direction / 180 * Math.PI) + this.top;
    leftDirection = this.stepSize * Math.cos(this.direction / 180 * Math.PI) + this.left;
    this.lookup();
    this.setPosition(topDirection, leftDirection);
  } else {
    this.direction = newDirection;
    this.sideStep = sideStep;
    this.setPosition(newTop, newLeft);
  }
  if(typeof this.followedBy !== 'undefined') {
    this.followedBy.step(oldTop, oldLeft, oldDir, this.sideStep * -1);
  }
};

CongaDancer.prototype.step4 = function() {

  var rgb = 'rgb(' + Math.round(Math.random() * 255) +
            ',' + Math.round(Math.random() * 255) +
            ',' + Math.round(Math.random() * 255) + ')';

  this.$node.css({'border-color' : rgb});

  var previousTop = this.top;
  var previousLeft = this.left;

  if(this.sideStep < 0) {
    this.direction += 90;
  } else {
    this.direction -= 90;
  }

  var topDirection = this.stepSize * Math.sin(this.direction / 180 * Math.PI);
  var leftDirection = this.stepSize * Math.cos(this.direction / 180 * Math.PI);

  this.$node.css({'transition' : 'all ' +
                                 congaBeatEmitter.timeBetweenSteps / 4 + 'ms ' +
                                 'linear'
  });

  this.setPosition(topDirection + this.top, leftDirection + this.left);
  window.setTimeout(function() {
    this.setPosition(previousTop, previousLeft);
    if(this.sideStep < 0) {
      this.direction -= 90;
    } else {
      this.direction += 90;
    }
  }.bind(this), congaBeatEmitter.timeBetweenSteps / 4);
  this.sideStep *= -1;
};

CongaDancer.prototype.lookup = function() {
  if (!this.following) {
    var lookupDistance = 70;
    var congaDancers = window.dancers.filter(function (dancer){
      if(typeof dancer.followedBy === 'undefined') {
        return dancer instanceof CongaDancer;
      }
      return false;
    });

    for (var i = 0; i < congaDancers.length; i++) {
      var dancer = congaDancers[i];
      if (dancer === this) {
        return;
      }
      var deltaTop  = Math.max(this.top, dancer.top) - Math.min(this.top, dancer.top);
      var deltaLeft = Math.max(this.left, dancer.left) - Math.min(this.left, dancer.left);
      var distance = Math.sqrt(Math.pow(deltaTop, 2) + Math.pow(deltaLeft, 2));

      if (distance < lookupDistance) {
        //if not being followed
        if (typeof dancer.followedBy === 'undefined') {
          //if not following
          if (typeof dancer.following === 'undefined') {
            //follow it
            this.following = dancer;
            dancer.followedBy = this;
            this.$node.off('beat');
            break;
          //else if head of conga line !== this
          } else {
            var currentDancer = dancer;
            while(typeof currentDancer.following !== 'undefined') {
              currentDancer = currentDancer.following;
            }
            if (currentDancer !== this) {
              this.following = dancer;
              dancer.followedBy = this;
              this.$node.off('beat');
              break;
            }
          }
        }
      }
    }
  }
};

























