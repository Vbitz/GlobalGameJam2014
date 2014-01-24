define(["../util", "./tile"], function (util, LevelTile) {
	function LevelTileEntityManager (lvl) {
		this._lvl = lvl;
	}

	LevelTileEntityManager.prototype.getLevel = function() {
		return this._lvl;
	};

	function LevelTileEntity () {
		this._manager = null;
	}

	LevelTileEntity.LevelTileEntityManager = LevelTileEntityManager;

	LevelTileEntity.prototype.bind = function (manager) {
		this._manager = manager;
	};

	LevelTileEntity.prototype._render = function (x, y, draw) {
		draw.cameraSave();
		draw.cameraPan(x, y);
		this.render(draw);
		draw.cameraRestore();
	};

	LevelTileEntity.prototype.render = function (draw) { };

	return LevelTileEntity;
});