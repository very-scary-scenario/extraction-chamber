var game;
var scoreElement = document.getElementById('score');

function extend(base, sub) {
  sub.prototype = Object.create(base.prototype);
  sub.prototype.constructor = sub;
  Object.defineProperty(sub.prototype, 'constructor', {
    enumerable: false,
    value: sub
  });
}

function Game() {
  var self = this;
  self.score = 0;

  self.getScoreDiff = function() {
    return 0;
  };

  self.step = function() {
    self.score += self.getScoreDiff();
    self.update();
  };

  self.update = function() {
    scoreElement.innerHTML = self.score.toPrecision(4);
  };
}

game = new Game();

window.requestFrame = (
  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback){
    window.setTimeout(callback, 1000 / 60);
  }
);

function animate() {
  requestFrame(animate);
  game.step();
}

document.addEventListener('click', function(e) {
  e.preventDefault();
  e.stopPropagation();
  game.score += 0.001;
});

animate();
console.log(game);
