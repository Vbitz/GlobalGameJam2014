define(["entity"], function () {
	function Renderer(ctx) {
		this._ctx = ctx;
	}

	function RenderManager() {
		this._canvas = null;
		this._context = null;
	}

	RenderManager.prototype.bindTo = function (ele) {
		this._canvas = ele;
		this._context = this._canvas.getContext("2d");
	};

	RenderManager.prototype.setSize = function (w, h) {
		this._canvas.width = w;
		this._canvas.height = h;
	};

	RenderManager.prototype.addEntity = function (ent) {
		
	};

	return RenderManager;
});