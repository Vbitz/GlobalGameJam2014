define([], function () {
	var util = {};

	util.assert = function (b) {
		if (!b) throw new Error("Assertion Error");
	};

	return util;
});