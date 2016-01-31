var game;
var titleElement = document.getElementById('title');
var liquidElement = document.getElementById('liquid');
var bottleList = document.getElementById('bottles');
var shopList = document.getElementById('shop');
var shopElements = shopList.querySelectorAll('li');
var bottleCountElement = document.getElementById('bottle-count');
var counterElement = document.getElementById('counter');
var maxBottlesElement = document.getElementById('max-bottles');
var playerContainer = document.getElementById('player-container');
var nextVideoTargetElement = document.getElementById('next-video-target');

var youtubeIds = [
  'mYRAwWQYm0o',
  'ncNB2_YsYno',
  'q1LsfrZ7Dck',
  'bh9MlkH54Gk',
  'R0KZnajUOo4',
  'MGsumx_Q9ys',
  '5HikLX8hfYM',
  'EXE2I37HaW8',
  'gLxcw3o6dRY',
  'MJHCF094NR4'
];

var vapeWordFilenames = [
  'a01.mp3',
  'a02.mp3',
  'a03.mp3',
  'a04.mp3',
  'a05.mp3',
  'a06.mp3',
  'a07.mp3',
  'a08.mp3',
  'a09.mp3',
  'a10.mp3',
  'a11.mp3',
  'a12.mp3',
  'a13.mp3',
  'a14.mp3',
  'a15.mp3',
  'a16.mp3',
  'a17.mp3',
  'a18.mp3',
  'a19.mp3',
  'a20.mp3',
  'a21.mp3',
  'a22.mp3',
  'a23.mp3',
  'a24.mp3',
  'a25.mp3',
  'a26.mp3',
  'a27.mp3',
  'a28.mp3',
  'a29.mp3',
  'a30.mp3',
  'a31.mp3',
  'a32.mp3',
  'a33.mp3',
  'a34.mp3',
  'a35.mp3',
  'a36.mp3',
  'a37.mp3',
  'a38.mp3',
  'a39.mp3',
  'a40.mp3',
  'a41.mp3',
  'c01.mp3',
  'c02.mp3',
  'c03.mp3',
  'c04.mp3',
  'c05.mp3',
  'c06.mp3',
  'c07.mp3',
  'c08.mp3',
  'c09.mp3',
  'c10.mp3',
  'c11.mp3',
  'c12.mp3',
  'c13.mp3',
  'c14.mp3',
  'c15.mp3',
  'c16.mp3',
  'c17.mp3',
  'c18.mp3',
  'c19.mp3',
  'c20.mp3',
  'c21.mp3',
  'c22.mp3',
  'c23.mp3',
  'c24.mp3',
  'c25.mp3',
  'c26.mp3',
  'c27.mp3',
  'c28.mp3',
  'c29.mp3',
  'c30.mp3',
  'c31.mp3',
  'c32.mp3',
  'c33.mp3',
  'c34.mp3',
  'c35.mp3',
  'c36.mp3',
  'c37.mp3',
  'c38.mp3',
  'c39.mp3',
  'c40.mp3',
  'c41.mp3',
  'i01.mp3',
  'i02.mp3',
  'i03.mp3',
  'i04.mp3',
  'i05.mp3',
  'i06.mp3',
  'i07.mp3',
  'i08.mp3',
  'i09.mp3',
  'i10.mp3',
  'i11.mp3',
  'i12.mp3',
  'i13.mp3',
  'i14.mp3',
  'i15.mp3',
  'i16.mp3',
  'i17.mp3',
  'i18.mp3',
  'i19.mp3',
  'i20.mp3',
  'i21.mp3',
  'i22.mp3',
  'i23.mp3',
  'i24.mp3',
  'i25.mp3',
  'i26.mp3',
  'i27.mp3',
  'i28.mp3',
  'i29.mp3',
  'i30.mp3',
  'i31.mp3',
  'i32.mp3',
  'i33.mp3',
  'i34.mp3',
  'i35.mp3',
  'i36.mp3',
  'i37.mp3',
  'i38.mp3',
  'i39.mp3',
  'i40.mp3',
  'i41.mp3',
  'p01.mp3',
  'p02.mp3',
  'p03.mp3',
  'p04.mp3',
  'p05.mp3',
  'p06.mp3',
  'p07.mp3',
  'p08.mp3',
  'p09.mp3',
  'p10.mp3',
  'p11.mp3',
  'p12.mp3',
  'p13.mp3',
  'p14.mp3',
  'p15.mp3',
  'p16.mp3',
  'p17.mp3',
  'p18.mp3',
  'p19.mp3',
  'p20.mp3',
  'p21.mp3',
  'p22.mp3',
  'p23.mp3',
  'p24.mp3',
  'p25.mp3',
  'p26.mp3',
  'p27.mp3',
  'p28.mp3',
  'p29.mp3',
  'p30.mp3',
  'p31.mp3',
  'p32.mp3',
  'p33.mp3',
  'p34.mp3',
  'p35.mp3',
  'p36.mp3',
  'p37.mp3',
  'p38.mp3',
  'p39.mp3',
  'p40.mp3',
  'p41.mp3'
];


function initYoutubeAPI() {
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

initYoutubeAPI();

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
  self.currentVideoIndex = 0;
  self.currentBottleMl = 0;
  self.bottleCount = 0;
  self.maxBottles = 16;
  self.baseClickValue = 1;
  self.clickMultiplier = 1;
  self.nextVideoTarget = 4;
  self.actuatorValue = 0;
  self.actuatorValue += self.baseClickValue;
  self.actuatorDelay = 1000;
  self.currentHue = Math.floor(Math.random() * 360);
  self.itemsOwned = {
    actuator: 0,
    battery: 0,
    tank: 0,
    doubler: 0,
    quonk: 0,
    wick: 0
  };
  self.shopUnlocked = false;
  self.counterUnlocked = false;
  self.vapeProbability = Math.pow(2, -youtubeIds.length);

  self.playNextVideo = function() {
    document.body.classList.add('playing');
    new YT.Player('player', {
      videoId: youtubeIds[self.currentVideoIndex],
      playerVars: {
        autoplay: 1,
        controls: 0,
        fs: 0
      },
      events: {
        'onStateChange': function(e) {
          if (e.data === 0) {
            playerContainer.classList.remove('visible');
            playerContainer.innerHTML = '<div id="player"></div>';
            document.body.classList.remove('playing');
            self.update();
          }
        }
      }
    });
    self.currentVideoIndex += 1;
    self.vapeProbability *= 2;
    playerContainer.classList.add('visible');
  };

  self.unlockShop = function() {
    shopList.classList.remove('hidden');
    self.shopUnlocked = true;
  };

  self.unlockCounter = function() {
    counterElement.classList.remove('hidden');
    self.counterUnlocked = true;
  };

  self.reignite = function() {
    self.lastClick = Date.now();
    self.cycleColour();
  };

  self.cycleColour = function() {
    self.currentHue += 0.01;
    self.currentHue = self.currentHue % 360;
    document.body.style.backgroundColor = 'hsl(' + self.currentHue.toString(10) + ',70%,40%)';
    if (self.cycleTimeout) clearTimeout(self.cycleTimeout);
    if (self.lastClick) {
      self.cycleTimeout = setTimeout(self.cycleColour, Date.now() - self.lastClick);
    }
  };

  self.itemConstructors = {
    actuator: Actuator,
    battery: Battery,
    tank: Tank,
    doubler: Doubler,
    quonk: Quonk,
    wick: Wick
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

  self.playFromList = function(filenames, prefix) {
    var filename = 'noise/' + prefix + '/' + filenames[Math.floor((Math.random() * filenames.length))];
    var element = new Audio(filename);
    element.play();
  };

  self.playVapeWords = function() {
    if (Math.random() < self.vapeProbability) self.playFromList(vapeWordFilenames, 'vape-words');
  };

  self.handleClick = function(e) {
    self.reignite();
    self.playVapeWords();
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
    self.reignite();
    self.currentBottleMl += self.actuatorValue;
    self.step();
  };

  self.step = function() {
    while (self.currentBottleMl > 30) {
      if (self.bottleCount < self.maxBottles) {
        self.bottleCount += 1;
        self.currentBottleMl -= 30;
      } else {
        self.currentBottleMl = 30;
      }

      if ((!self.shopUnlocked) && self.bottleCount >= 1) self.unlockShop();
      if ((!self.counterUnlocked) && self.bottleCount >= 16) self.unlockCounter();
    }
    self.update();
  };

  self.updateShop = function() {
    for (var i = 0; i < shopElements.length; i++) {
      var shopElement = shopElements[i];
      var itemName = shopElement.getAttribute('data-item');
      var owned = self.itemsOwned[itemName];
      var canAfford = parseInt(shopElement.getAttribute('data-value'), 10) <= self.bottleCount;
      if (!!(owned || canAfford) ^ shopElement.classList.contains('visible')) {
        shopElement.classList.toggle('visible');
      }
    }
  };

  self.update = function() {
    liquidElement.style.height = ((self.currentBottleMl / 30) * 100).toString(10) + '%';
    makeListEqual(bottleList, self.bottleCount);
    bottleCountElement.innerHTML = self.bottleCount.toString(10);
    if ((self.bottleCount === self.maxBottles) ^ bottleCountElement.classList.contains('full')) {
      bottleCountElement.classList.toggle('full');
    }
    if (youtubeIds[self.currentVideoIndex] !== undefined && self.bottleCount >= self.nextVideoTarget) {
      self.playNextVideo();
      self.nextVideoTarget *= 2;
      nextVideoTargetElement.innerHTML = self.nextVideoTarget.toString(10);
      nextVideoTargetElement.classList.remove('hidden');
    } else if (youtubeIds[self.currentVideoIndex] === undefined) {
      nextVideoTargetElement.classList.add('hidden');
    }
    self.updateShop();
  };

  self.updateMaxBottlesElement = function() {
    maxBottlesElement.innerHTML = self.maxBottles.toString(10);
  };

  self.updateMaxBottlesElement();

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

function Battery() { game.clickMultiplier += 1; }
function Tank() {
  game.maxBottles *= 2;
  game.updateMaxBottlesElement();
}
function Doubler() { game.clickMultiplier *= 2; }
function Quonk() { game.actuatorDelay /= 2; }
function Wick() { game.actuatorValue *= 1.2; }

game = new Game();
game.cycleColour();
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
