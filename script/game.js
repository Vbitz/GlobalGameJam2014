require([
		"util",
		"render",
		"entitys/levelEntity",
		"entitys/trollCatEntity"
	], function (util, RenderManager, LevelEntity, TrollCatEntity) {
	var renderManager = new RenderManager();
	var canvas = util.assert(document.querySelector("#gameCanvas"));

	renderManager.bindTo(canvas);
	renderManager.setSize(800, 600);
	renderManager.addEntity(new LevelEntity());
	renderManager.addEntity(new TrollCatEntity());
	
	renderManager.start(function (dt, draw) {
		draw.clear();
		draw.cameraReset();
		renderManager.renderAll();
	});
});