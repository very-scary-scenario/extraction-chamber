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

  self.step = function() {
    self.score += 1;
    self.update();
  };

  self.update = function() {
    scoreElement.innerHTML = self.score;
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

animate();
console.log(game);
