define(["../util", "./tile"], function (util, LevelTile) {
	function LevelTileEntityManager (lvl) {
		this._lvl = lvl;
		this._entitys = {};
	}

	LevelTileEntityManager.prototype.getLevel = function() {
		return this._lvl;
	};

	LevelTileEntityManager.prototype.addTileEntity = function (te) {
		this._entitys[te._uuid] = te;
		te.bind(this);
	};

	LevelTileEntityManager.prototype.emit = function (evntName, args) {
		for (var i in this._entitys) {
			var ent = this._entitys[i];
			ent.recieve(evntName, args);
		}
	};

	LevelTileEntityManager.prototype.renderAll = function (draw) {
		for (var i in this._entitys) {
			var ent = this._entitys[i];
			ent._render(draw);
		}
	};

	function LevelTileEntity () {
		this._manager = null;
		this._x = 0;
		this._y = 0;
		this.active = false;
		this._uuid = util.uuid();
		this._events = {};
	}

	LevelTileEntity.LevelTileEntityManager = LevelTileEntityManager;

	LevelTileEntity.prototype.spawn = function(x, y) {
		this.active = true;
		this._x = x;
		this._y = y;
	};

	LevelTileEntity.prototype.recieve = function (evntName, args) {
		var self = this;
		if (this._events[evntName] !== undefined) {
			this._events[evntName].forEach(function (ev) {
				ev.call(this, args);
			});
		}
	};

	LevelTileEntity.prototype.on = function (evntName, cb) {
		if (this._events[evntName] === undefined) {
			this._events[evntName] = [cb];
		} else {
			this._events[evntName].push(cb);
		}
	};

	LevelTileEntity.prototype.move = function(x, y) {
		// TODO: Check colision
		this._x += x;
		this._y += y;
	};

	LevelTileEntity.prototype.bind = function (manager) {
		this._manager = manager;
	};

	LevelTileEntity.prototype._render = function (draw) {
		if (!this.active) return;
		draw.cameraSave();
		draw.cameraPan(this._x * LevelTile.SIZE, this._y * LevelTile.SIZE);
		this.render(draw);
		draw.cameraRestore();
	};

	LevelTileEntity.prototype.render = function (draw) { };

	return LevelTileEntity;
});