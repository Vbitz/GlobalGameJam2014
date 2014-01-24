define([], function () {
	var _assets = {};

	function Asset (path, type) {
		this._path = path;
		this._type = type;
	};

	Asset.prototype.get = function() {
		if (_assets[this._path] === undefined) {
			return null;
		} else {
			return _assets[this._path];
		}
	};
	
	var _singilton = null;

	var AssetManager = {};

	AssetManager.preCache = function (path, type) {
		if (type === "img") {
			var imgObj = new Image();
			imgObj.onload = function () {
				_assets[path] = this;
			};
			imgObj.src = path;
		}
	};

	AssetManager.getImage = function (path) {
		if (_assets[path] === undefined) {
			AssetManager.preCache(path, "img");
		}
		return new Asset(path, "img");
	};

	return AssetManager;
});