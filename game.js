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

function makeListEqual(list, count) {
  while (count > list.querySelectorAll('li').length) {
    list.appendChild(document.createElement('li'));
  }
  while (count > list.querySelectorAll('li').length) {
    list.removeChild(querySelectorAll('li')[0]);
  }
}

function Game() {
  var self = this;
  self.currentBottleMl = 0;
  self.bottleCount = 0;
  self.actuatorDelay = 1000;
  self.actuators = [];

  self.handleClick = function() {
    new Actuator();
    self.currentBottleMl += 1;
    self.step();
  };

  self.handleActuator = function() {
    self.currentBottleMl += 1;
    self.step();
  };

  self.step = function() {
    if (self.currentBottleMl >= 30) {
      self.bottleCount += 1;
      self.currentBottleMl -= 30;
    }
    self.update();
  };

  self.update = function() {
    liquidElement.style.height = ((self.currentBottleMl / 30) * 100).toString(10) + '%';
    makeListEqual(bottleList, self.bottleCount);
  };
}

function Actuator() {
  var self = this;
  self.element = document.createElement('li');
  document.getElementById('actuators-' + (game.actuators.length % 2).toString(10)).appendChild(self.element);

  self.engage = function() {
    self.element.classList.add('engaged');
    game.handleActuator();
    setTimeout(self.disengage, 100);
  };

  self.disengage = function() {
    self.element.classList.remove('engaged');
    setTimeout(self.engage, game.actuatorDelay + Math.random() * (game.actuatorDelay/2));
  };

  game.actuators.push(self);
  self.engage();
}

game = new Game();
game.step();

document.addEventListener('click', function(e) {
  e.preventDefault();
  e.stopPropagation();
  game.handleClick();
});

console.log(game);
