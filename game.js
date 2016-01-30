var game;
var liquidElement = document.getElementById('liquid');
var bottleList = document.getElementById('bottles');

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
  self.bottleCount = 0;

  self.handleClick = function() {
    self.currentBottleMl += 1;
    self.step();
  };

  self.step = function() {
    if (self.currentBottleMl >= 30) {
      self.bottleCount += 1;
      self.currentBottleMl = 0;
    }
    self.update();
  };

  self.update = function() {
    liquidElement.style.height = ((self.currentBottleMl / 30) * 100).toString(10) + '%';

    while (self.bottleCount > bottleList.querySelectorAll('li').length) {
      bottleList.appendChild(document.createElement('li'));
    }
    while (self.bottleCount > bottleList.querySelectorAll('li').length) {
      bottleList.removeChild(querySelectorAll('li')[0]);
    }
  };
}

game = new Game();
game.step();

document.addEventListener('click', function(e) {
  e.preventDefault();
  e.stopPropagation();
  game.handleClick();
});

console.log(game);
