var game;
var liquidElement = document.getElementById('liquid');

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
  self.currentBottleMl = 0;

  self.step = function() {
    self.update();
  };

  self.update = function() {
    liquidElement.style.height = ((self.currentBottleMl / 30) * 100).toString(10) + '%';
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
  game.currentBottleMl += 1;
});

animate();
console.log(game);
