var map, player;

var playing = {
  preload: function () {
    game.load.text('tileset', '/levels/01.lvl');
    game.load.text('lvldata', '/levels/01.json');
    game.load.spritesheet('barrierImage', '/images/barrier.png', 100, 100);
    game.load.spritesheet('floorImage', '/images/floor.png', 100, 100);
  },

  create: function () {
    var tileset = game.cache.getText('tileset');
    var lvldata = JSON.parse(game.cache.getText('lvldata'));

    map = MapGenerator.loadMap(tileset, lvldata, game, tileSize);

    var startTileId = lvldata.start;

    playerPosition = {
      x: 0, y: 0
    };

    map.forEach(function (tile, index) {
      tile.sprite = game.add.sprite(0, 0, tile.image); // create a singleton property
      tile.sprite.width = tileSize;
      tile.sprite.height = tileSize;

      if (tile.tileId == startTileId) {
        playerPosition = tile.position;
      }
    });

    player = new Player(
      game,
      playerPosition,
      {width: tileSize, height: tileSize},
      'playerImage',
      FirstResponder.playerTriedToMove
    );

    this.game.input.keyboard.onDownCallback = FirstResponder.keyDown;
  },

  update: function () {
    map.forEach(function (tile, index) {
      tile.sprite.x = tile.position.x;
      tile.sprite.y = tile.position.y;
      tile.sprite.frame = tile.frame(game.time.time);
    });
  }
};


FirstResponder = {
  keyDown: function (keypress) {
    switch (keypress.keyCode) {
      case Phaser.KeyCode.H:
        player.walk({ dx: -tileSize, dy: 0 });
        break;
      case Phaser.KeyCode.J:
        player.walk({ dx: 0, dy: tileSize });
        break;
      case Phaser.KeyCode.K:
        player.walk({ dx: 0, dy: -tileSize });
        break;
      case Phaser.KeyCode.L:
        player.walk({ dx: tileSize, dy: 0 });
        break;
    }
  },

  playerTriedToMove: function (player, position) {
    var target;
    var landedOn;

    map.forEach(function (tile, index) {
      target = tile.position;
      if (position.x == target.x && position.y == target.y) {
        landedOn = tile;
      }
    });

    if (landedOn) {
      return landedOn.wasLandedOnBy(player, game.time.time);
    } else {
      return false;
    }
  }
};
