var SpinnyDancer = function (top, left, timeBetweenSteps) {
  Dancer.call(this, top + 81, left + 50, timeBetweenSteps);
  this.$node.html('<img class="spinny-dancer" src="images/alien.png"></img>');
  this.$node.addClass('spinny-dancer');
  this.$node.css({'border' :'none', 'transition' : 'all ' + timeBetweenSteps/1000 + 's linear'});
  this.degrees = 0;
  this.spinDirection = 1;
};

SpinnyDancer.prototype = Object.create(Dancer.prototype);
SpinnyDancer.prototype.constructor = SpinnyDancer;
SpinnyDancer.prototype.planStep = Dancer.prototype.step;

SpinnyDancer.prototype.step = function() {
  this.degrees = (this.degrees + 60 * this.spinDirection);
  this.$node.css({
    'transform' : 'rotate('+ this.degrees +'deg)'
  });
  this.planStep();
};

SpinnyDancer.prototype.lineUp = function() {
  this.spinDirection *= -1;
};
