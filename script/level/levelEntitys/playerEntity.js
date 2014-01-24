define(["util", "../tileEntity", "../../players/player"], function (util, LevelTileEntity, PlayerManager) {
	function PlayerEntity () {
		var self = this;
		LevelTileEntity.call(this);

		this.on("player.spawn", function (e) {
			util.assert(e.x !== undefined && e.y !== undefined);
			self.spawn(e.x, e.y);
		});
	}

	PlayerEntity.prototype = Object.create(LevelTileEntity.prototype);

	PlayerEntity.prototype.render = function (draw) {
		draw.setColor("#aabbcc");
		draw.rect(8, 8, 48, 48);
	};

	return PlayerEntity;
});