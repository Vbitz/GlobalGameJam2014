require.config({
    urlArgs: "bust=" + (new Date()).getTime()
});

require([
		"util",
		"render",
		"entitys/levelEntity",
		"entitys/trollCatEntity",
		"level/levelEntitys/playerEntity"
	], function (util, RenderManager, LevelEntity, TrollCatEntity, PlayerEntity) {
	var renderManager = new RenderManager();
	var canvas = util.assert(document.querySelector("#gameCanvas"));

	renderManager.bindTo(canvas);
	renderManager.setSize(window.innerWidth, window.innerHeight);
	renderManager.addEntity(new LevelEntity());
	renderManager.addEntity(new TrollCatEntity());

	function randomCats() {
		if (Math.random() > 0.95) {
			renderManager.emit("addCat", {});
		}
		setTimeout(randomCats, 2000);
	}
	randomCats();

	renderManager.emit("level.addTileEntity", {ent: new PlayerEntity()});
	renderManager.emit("level.callTileMethod", {evntName: "player.spawn", args: {x: 1, y: 1}});
	
	renderManager.start(function (dt, draw) {
		draw.clear();
		draw.cameraReset();
		renderManager.renderAll();
	});
});