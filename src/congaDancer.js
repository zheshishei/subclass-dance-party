var CongaDancer = function(top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps);
  this.direction = Math.round(Math.random() * 360);
  this.stepSize = 30;
  this.following = undefined;
  //this.followed = false;
  this.$node.addClass('conga-dancer');

  this.$node.on('beat', this.step.bind(this));
  this.$node.on('beat4', this.step4.bind(this));
  this.$node.off('implode');
  this.$node.off('explode');
};

CongaDancer.prototype = Object.create(Dancer.prototype);
CongaDancer.prototype.constructor = CongaDancer;
CongaDancer.prototype.planStep = Dancer.prototype.step;
CongaDancer.prototype.step = function() {
  this.$node.css({'transition' : 'all ' +
                                 congaBeatEmitter.timeBetweenSteps / 2 + 'ms ' +
                                 'linear'
  });

  if (this.top < 60 || this.top > window.innerHeight - 60) {
    this.direction *= -1;
  }
  if (this.left < 60 || this.left > window.innerWidth - 60) {
    this.direction = 180 - this.direction;
  }

  this.direction += Math.round(Math.random() * 90 - 45);
  var topDirection = this.stepSize * Math.sin(this.direction / 180 * Math.PI);
  var leftDirection = this.stepSize * Math.cos(this.direction / 180 * Math.PI);
  this.setPosition(topDirection + this.top, leftDirection + this.left);
};
CongaDancer.prototype.step4 = function() {
  var rgb = 'rgb(' + Math.round(Math.random() * 255) +
            ',' + Math.round(Math.random() * 255) +
            ',' + Math.round(Math.random() * 255) + ')';

  this.$node.css({'border-color' : rgb});

};
