define(["util", "entity", "../asset"], function (Entity, AssetManager) {
	var CAT_SPEED = 10;

	var catSprite = AssetManager.getImage("/assets/cat.png");

	var TrollCatEntity = function () {
		Entity.call(this);
		this._cats = [];
	};

	TrollCatEntity.prototype = Object.create(Entity.prototype);

	TrollCatEntity.prototype.draw = function (dt, draw) {
		this._cats.forEach(function (cat) {
			draw.
		});
	};

	TrollCatEntity.prototype.addCat = function () {
		var cat = {
			x: 0,
			y: util.rand(100, 500) // TODO: Fix the hack with some sort of method to get the width and height
		};
		function updateCat () {
			cat.y += CAT_SPEED;
			setTimeout(updateCat, 1000 / 60);
		}
		updateCat();
		this._cats.push(cat);
	};

	return TrollCatEntity;
});