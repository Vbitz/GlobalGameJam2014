define(["util"], function (util) {
	var levelTiles = {};

	function LevelTile () {
		this._renderFunc = function () {};
		this._colides = false;
	};

	LevelTile.SIZE = 32;

	LevelTile.prototype.render = function (draw, x, y) {
		draw.cameraSave();
		draw.cameraTranslate(x, y);
		this._renderFunc(draw);
		draw.cameraRestore();
	};

	LevelTile.prototype.setColides = function (colides) {
		this._colides = colides;
	};

	LevelTile.register = function (name, tile) {
		levelTiles[name] = tile;
	};

	LevelTile.registerBasic = function (name, colides, drawFunc) {
		var t = new LevelTile();
		t._renderFunc = drawFunc;
		t.setColides(colides);
		LevelTile.register(name, t);
	};

	LevelTile.render = function (name, x, y, draw) {
		util.assert(levelTiles[name] !== undefined);
		levelTiles[name].render(draw, x, y);
	};

	return LevelTile;
});