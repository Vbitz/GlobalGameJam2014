define([], function () {
	var util = {};

	util.uuid = function (u) {
		return Math.floor(Math.random() * 1000000).toString(16);
	};

	util.randFloat = function (min, max) {
		if (max === undefined) {
			max = min;
			min = 0;
		}
		return (Math.random() * (max - min)) + min;
	};

	util.rand = function (min, max) {
		return Math.floor(util.randFloat(min, max));
	};

	util.assert = function (b) {
		if (!b) throw new Error("Assertion Error");
		else return b;
	};

	return util;
});