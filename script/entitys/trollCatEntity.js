define(["util", "entity", "../asset"], function (util, Entity, AssetManager) {
	var CAT_SPEED = 20,
		CAT_WIDTH = 256,
		CAT_HEIGHT = 128;

	var catSprite = AssetManager.getImage("/assets/cat.png");

	var TrollCatEntity = function () {
		var self = this;
		Entity.call(this);
		this._cats = {};

		this.on("addCat", function (e) {
			self.addCat();
		});
	};

	TrollCatEntity.prototype = Object.create(Entity.prototype);

	TrollCatEntity.prototype.render = function (dt, draw) {
		for (var i in this._cats) {
			var cat = this._cats[i];
			if (cat !== null && cat !== undefined) {
				draw.draw(catSprite, cat.x, cat.y, CAT_WIDTH, CAT_HEIGHT);
			}
		}
	};

	TrollCatEntity.prototype.removeCat = function (catID) {
		this._cats[catID] = null;
	};

	TrollCatEntity.prototype.addCat = function () {
		console.log("Adding Cat");
		var self = this;
		var cat = {
			x: 0,
			y: util.rand(100, 500) // TODO: Fix the hack with some sort of method to get the width and height
		};
		var catID = util.uuid();
		this._cats[catID] = cat;
		function updateCat () {
			cat.x += CAT_SPEED;
			if (cat.x > util.getWidth()) {
				self.removeCat(catID);
			} else {
				setTimeout(updateCat, 1000 / 60);
			}
		}
		updateCat();
	};

	return TrollCatEntity;
});