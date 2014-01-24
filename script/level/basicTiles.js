define(["../util", "./tile"], function (util, LevelTile) {
	var stoneWallColors = ["#101010", "#151515", "#252525", "#1b1b1b"],
		stoneFloorColors = ["#404040", "#454545", "#555555", "#4b4b4b"];

	function genTile (x, y, color) {
		return {
			x: x + util.rand(0, 4),
			y: y + util.rand(0, 4),
			w: util.rand(6, 8),
			h: util.rand(6, 8),
			color: stoneWallColors[util.rand(1, 4)]
		};
	}

	LevelTile.registerBasic("stoneWall", true, function (draw) {
		if (this._tiles === undefined) {
			this._tiles = [];
			this._tiles.push(genTile(0, 0, stoneWallColors));
			this._tiles.push(genTile(16, 0, stoneWallColors));
			this._tiles.push(genTile(0, 16, stoneWallColors));
			this._tiles.push(genTile(16, 16, stoneWallColors));
		}
		draw.setColor(stoneWallColors[0]);
		draw.rect(0, 0, LevelTile.SIZE, LevelTile.SIZE);
		this._tiles.forEach(function (t) {
			draw.setColor(t.color);
			draw.rect(t.x, t.y, t.w, t.h);
		});
	});

	LevelTile.registerBasic("stoneFloor", false, function (draw) {
		if (this._tiles === undefined) {
			this._tiles = [];
			this._tiles.push(genTile(0, 0, stoneFloorColors));
			this._tiles.push(genTile(16, 0, stoneFloorColors));
			this._tiles.push(genTile(0, 16, stoneFloorColors));
			this._tiles.push(genTile(16, 16, stoneFloorColors));
		}
		draw.setColor(stoneFloorColors[0]);
		draw.rect(0, 0, LevelTile.SIZE, LevelTile.SIZE);
		this._tiles.forEach(function (t) {
			draw.setColor(t.color);
			draw.rect(t.x, t.y, t.w, t.h);
		});
	});
});