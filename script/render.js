define(["entity", "renderer"], function (Entity, Renderer) {

	// shim from http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
	window.requestAnimFrame = (function(){
		return window.requestAnimationFrame		||
			window.webkitRequestAnimationFrame	||
			window.mozRequestAnimationFrame		||
			function( callback ){
				window.setTimeout(callback, 1000 / 60);
			};
	})();

	function RenderManager () {
		this._canvas = null;
		this._context = null;
		this._renderer = null;
		this._entitys = new Entity.EntityManager();
	}

	RenderManager.prototype.bindTo = function (ele) {
		var self = this;
		this._canvas = ele;
		document.body.addEventListener("keydown", function (e) {
			self.emit("keydown", {event: e});
		}, true);
		this._context = this._canvas.getContext("2d");
	};

	RenderManager.prototype.setSize = function (w, h) {
		this._canvas.width = w;
		this._canvas.height = h;
	};

	RenderManager.prototype.addEntity = function (ent) {
		this._entitys.addEntity(ent);
	};

	RenderManager.prototype.getRenderer = function () {
		if (this._renderer === null) {
			this._renderer = new Renderer(this._context);
		}

		return this._renderer;
	};

	RenderManager.prototype.start = function (cb) {
		var self = this;
		function renderAnimationCallback () {
			window.requestAnimationFrame(renderAnimationCallback);
			cb(1000 / 60, self.getRenderer());
		}
		renderAnimationCallback();
	};

	RenderManager.prototype.renderAll = function () {
		this._entitys.renderAll(1000 / 60, this.getRenderer());
	};

	RenderManager.prototype.emit = function (evntName, args) {
		this._entitys.emit("", evntName, args);
	};

	return RenderManager;
});