define(["./tile"], function (LevelTile) {
	var tileDoorClosed = new LevelTile();
	tileDoorClosed.setColides(true);
	tileDoorClosed.setRenderFunc(function (draw) {
		draw.setColor("#123456");
		draw.rect(0, 0, LevelTile.SIZE, LevelTile.SIZE);
	});
	tileDoorClosed.interact = function (x, y, lvl, src, msg) {
		lvl.setTile("tileDoorOpened", x, y);
	};
	LevelTile.register("tileDoorClosed", tileDoorClosed);

	var tileDoorOpened = new LevelTile();
	tileDoorOpened.setColides(false);
	tileDoorOpened.setRenderFunc(function (draw) {
		draw.setColor("#654321");
		draw.rect(0, 0, LevelTile.SIZE, LevelTile.SIZE);
	});
	tileDoorOpened.interact = function (x, y, lvl, src, msg) {
		lvl.setTile("tileDoorClosed", x, y);
	};
	LevelTile.register("tileDoorOpened", tileDoorOpened);
});