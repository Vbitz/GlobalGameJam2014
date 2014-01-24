define(["util"], function (util) {
	var levelTiles = {};

	function LevelTile () {
		this._renderFunc = function () {};
		this._colides = false;
	};

	LevelTile.SIZE = 64;

	LevelTile.prototype.render = function (draw, x, y) {
		draw.cameraSave();
		draw.cameraPan(x * LevelTile.SIZE, y * LevelTile.SIZE);
		this._renderFunc(draw);
		draw.cameraRestore();
	};

	LevelTile.prototype.interact = function (x, y, lvl, src, msg) { };

	LevelTile.prototype.setColides = function (colides) {
		this._colides = colides;
	};

	LevelTile.prototype.setRenderFunc = function (render) {
		this._renderFunc = render;
	};

	LevelTile.register = function (name, tile) {
		levelTiles[name] = tile;
	};

	LevelTile.registerBasic = function (name, colides, drawFunc) {
		console.log("Registering: " + name);
		var t = new LevelTile();
		t._renderFunc = drawFunc;
		t.setColides(colides);
		LevelTile.register(name, t);
	};

	LevelTile.checkColision = function (name) {
		return levelTiles[name]._colides;
	};

	LevelTile.interact = function (name, x, y, lvl, src, msg) {
		levelTiles[name].interact(x, y, lvl, src, msg);
	};

	LevelTile.render = function (name, x, y, draw) {
		levelTiles[name].render(draw, x, y);
	};

	return LevelTile;
});