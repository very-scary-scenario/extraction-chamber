var game;
var titleElement = document.getElementById('title');
var liquidElement = document.getElementById('liquid');
var bottleList = document.getElementById('bottles');
var shopList = document.getElementById('shop');
var shopElements = shopList.querySelectorAll('li');
var bottleCountElement = document.getElementById('bottle-count');

function extend(base, sub) {
  sub.prototype = Object.create(base.prototype);
  sub.prototype.constructor = sub;
  Object.defineProperty(sub.prototype, 'constructor', {
    enumerable: false,
    value: sub
  });
}

function makeListEqual(list, count) {
  var target;

  if (count >= 40) {
    target = 40 + count % 10;
  } else {
    target = count;
  }

  while (target > list.querySelectorAll('li').length) {
    list.appendChild(document.createElement('li'));
  }
  while (target < list.querySelectorAll('li').length) {
    list.removeChild(list.querySelectorAll('li')[0]);
  }
}

function Game() {
  var self = this;
  self.currentBottleMl = 0;
  self.bottleCount = 0;
  self.maxBottles = 16;
  self.baseClickValue = 30;
  self.clickMultiplier = 1;
  self.actuatorDelay = 1000;
  self.itemsOwned = {
    actuator: 0,
    battery: 0,
    tank: 0,
    doubler: 0,
    quonk: 0,
    wick: 0
  };

  self.itemConstructors = {
    actuator: Actuator,
    battery: Battery,
    tank: Tank,
    doubler: Doubler
  };

  self.purchase = function(itemName) {
    new self.itemConstructors[itemName]();
    self.itemsOwned[itemName] += 1;
  };

  self.purchaser = function(itemName) {
    return function(e) {
      e.preventDefault();
      e.stopPropagation();
      var shopElement = shopList.querySelector('[data-item="' + itemName + '"]');
      var value = parseInt(shopElement.getAttribute('data-value'), 10);
      if (self.bottleCount >= value) {
        self.purchase(itemName);
        self.bottleCount -= value;
        shopElement.setAttribute('data-value', (value * 2).toString(10));
      } else {
        alert('u hav no munny :<');
      }
      self.update();
    };
  };

  self.handleClick = function(e) {
    if (!titleElement.classList.contains('hidden')) {
      titleElement.classList.add('hidden');
    }
    self.currentBottleMl += self.baseClickValue * self.clickMultiplier;

    var batteryList = document.createElement('ul');
    batteryList.classList.add('battery-sparks');

    for (var i = 0; i < self.itemsOwned.battery; i++) {
      var batteryElement = document.createElement('li');
      batteryList.appendChild(batteryElement);
      for (var j = 2; j <= 7; j++) {
        if (Math.random() * j < 1) {
          batteryElement.classList.add('r' + j.toString(10));
        }
      }
    }

    document.body.appendChild(batteryList);
    batteryList.style.top = e.pageY.toString(10) + 'px';
    batteryList.style.left = e.pageX.toString(10) + 'px';

    setTimeout(function() {
      document.body.removeChild(batteryList);
    }, 5000);

    self.step();
  };

  self.handleActuator = function() {
    self.currentBottleMl += 1;
    self.step();
  };

  self.step = function() {
    while (self.currentBottleMl > 30) {
      if (self.bottleCount < self.maxBottles) {
        self.bottleCount += 1;
        self.currentBottleMl -= 30;
      } else {
        self.currentBottleMl = 30;
        // XXX you need more tank
      }
    }
    self.update();
  };

  self.updateShop = function() {
    for (var i = 0; i < shopElements.length; i++) {
      var shopElement = shopElements[i];
      var itemName = shopElement.getAttribute('data-item');
      var owned = self.itemsOwned[itemName];
      if (owned) {
        shopElement.setAttribute('data-owned', owned.toString(10));
      }
    }
  };

  self.update = function() {
    liquidElement.style.height = ((self.currentBottleMl / 30) * 100).toString(10) + '%';
    makeListEqual(bottleList, self.bottleCount);
    bottleCountElement.innerHTML = self.bottleCount.toString(10);
    self.updateShop();
  };

  setTimeout(function() { titleElement.classList.remove('hidden'); }, 1);
}

function Actuator() {
  var self = this;
  self.element = document.createElement('li');
  document.getElementById('actuators-' + (game.itemsOwned.actuator % 2).toString(10)).appendChild(self.element);

  self.engage = function() {
    self.element.classList.add('engaged');
    game.handleActuator();
    setTimeout(self.disengage, 100);
  };

  self.disengage = function() {
    self.element.classList.remove('engaged');
    setTimeout(self.engage, game.actuatorDelay + Math.random() * (game.actuatorDelay/2));
  };

  self.engage();
}

function Battery() {
  game.clickMultiplier += 1;
}

function Tank() {
  game.maxBottles *= 2;
}

function Doubler() {
  game.clickMultiplier *= 2;
}

game = new Game();
game.step();

for (var i = 0; i < shopElements.length; i++) {
  var shopElement = shopElements[i];
  var itemName = shopElement.getAttribute('data-item');
  shopElement.addEventListener('click', game.purchaser(itemName));
}

shopList.addEventListener('click', function() {
  shopList.classList.toggle('open');
});

function handleClick(e) {
  game.handleClick(e);
  e.preventDefault();
  e.stopPropagation();
}
document.getElementById('bottle').addEventListener('touchend', handleClick);
document.getElementById('bottle').addEventListener('click', handleClick);
document.addEventListener('scroll', function(e) {
  e.preventDefault();
});
