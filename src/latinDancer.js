var LatinDancer = function(top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps);
  this.steps = ['F', 'B', 'R', 'F', 'B', 'L'];
  this.currentStep = 0;
  this.stepSize = 20;
};
LatinDancer.prototype = Object.create(Dancer.prototype);
LatinDancer.prototype.oldStep = Dancer.prototype.step;
LatinDancer.prototype.step = function() {
  this.currentStep = (this.currentStep + 1) % this.steps.length;
  if(this.steps[this.currentStep] === 'F') {
    this.setPosition(this.top + this.stepSize, this.left);
  } else if(this.steps[this.currentStep] === 'B') {
    this.setPosition(this.top - this.stepSize, this.left);
  } else if(this.steps[this.currentStep] === 'R') {
    this.setPosition(this.top, this.left + this.stepSize);
  } else {
    this.setPosition(this.top, this.left - this.stepSize);
  }
  this.oldStep();
};
