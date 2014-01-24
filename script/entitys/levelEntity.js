define(["../entity", "../level/basicTiles", "../level/tile"], function (Entity, BasicLevelTiles, LevelTile) {
	var LevelEntity = function () {
		Entity.call(this);

		this._levelEntitys = {};
		this._attachedEntitys = {};
		this._level = [];
		this.levelWidth = 0;
		this.levelHeight = 0;

		this.generate();
	};

	LevelEntity.prototype = Object.create(Entity.prototype);

	LevelEntity.prototype.createLevel = function (w, h) {
		this._level = [];
		this.levelWidth = w;
		this.levelHeight = h;
		for (var x = 0; x < w; x++) {
			this._level[x] = [];
			for (var y = 0; y < h; y++) {
				this._level[x][y] = null;
			}
		}
	};

	LevelEntity.prototype.setTile = function (t, x, y) {
		this._level[x][y] = t;
	};

	LevelEntity.prototype.addRect = function (t, x, y, w, h) {
		for (var x1 = x; x1 < (x + w); x1++) {
			for (var y1 = y; y1 < (y + h); y1++) {
				this.setTile(t, x1, y1);
			}
		}
	};

	LevelEntity.prototype.generate = function () {
		this.createLevel(64, 64);
		this.addRect("stoneFloor", 0, 0, 64, 64);
		this.addRect("stoneWall", 0, 0, 1, this.levelHeight);
		this.addRect("stoneWall", this.levelWidth - 1, 0, 1, this.levelHeight);
		this.addRect("stoneWall", 1, 0, this.levelWidth - 2, 1);
		this.addRect("stoneWall", 1, this.levelHeight - 1, this.levelWidth - 2, 1);
		for (var x = 0; x < 64; x++) {
			for (var y = 0; y < 64; y++) {
				if (Math.random() > 0.8) {
					this.setTile("stoneWall", x, y);
				}
			}
		}
	};

	LevelEntity.prototype.render = function (dt, draw) {
		for (var x = 0; x < this.levelWidth; x++) {
			for (var y = 0; y < this.levelHeight; y++) {
				LevelTile.render(this._level[x][y], x, y, draw);
			}
		}
	};

	return LevelEntity;
});