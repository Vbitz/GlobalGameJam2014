define(["../entity"], function (Entity) {
	var LevelEntity = function () {
		Entity.call(this);
	};

	LevelEntity.prototype = Object.create(Entity.prototype);

	LevelEntity.prototype.render = function (dt, draw) {
		draw.cameraPan(10, 10);
		draw.setColor("#00FF00");
		draw.rect(0, 0, 100, 100);
		draw.setColor("#0000FF");
		draw.rect(120, 0, 100, 100);
		draw.setColor("#FF0000");
		draw.rect(0, 120, 100, 100);
		draw.setColor("#000000");
		draw.rect(120, 120, 100, 100);
	};

	return LevelEntity;
});