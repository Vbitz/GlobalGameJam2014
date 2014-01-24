define([], function () {
	// This is based off the same API as https://github.com/vbitz/Engine2D Draw2D API
	function Renderer (ctx) {
		this._ctx = ctx;
		this.clearColor("cornflowerBlue");
	}

	Renderer.prototype.clear = function () {
		this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
	};

	Renderer.prototype.rect = function (x, y, w, h) {
		this._ctx.fillRect(x, y, w, h);
	};

	Renderer.prototype.grid = function (x, y, w, h) {
		this._ctx.drawRect(x, y, w, h);
	};

	Renderer.prototype.grad = function (x, y, w, h, colorA, colorB, vert) {
		throw new Error("Not Implamented");
	};

	Renderer.prototype.circle = function (x, y, radius, innerRadius, numberOfSides, startPos, endPos, fillStyle) {
		throw new Error("Not Implamented");
	};

	Renderer.prototype.line = function (x1, y1, x2, y2) {
		throw new Error("Not Implamented");
	};

	Renderer.prototype.curve = function (x1, y1, x2, y2, x3, y3, x4, y4) {
		throw new Error("Not Implamented");
	};

	Renderer.prototype.setColor = function (col) {
		if (typeof col === "object") {
			this.setColor("rgb(" + col.r + "," + col.g + "," + col.b + ")");
		} else if (typeof col === "string") {
			this._ctx.strokeStyle = col;
			this._ctx.fillStyle = col;
		}
	};

	Renderer.prototype.clearColor = function (color) {
		this._ctx.canvas.style.backgroundColor = color;
	};

	Renderer.prototype.setColorI = function (r, g, b) {
		this._setColor({r: r, g: g, b: b});
	};

	Renderer.prototype.setColorF = function (r, g, b) {
		this._setColor({
			r: Math.floor(r * 255),
			g: Math.floor(g * 255),
			b: Math.floor(b * 255)
		});
	};

	Renderer.prototype.print = function (x, y, str) {
		throw new Error("Not Implamented");
	};

	Renderer.prototype.setFontSize = function (size) {
		throw new Error("Not Implamented");
	};

	Renderer.prototype.draw = function (img, x, y, w, h) {
		throw new Error("Not Implamented");
	};

	Renderer.prototype.drawSub = function (img, x, y, w, h, xSub, ySub, wSub, hSub) {
		throw new Error("Not Implamented");
	};

	Renderer.prototype.drawSprite = function (spriteSheet, sprite, x, y, w, h) {
		throw new Error("Not Implamented");
	};

	Renderer.prototype.cameraReset = function () {
		this._ctx.setTransform(1, 0, 0, 1, 0, 0);
	};

	Renderer.prototype.cameraPan = function (x, y) {
		this._ctx.translate(x, y);
	};

	Renderer.prototype.cameraZoom = function (f) {
		this._ctx.scale(f, f);
	};

	Renderer.prototype.cameraRotate = function (a) {
		this._ctx.rotate(a);
	};

	return Renderer;
});