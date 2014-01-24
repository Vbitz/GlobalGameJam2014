define([], function () {
	function AssetManager () {

	}

	var _singilton = null;

	AssetManager.preCache = function (path) {
		
	};

	function getSingilton() {
		if (_singilton === null) _singilton = new AssetManager();
		return _singilton;
	}

	return AssetManager;
});