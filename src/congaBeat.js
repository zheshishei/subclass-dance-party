var CongaBeat = function(timeBetweenSteps) {
  this.timeBetweenSteps = timeBetweenSteps;
  this.beatCount = 0;
  this.emitBeat();
};

CongaBeat.prototype.emitBeat = function() {
  this.beatCount = (this.beatCount + 1) % 4;
  if (this.beatCount !== 3) {
    $('.conga-dancer').trigger('beat');
  } else {
    $('.conga-dancer').trigger('beat4');
  }

  setTimeout(this.emitBeat.bind(this), this.timeBetweenSteps);
};
