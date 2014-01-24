define(["util"], function (util) {

	function Entity () {
		this._manager = null;
		this._parentLayer = null;
		this._uuid = util.uuid();
		this._events = {};
	}

	Entity.prototype.bind = function (layer) {
		util.assert(layer instanceof EntityManagerLayer);
		this._parentLayer = layer;
		this._manager = layer.getManager();
	};

	Entity.prototype.render = function (dt, draw) { };

	Entity.prototype.recieve = function (evntName, msg) {
		var self = this;
		if (this._events[evntName] !== undefined) {
			this._events[evntName].forEach(function (ev) {
				ev.call(self, msg);
			});
		}
	};

	Entity.prototype.emit = function (evntName, msg) {
		this.recieve(evntName, msg);
		this._parentLayer.emit(this._uuid, evntName, msg);
	};

	Entity.prototype.on = function (evntName, cb) {
		if (this._events[evntName] === undefined) {
			this._events[evntName] = [cb];
		} else {
			this._events[evntName].push(cb);
		}
	};

	Entity.prototype.getManager = function () {
		return this._manager;
	};

	function EntityManagerLayer (manager) {
		this._entitys = [];
		this._manager = manager;
		this._uuid = util.uuid();
	}

	EntityManagerLayer.prototype.addEntity = function (ent) {
		this._entitys.push(ent);
		ent.bind(this);
	};

	EntityManagerLayer.prototype.getManager = function () {
		return this._manager;
	};

	EntityManagerLayer.prototype.renderAll = function (dt, renderer) {
		this._entitys.forEach(function (ent) {
			ent.render(dt, renderer);
		});
	};

	EntityManagerLayer.prototype.recieve = function (evntName, msg) {
		this._entitys.forEach(function (ent) {
			ent.recieve(evntName, msg);
		});
	};

	EntityManagerLayer.prototype.emit = function (src, evntName, msg) {
		this._manager.emit(this._uuid, evntName, msg);
		this._entitys.forEach(function (ent) {
			if (ent._uuid !== src) {
				ent.recieve(evntName, msg);
			}
		});
	};

	function EntityManager () {
		this._layers = {};
		this.addLayer(0);
	}

	EntityManager.prototype.addLayer = function (layerID) {
		this._layers[layerID] = new EntityManagerLayer(this);
	};

	EntityManager.prototype.addEntity = function (ent, layer) {
		layer = layer ? layer : 0;
		this._layers[layer].addEntity(ent);
	};

	EntityManager.prototype.emit = function (src, evntName, msg) {
		for (var i in this._layers) {
			var layer = this._layers[i];
			if (layer._uuid !== src) {
				layer.recieve(evntName, msg);
			}
		}
	};

	EntityManager.prototype.renderAll = function (dt, renderer) {
		for (var i in this._layers) {
			this._layers[i].renderAll(dt, renderer);
		}
	};

	Entity.EntityManager = EntityManager;

	return Entity;
});