define(["util", "../tileEntity", "../../players/player"], function (util, LevelTileEntity, PlayerManager) {
	var UP = 0,
		RIGHT = 1,
		DOWN = 2,
		LEFT = 3;

	function PlayerEntity () {
		var self = this;
		LevelTileEntity.call(this);

		this.playerDirection = DOWN; // forward

		this.on("player.spawn", function (e) {
			util.assert(e.x !== undefined && e.y !== undefined);
			self.spawn(e.x, e.y);
		});

		this.on("keydown", function (e) {
			self.handleKeyPress(e.event.keyCode);
		});
	}

	PlayerEntity.prototype = Object.create(LevelTileEntity.prototype);

	PlayerEntity.prototype.render = function (draw) {
		draw.setColor("#aabbcc");
		draw.rect(8, 8, 48, 48);
		draw.setColor("#ccbbaa");
		switch (this.playerDirection) {
		case UP:
			draw.rect(16, 16, 32, 16);
			break;
		case DOWN:
			draw.rect(16, 32, 32, 16);
			break;	
		case LEFT:
			draw.rect(16, 16, 16, 32);
			break;
		case RIGHT:
			draw.rect(32, 16, 16, 32);
			break;
		}
	};

	PlayerEntity.prototype.handleKeyPress = function(code) {
		if (code === 87) {
			this.move(0, -1);
			this.playerDirection = UP;
		} else if (code === 83) {
			this.move(0, 1);
			this.playerDirection = DOWN;
		} else if (code === 65) {
			this.move(-1, 0);
			this.playerDirection = LEFT;
		} else if (code === 68) {
			this.move(1, 0);
			this.playerDirection = RIGHT;
		} else if (code === 69) {
			this.handleInteract();
		}
	};

	PlayerEntity.prototype.handleInteract = function () {
		var x = this._x;
		var y = this._y;
		switch (this.playerDirection) {
		case UP: y--; break;
		case DOWN: y++; break;
		case LEFT: x--; break;
		case RIGHT: x++; break;
		};
		this.interact(x, y, {type: "e"});
	};

	return PlayerEntity;
});