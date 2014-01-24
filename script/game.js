require.config({
    urlArgs: "bust=" + (new Date()).getTime()
});

require([
		"util",
		"render",
		"entitys/levelEntity",
		"entitys/trollCatEntity"
	], function (util, RenderManager, LevelEntity, TrollCatEntity) {
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
	
	renderManager.start(function (dt, draw) {
		draw.clear();
		draw.cameraReset();
		renderManager.renderAll();
	});
});