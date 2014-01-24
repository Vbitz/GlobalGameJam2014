define(["../util", "./tile"], function (util, LevelTile) {
	var stoneWallColors = ["#101010", "#252515", "#052525", "#1b1b1b"],
		stoneFloorColors = ["#808880", "#859585", "#898a8a", "#8b8b89"];

	function genTile (x, y, color) {
		return {
			x: x + util.rand(2, 8),
			y: y + util.rand(2, 8),
			w: util.rand(12, 16),
			h: util.rand(12, 16),
			color: color[util.rand(1, 4)]
		};
	}

	LevelTile.registerBasic("stoneWall", true, function (draw) {
		if (this._tiles === undefined) {
			this._tiles = [];
			this._tiles.push(genTile(0, 0, stoneWallColors));
			this._tiles.push(genTile(32, 0, stoneWallColors));
			this._tiles.push(genTile(0, 32, stoneWallColors));
			this._tiles.push(genTile(32, 32, stoneWallColors));
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
			this._tiles.push(genTile(32, 0, stoneFloorColors));
			this._tiles.push(genTile(0, 32, stoneFloorColors));
			this._tiles.push(genTile(32, 32, stoneFloorColors));
		}
		draw.setColor(stoneFloorColors[0]);
		draw.rect(0, 0, LevelTile.SIZE, LevelTile.SIZE);
		this._tiles.forEach(function (t) {
			draw.setColor(t.color);
			draw.rect(t.x, t.y, t.w, t.h);
		});
	});
});